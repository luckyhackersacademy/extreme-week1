export function useApply() {
  const services = useServices();
  const toast = useToast();
  const loading = ref<boolean>(false);

  const apply = async (file: File, jobId: string) => {
    loading.value = true;

    try {
      const response = await services.apply(file);
      const creation = await services.createApplicant({
        linkedinUrl: response.linkedinUrl,
        experiences: response.experiences,
        technologies: response.technologies,
        bio: response.bio,
        name: response.name,
        jobId,
      });

      if (!creation.error) {
        toast.add({
          severity: "success",
          summary: "Sucesso!",
          detail: "Aplicado para vaga!",
          life: 2000,
        });
      }
      return response;
    } catch (e) {
      toast.add({
        severity: "error",
        summary: "Erro :(",
        detail: "Erro ao aplicar para a vaga",
        life: 2000,
      });
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    apply,
  };
}
