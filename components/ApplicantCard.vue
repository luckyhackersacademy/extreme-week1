<script setup lang="ts">
const emit = defineEmits<{
  (e: "read-more", linkedinUrl: string): void;
}>();

const props = withDefaults(
  defineProps<{
    linkedinUrl: string;
    jobTitle: string;
    hasFit: boolean;
    applicant: string;
    experiences: string;
    technologies: string;
  }>(),
  {
    linkedinUrl: "123",
    jobTitle: "Software Engineer",
    hasFit: false,
    applicant: "Igor Halfeld",

    experiences:
      "Profundo conhecimento e experiência prática com arquitetura Serverless. Experiência de trabalho em ambientes onde o ciclo de desenvolvimento foi baseado em metodologias ágeis ou enxutas....",
    technologies: "Node.js, Vue.js, Flutter e React",
  },
);
</script>

<template>
  <Card>
    <template #title>
      {{ props.applicant }}
      <Tag v-if="props.hasFit" value="Match!" />
    </template>
    <template #subtitle> {{ props.jobTitle }} </template>
    <template #content>
      <p class="m-0">
        {{ props.technologies }}
      </p>
      <p class="m-0">
        {{ props.experiences }}
      </p>
    </template>
    <template #footer>
      <Button
        icon="pi pi-chevron-right"
        label="Ver linkedin"
        text
        icon-pos="right"
        @click="() => emit('read-more', props.linkedinUrl)"
      />
    </template>
  </Card>
</template>
