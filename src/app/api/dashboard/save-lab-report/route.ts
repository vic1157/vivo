// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma"; // Prisma client to interact with MongoDB
// import axios from "axios";

// // POST handler to receive the file upload, send it to Python backend for OpenAI analysis, and store result in MongoDB
// export async function POST(req: Request) {
//   try {
//     // Parse form data
//     const formData = await req.formData();
//     const file = formData.get("file") as File | null;
//     const title = formData.get("title") as string;
//     const userId = formData.get("userId") as string;

//     if (!file || !title || !userId) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
//     }

//     // Convert file to blob or buffer before sending to Python backend
//     const fileBuffer = await file.arrayBuffer();
//     const fileBlob = new Blob([fileBuffer]);

//     const formDataToPython = new FormData();
//     formDataToPython.append("file", fileBlob, file.name);

//     // Send file to Python backend for OpenAI analysis
//     const pythonBackendUrl = "http://127.0.0.1:5000/upload"; // Your Flask endpoint
//     const response = await axios.post(pythonBackendUrl, formDataToPython, {
//       headers: { "Content-Type": "multipart/form-data" },
//     });

//     const { summary } = response.data;

//     // Save the result to MongoDB using Prisma
//     const savedReport = await prisma.report.create({
//       data: {
//         title: title,
//         content: summary, // The analyzed summary from the Python backend
//         filePath: file.name, // Optionally store file name if needed
//         analysisResult: {}, // Add the analysisResult property with an appropriate value
//         userId: userId, // Assuming you have the user ID from Clerk/Auth
//       },
//     });

//     // Return the saved report in the response
//     return NextResponse.json(savedReport, { status: 200 });
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     return NextResponse.json({ error: "File upload and processing failed" }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, content, date, userId } = body;

    // Convert the date string to a Date object
    const parsedDate = new Date(date);

    // Create the new report in the database
    const newReport = await prisma.report.create({
      data: {
        title,
        content,
        filePath: "", // You can provide a real filePath if applicable
        analysisResult: {}, // This would be your OpenAI analysis result
        summary: "", // Add the summary property with an appropriate value
        user: { connect: { id: userId } }, // Connect the report to the user by providing the user's ID
        userId,
        date: parsedDate, // Use the parsed date here
      },
    });

    return NextResponse.json(newReport, { status: 201 });
  } catch (error) {
    console.error("Error saving lab report:", error);
    return NextResponse.json({ error: "Failed to save lab report" }, { status: 500 });
  }
}
