// // import { NextResponse } from "next/server";
// // import { PrismaClient } from "@prisma/client";
// // import { auth } from "@clerk/nextjs/server";
// // import formidable from "formidable";
// // import fs from "fs/promises";
// // import path from "path";
// // import  { LabAnalyzer }  from "@/lib/LabAnalyzer";
// // import { IncomingMessage } from "http";
// // import { Readable } from "stream";

// // const prisma = new PrismaClient();

// // // Convert Next.js request to a readable stream
// // const convertToNodeRequest = async (req: Request): Promise<IncomingMessage> => {
// //   const reader = req.body?.getReader();
// //   const stream = new Readable({
// //     async read() {
// //       if (!reader) return this.push(null);
// //       const { done, value } = await reader.read();
// //       if (done) {
// //         this.push(null);
// //       } else {
// //         this.push(value);
// //       }
// //     },
// //   });

// //   const headers = new Headers(req.headers);
// //   const contentLength = headers.get("content-length");

// //   const nodeRequest = Object.assign(stream, {
// //     headers: {
// //       "content-length": contentLength || "0",
// //       ...Object.fromEntries(headers.entries()),
// //     },
// //     method: req.method,
// //     url: req.url,
// //   });

// //   return nodeRequest as IncomingMessage;
// // };

// // // Disable body parsing by using the Next.js route segment config approach
// // export const GET = () => {
// //   return NextResponse.json({ message: 'This is the upload route' });
// // };

// // // POST - Handle file upload, extract text, run OpenAI analysis, and store in DB
// // export async function POST(req: Request) {
// //   const { userId } = auth();
// //   if (!userId) {
// //     return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
// //   }

// //   const uploadDir = path.join(process.cwd(), "uploads");
// //   await fs.mkdir(uploadDir, { recursive: true });

// //   const form = formidable({
// //     uploadDir: uploadDir,
// //     keepExtensions: true,
// //     maxFileSize: 50 * 1024 * 1024, // 50 MB limit
// //   });

// //   const nodeRequest = await convertToNodeRequest(req);

// //   const { fields, files } = await new Promise<{ fields: formidable.Fields; files: formidable.Files }>(
// //     (resolve, reject) => {
// //       form.parse(nodeRequest, (err, fields, files) => {
// //         if (err) reject(err);
// //         resolve({ fields, files });
// //       });
// //     }
// //   );

// //   const file = files.file ? (Array.isArray(files.file) ? files.file[0] : files.file) : null;

// //   if (!file) {
// //     return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
// //   }

// //   const filePath = file.filepath;

// //   try {
// //     const labAnalyzer = new LabAnalyzer();
// //     const extractedText = await labAnalyzer.extractTextFromPdf(filePath);  // Extract text from PDF

// //     const analysisResult = await labAnalyzer.analyzeLabReport(extractedText);  // Analyze the extracted text
// //     const summary = await labAnalyzer.summarizeLabReport(extractedText);  // Summarize the report

// //     const report = await prisma.report.create({
// //       data: {
// //         title: fields.title?.toString() || "Untitled Report",
// //         content: summary,
// //         filePath: filePath,
// //         analysisResult: analysisResult, // Add the analysisResult property
// //         userId: userId,
// //       },
// //     });

// //     return NextResponse.json(report, { status: 200 });
// //   } catch (error) {
// //     console.error('Error processing report:', error);
// //     return NextResponse.json({ error: 'Failed to upload and analyze report' }, { status: 500 });
// //   }
// // }

// // // New config setup to disable body parsing
// // export const dynamic = 'force-dynamic';

// import { NextResponse } from "next/server";
// import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import { randomUUID } from "crypto";

// // Initialize S3 client using AWS SDK v3
// const s3 = new S3Client({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//   },
// });

// // Named export for GET request (instead of default export)
// export async function GET(req: Request) {
//   const { searchParams } = new URL(req.url);
//   const fileType = searchParams.get("fileType");

//   if (!fileType) {
//     return NextResponse.json({ error: "File type is required" }, { status: 400 });
//   }

//   const fileExtension = fileType.split("/")[1];
//   const key = `${randomUUID()}.${fileExtension}`;

//   // Ensure the file type is supported
//   const acceptedFileTypes = [
//     "application/pdf",
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     "image/jpeg",
//     "image/png",
//   ];

//   if (!acceptedFileTypes.includes(fileType)) {
//     return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
//   }

//   const bucketName = process.env.AWS_S3_BUCKET_NAME;

//   if (!bucketName) {
//     return NextResponse.json({ error: "Bucket name not set in environment variables" }, { status: 500 });
//   }

//   const s3Params = {
//     Bucket: bucketName, // Use the bucket from the environment variables
//     Key: key,
//     Expires: new Date(Date.now() + 60 * 1000), // URL expiration time in milliseconds
//     ContentType: fileType,
//   };

//   try {
//     // Generate the signed URL for S3 using `getSignedUrl`
//     const uploadUrl = await getSignedUrl(s3, new PutObjectCommand(s3Params), {
//       expiresIn: 60,
//     });

//     return NextResponse.json({ uploadUrl, key }, { status: 200 });
//   } catch (error) {
//     console.error("Error generating signed URL:", error);
//     return NextResponse.json({ error: "Failed to generate upload URL" }, { status: 500 });
//   }
// }

import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import pdf from 'pdf-parse'; // Import pdf-parse
import { OpenAI } from 'openai'; // Import OpenAI
import fs from 'fs/promises'; // Import fs module

// Middleware to parse incoming form data
export const config = {
  api: {
    bodyParser: false, // Disable Next.js body parsing to use formidable
  },
};

// Function to get summary from OpenAI
async function getSummaryFromOpenAI(pdfText: string): Promise<string> {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Use your OpenAI API key
  });

  const response = await openai.chat.completions.create({
    model: 'gpt-4o', // Use the appropriate model
    messages: [
      { role: 'system', content: 'You are an assistant that summarizes documents.' },
      { role: 'user', content: `Summarize the following PDF content:\n${pdfText}` },
    ],
  });

  return response.choices[0]?.message.content || '';
}

// API route for uploading and analyzing PDFs
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Form parsing error' });
      }

      const file = files.file ? files.file[0] : null; // Assuming the file is uploaded with the key 'file'

      try {
        let data;
        if (file) {
          const pdfBuffer = await fs.readFile(file.filepath); // Read the uploaded file
          data = await pdf(pdfBuffer); // Extract text from the PDF
        } else {
          // Handle the case when 'file' is null
          return res.status(400).json({ error: 'No file uploaded' });
        }
        const pdfText = data.text;

        // Get the summary using OpenAI
        const summary = await getSummaryFromOpenAI(pdfText);

        // Send the summary back as a response
        res.status(200).json({ summary });
      } catch (error) {
        console.error('Error processing PDF:', error);
        res.status(500).json({ error: 'Failed to process PDF.' });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

