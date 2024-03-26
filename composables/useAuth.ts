import { z } from "zod";
import type { ZodFormattedError } from "zod";
import type { User } from "@/entities/User";

const schema = z.object({
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("E-mail precisa ser válido"),
  password: z.string().min(3, "Senha maior que 5 digitos é obrigatória"),
});

export function useAuth() {
  const services = useServices();
  const toast = useToast();
  const user = ref<User>({
    email: "",
    password: "",
  });
  const loading = ref<boolean>(false);
  const errors = ref<ZodFormattedError<User>>();

  const safeParse = ({ email, password }: User) => {
    const result = schema.safeParse({ email, password });
    if (!result.success) {
      errors.value = result.error.format();
    }

    return result;
  };

  const signIn = async ({ email, password }: User) => {
    loading.value = true;

    try {
      const response = await services.signIn({ email, password });
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
      console.log("e", e);

      toast.add({
        severity: "error",
        summary: "Erro :(",
        detail: "Erro ao fazer o login",
        life: 2000,
      });
    } finally {
      loading.value = false;
    }
  };

  const signUp = async ({ email, password }: User) => {
    loading.value = true;

    try {
      const response = await services.signUp({ email, password });
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
      console.log("e", e);

      toast.add({
        severity: "error",
        summary: "Erro :(",
        detail: "Erro ao criar a conta",
        life: 2000,
      });
    } finally {
      loading.value = false;
    }
  };

  return {
    user,
    errors,
    loading,
    safeParse,
    signIn,
    signUp,
  };
}
