import openai from 'openai';
import fs from 'fs';
import path from 'path';
import pdfParse from 'pdf-parse';  // For parsing PDF files
import { OpenAI } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

export class LabAnalyzer {
  private openaiClient: OpenAI;

  constructor() {
    // Initialize OpenAI client
    this.openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });
  }

  // Extract text from a PDF file
  async extractTextFromPdf(filePath: string): Promise<string> {
    try {
      const dataBuffer = await fs.promises.readFile(filePath);
      const pdfData = await pdfParse(dataBuffer);
      return pdfData.text;  // Return the extracted text from PDF
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      throw new Error('Failed to extract text from PDF.');
    }
  }

  // Analyze the extracted text using OpenAI API
  async analyzeLabReport(extractedText: string): Promise<string> {
    try {
      const threadResponse = await this.openaiClient.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a medical assistant analyzing lab reports.' },
          { role: 'user', content: `Please analyze the following lab report: ${extractedText}` }
        ],
      });

      return threadResponse.choices[0].message?.content ?? 'No analysis result.';
    } catch (error) {
      console.error('Error during lab report analysis:', error);
      throw new Error('Lab report analysis failed.');
    }
  }

  // Summarize the lab report using OpenAI API
  async summarizeLabReport(extractedText: string): Promise<string> {
    try {
      const summaryResponse = await this.openaiClient.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'Summarize the following lab report in simple terms.' },
          { role: 'user', content: `Here is the lab report: ${extractedText}` }
        ],
      });

      return summaryResponse.choices[0].message?.content ?? 'No summary available.';
    } catch (error) {
      console.error('Error during lab report summary:', error);
      throw new Error('Lab report summarization failed.');
    }
  }
}