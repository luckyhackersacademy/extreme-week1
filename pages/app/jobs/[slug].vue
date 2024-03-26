<script setup lang="ts">
import type { Job } from "@/entities/Job";
import type { Applicant } from "@/entities/Applicant";
const route = useRoute();
const services = useServices();
const session = useSession();

const job = ref<Job>();
const applicants = ref<Applicant[]>([]);

const fetchJobById = async () => {
  const { slug } = route.params;
  const jobDetail = await services.readOneJobById(slug as string);
  job.value = jobDetail;
};

const fetchAllApplicants = async () => {
  const { slug } = route.params;
  const allApplicants = await services.readAllApplicantsFromJob(slug as string);
  applicants.value = allApplicants;
};

const navigateToLinkedin = (linkedinUrl: string) => {
  window.open(linkedinUrl, "_blank");
};

onMounted(() => {
  fetchJobById();
  fetchAllApplicants();
});
</script>

<template>
  <JobViewer
    v-if="job"
    :loading="false"
    :title="job.title"
    :must-to-have="job.mustToHave"
    :nice-to-have="job.niceToHave"
    :is-admin="session.isLogged()"
  />

  <Widget title="Candidatos" v-if="job && applicants.length > 0">
    <ApplicantGroup>
      <ApplicantCard
        v-for="applicant in applicants"
        :key="applicant.id"
        :job-title="`Vaga para ${job.title}`"
        :linkedin-url="applicant.linkedinUrl"
        :applicant="applicant.name"
        :experiences="applicant.experiences"
        :technologies="applicant.technologies"
        :has-fit="applicant.hasFit"
        @read-more="navigateToLinkedin"
      />
    </ApplicantGroup>
  </Widget>
</template>
