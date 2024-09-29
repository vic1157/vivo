import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import formidable from "formidable";
import fs from "fs/promises";
import path from "path";
import { LabAnalyzer } from "@/lib/LabAnalyzer";
import { IncomingMessage } from "http";
import { Readable } from "stream";

const prisma = new PrismaClient();

// Disable body parsing by using the Next.js route segment config approach
export const GET = () => {
  return NextResponse.json({ message: 'This is the upload route' });
};

// Convert Next.js request to a readable stream
const convertToNodeRequest = async (req: Request): Promise<IncomingMessage> => {
  const reader = req.body?.getReader();
  const stream = new Readable({
    async read() {
      if (!reader) return this.push(null);
      const { done, value } = await reader.read();
      if (done) {
        this.push(null);
      } else {
        this.push(value);
      }
    },
  });

  const headers = new Headers(req.headers);
  const contentLength = headers.get("content-length");

  const nodeRequest = Object.assign(stream, {
    headers: {
      "content-length": contentLength || "0",
      ...Object.fromEntries(headers.entries()),
    },
    method: req.method,
    url: req.url,
  });

  return nodeRequest as IncomingMessage;
};

// POST - Handle file upload, extract text, run OpenAI analysis, and store in DB
export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const uploadDir = path.join(process.cwd(), "uploads");
  await fs.mkdir(uploadDir, { recursive: true });

  const form = formidable({
    uploadDir: uploadDir,
    keepExtensions: true,
    maxFileSize: 50 * 1024 * 1024,
  });

  const nodeRequest = await convertToNodeRequest(req);

  const { fields, files } = await new Promise<{ fields: formidable.Fields; files: formidable.Files }>(
    (resolve, reject) => {
      form.parse(nodeRequest, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    }
  );

  const file = files.file ? (Array.isArray(files.file) ? files.file[0] : files.file) : null;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  const filePath = file.filepath;

  try {
    const labAnalyzer = new LabAnalyzer();
    const extractedText = await labAnalyzer.extractTextFromPdf(filePath);  // Extract text from PDF

    const analysisResult = await labAnalyzer.analyzeLabReport(extractedText);  // Analyze the extracted text
    const summary = await labAnalyzer.summarizeLabReport(extractedText);  // Summarize the report

    const report = await prisma.report.create({
      data: {
        title: fields.title?.toString() || "Untitled Report",
        content: summary,
        filePath: filePath,
        analysisResult: analysisResult, // Add the analysisResult property
        userId: userId,
      },
    });

    return NextResponse.json(report, { status: 200 });
  } catch (error) {
    console.error('Error processing report:', error);
    return NextResponse.json({ error: 'Failed to upload and analyze report' }, { status: 500 });
  }
}

