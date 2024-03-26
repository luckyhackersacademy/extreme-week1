<script setup lang="ts">
const emit = defineEmits<{
  (e: "apply"): void;
}>();

const props = withDefaults(
  defineProps<{
    loading: boolean;
    title: string;
    mustToHave: string;
    isAdmin: boolean;
    niceToHave: string;
  }>(),
  {
    loading: false,
    title: "Software Engineer",
    mustToHave:
      "Profundo conhecimento e experiência prática com arquitetura Serverless.",
    niceToHave:
      "Experiência de trabalho em ambientes onde o ciclo de desenvolvimento foi baseado em metodologias ágeis ou enxutas....",
  },
);
</script>

<template>
  <Widget title="Sobre a vaga" class="my-5">
    <div class="flex flex-row gap-2">
      <div class="flex flex-col gap-2 flex-1">
        <h1 class="text-2xl text-gray-800 font-bold">{{ props.title }}</h1>
      </div>

      <div class="flex flex-col gap-2 self-end" v-if="!isAdmin">
        <Button
          @click="() => emit('apply')"
          :loading="props.loading"
          label="Easy apply 💪🏻"
        />
      </div>
    </div>
  </Widget>

  <Widget title="Responsabilidades" class="my-5">
    <div class="text-lg text-gray-800">
      {{ props.mustToHave }}
    </div>
  </Widget>

  <Widget title="Diferenciais" class="my-5">
    <p class="text-lg text-gray-800">
      {{ props.niceToHave }}
    </p>
  </Widget>
</template>
