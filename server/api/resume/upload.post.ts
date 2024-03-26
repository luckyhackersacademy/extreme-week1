import pdfText from "pdf-text";
import { openai } from "~/libs/openai/openai";
import { NewPrompt } from "~/libs/openai/promptbuilder";

const toText = (pdfBuffer: Buffer): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    return pdfText(pdfBuffer, async (err: Error, chunks: string[]) => {
      if (err) {
        reject(err);
      }

      resolve(chunks);
    });
  });
};

export default defineEventHandler(async (event) => {
  const form = await readMultipartFormData(event);
  const [file] = form ?? [];

  if (!file) {
    throw createError({
      status: 400,
      statusMessage: "file required",
    });
  }

  const pdfBuffer = file.data;

  try {
    const chunks = await toText(pdfBuffer);
    const resume = chunks.join("");

    const prompt = NewPrompt();
    prompt.withPersona(`
      Assuma o papel de um recrutador bem experiênte em recrutamento
      recrutamento de engenheiros de software (desenvolvedores)
    `);

    prompt.withContext(resume);

    prompt.withContext(`
      - separe do texto as experiencias do candidato e coloque em formato texto/string puro na response 'experiences' 
      - separe por virgula as tecnologias que o canditado já usou e coloque na response 'technologies'
      - procure a url do linkedin do candidato e coloque na response 'linkedinUrl'
      - coloque o nome do candidato na response 'name'
      - breve descrição do candidato baseado na sua visão de recrutador
    `);

    prompt.withResponseType({
      experiences: "",
      bio: "",
      name: "",
      technologies: "",
      linkedinUrl: "",
    });

    const messages = prompt.build();
    console.log("Prompt =>", JSON.stringify(messages, null, 2));
    const response = await openai.createCompletions(messages);

    return response;
  } catch (e) {
    const error = e as Error;

    throw createError({
      status: 500,
      statusMessage: error.message,
    });
  }
});
