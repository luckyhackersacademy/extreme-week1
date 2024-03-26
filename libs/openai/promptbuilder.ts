import { OpenAIMessage, OpenAIMessageRoles } from "@/entities/OpenAI";

export interface IPrompt {
  withPersona(persona: string): void;
  withContext(context: string): void;
  withIntent(intent: string): void;
  withResponseType(responseType: Record<string, unknown>): void;
  build(): OpenAIMessage[];
}

export function NewPrompt(): IPrompt {
  const messages: OpenAIMessage[] = [];
  const state = {
    intent: "",
    context: "",
    responseType: "",
  };

  const withPersona = (persona: string) => {
    const system = {
      role: OpenAIMessageRoles.SYSTEM,
      content: persona,
    };

    if (messages[0]) {
      messages[0] = system;
      return;
    }

    messages.push(system);
  };

  const withContext = (context: string) => {
    state.context = `${state.context} ${context}`;
  };

  const withIntent = (intent: string) => {
    state.intent = String(intent).replace(/\n/g, " ");
  };

  const withResponseType = (responseType: Record<string, unknown>) => {
    state.responseType = JSON.stringify(responseType, null, 2);
  };

  const build = () => {
    const message = `
			## Context & Data:
			${state.context}

			## Intent:
			${state.intent}

      ## You must put your response in this format in JSON
			${state.responseType}
		`;

    const user = {
      role: OpenAIMessageRoles.USER,
      content: message,
    };

    messages.push(user);

    return messages;
  };

  return {
    withPersona,
    withContext,
    withIntent,
    withResponseType,
    build,
  };
}
