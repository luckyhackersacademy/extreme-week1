import type { Job } from "@/entities/Job";
import { z } from "zod";
import type { ZodFormattedError } from "zod";

const schema = z.object({
  title: z.string().min(1, "Título é obrigatório"),
  mustToHave: z.string().min(1, "Responsabilidade é obrigatório"),
  niceToHave: z.string().min(1, "Diferenciais é obrigatório"),
});

export function useJobCreate() {
  const loading = ref<boolean>(false);
  const errors = ref<ZodFormattedError<Job>>();
  const toast = useToast();
  const services = useServices();
  const job = ref<Job>({
    title: "",
    mustToHave: "",
    niceToHave: "",
    profileId: "",
  });

  const safeParse = () => {
    const result = schema.safeParse({ ...job.value });
    if (!result.success) {
      errors.value = result.error.format();
    }

    return result;
  };

  const create = async (profileId: string) => {
    job.value.profileId = profileId;

    loading.value = true;
    try {
      const response = await services.createJob({
        ...job.value,
      });

      if (response.error) {
        toast.add({
          severity: "error",
          summary: "Erro :(",
          detail: response.error.message,
          life: 2000,
        });
      }

      return response;
    } catch (e) {
      toast.add({
        severity: "error",
        summary: "Erro :(",
        detail: "Erro ao criar a vaga",
        life: 2000,
      });
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    errors,
    safeParse,
    create,
    job,
  };
}
