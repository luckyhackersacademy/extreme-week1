<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

const router = useRouter();
const session = useSession();
const { job, create, safeParse, loading, errors } = useJobCreate();

const handleCreate = async () => {
  const isValid = safeParse().success;

  if (!isValid || !job.value) {
    return;
  }

  const response = await create(session.user.value?.id!);

  if (!response?.error) {
    router.push("/app/jobs");
  }
};
</script>

<template>
  <JobForm
    @create="handleCreate"
    v-model="job"
    :loading="loading"
    :errors="errors"
  />
</template>
