import OpenAI from "openai";
import { NewOpenAI } from "./client";

const sdk = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

export const openai = NewOpenAI(sdk);
