<script setup lang="ts">
import type { Job } from "@/entities/Job";
const router = useRouter();
const services = useServices();
const session = useSession();
const jobs = ref<Job[]>([]);

definePageMeta({
  layout: "admin",
  middleware: ["auth"],
});

const navigateToJobDetail = (jobId: string) => {
  router.push(`/app/jobs/${jobId}`);
};

const fetchJobs = async () => {
  const allJobs = await services.readAllJobsForRecruterId(
    session.user.value?.id!,
  );

  jobs.value = allJobs;
};

onMounted(() => {
  fetchJobs();
});
</script>

<template>
  <JobListing>
    <JobCard
      @read-more="navigateToJobDetail"
      v-for="job in jobs"
      :key="job.id"
      :id="job.id"
      :title="job.title"
      :description="`${job.mustToHave} ${job.niceToHave}`"
    />
  </JobListing>
</template>
