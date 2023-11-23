import { OpenAI } from "langchain/llms/openai";
import { env } from "./config";

export const chatModel = new OpenAI({
  openAIApiKey: env.OPEN_AI_API_KEY,
  streaming: true,
  verbose: true,
  temperature: 0,
});
