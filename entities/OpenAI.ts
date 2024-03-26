export enum OpenAIMessageRoles {
  SYSTEM = "system",
  USER = "user",
}

export interface OpenAIMessage {
  role: OpenAIMessageRoles;
  content: string;
}
