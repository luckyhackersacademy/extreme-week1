<script setup lang="ts">
import type { Job } from "@/entities/Job";
const isApplyModalVisible = ref<boolean>(false);

const route = useRoute();
const services = useServices();

const { loading, apply } = useApply();

const handleResumeApply = async (file: File) => {
  console.log("file", file);
  await apply(file, route.params.slug!);
  isApplyModalVisible.value = false;
};

const handleApply = () => {
  isApplyModalVisible.value = true;
  console.log("apply");
};

const job = ref<Job>();

const fetchJobById = async () => {
  const { slug } = route.params;
  const jobDetail = await services.readOneJobById(slug);
  job.value = jobDetail;
};

onMounted(() => {
  fetchJobById();
});
</script>

<template>
  <DialogJobApply
    v-model:visible="isApplyModalVisible"
    :loading="loading"
    @resume-upload="handleResumeApply"
  />

  <JobViewer
    v-if="job"
    :loading="false"
    :title="job.title"
    :must-to-have="job.mustToHave"
    :nice-to-have="job.niceToHave"
    @apply="handleApply"
    :is-admin="false"
  />
</template>
