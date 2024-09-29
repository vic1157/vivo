import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const model = "gpt-3.5-turbo"; // Or "gpt-3.5-turbo" if you don't have access to GPT-4
const mgeneralist_assist_id = 'asst_9fm5NCQTo77ruSa7AtUsx0dN';

class NewChat {
  private client: OpenAI;
  private assistantId: string;
  private threadId: string | null;

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error("OpenAI API key is missing! Set it in your environment variables.");
    }

    this.client = new OpenAI({ apiKey });
    this.assistantId = mgeneralist_assist_id;
    this.threadId = null;
  }

  async newThreadRun(message: string): Promise<string> {
    try {
      const response = await this.client.chat.completions.create({
        model,
        messages: [
          { role: "system", content: "You are a helpful medical assistant." },
          { role: "user", content: message },
        ],
      });

      console.log("OpenAI Response:", response); // Log OpenAI response
      this.threadId = response.id;
      return response.choices[0].message?.content ?? "No response from AI.";
    } catch (error) {
      console.error("Error creating new thread:", error);
      return "An error occurred while creating a new chat.";
    }
  }

  async newMessage(message: string): Promise<string> {
    if (!this.threadId) {
      return "No thread available. Start a new chat.";
    }

    try {
      const response = await this.client.chat.completions.create({
        model,
        messages: [{ role: "user", content: message }],
      });

      console.log("New Message Response:", response); // Log OpenAI response for new message
      return response.choices[0].message?.content ?? "No response from AI.";
    } catch (error) {
      console.error("Error sending message:", error);
      return "An error occurred while sending the message.";
    }
  }
}

export default NewChat;

