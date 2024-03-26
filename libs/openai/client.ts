import OpenAI from "openai";
import { OpenAIMessage } from "@/entities/OpenAI";
import { EmptyContentError, DefaultServerError } from "./errors";

export interface OpenAIClient {
  createCompletions<T>(messages: OpenAIMessage[]): Promise<T>;
}

export function NewOpenAI(client: OpenAI): OpenAIClient {
  async function createCompletions<T>(messages: OpenAIMessage[]): Promise<T> {
    try {
      const response = await client.chat.completions.create(
        {
          model: "gpt-3.5-turbo",
          messages,
        },
        { maxRetries: 3 },
      );

      const content = response?.choices[0].message.content;
      if (!content) {
        throw new EmptyContentError();
      }

      try {
        return JSON.parse(content) as T;
      } catch (e) {
        console.log("createCompletions error:", e);
        return await createCompletions(messages);
      }
    } catch (e) {
      const error = e as Error;
      throw new DefaultServerError(error.message);
    }
  }

  return {
    createCompletions,
  };
}
