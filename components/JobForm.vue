<script setup lang="ts">
import type { Job } from "@/entities/Job";
import type { ZodFormattedError } from "zod";

const emit = defineEmits<{
  (e: "create"): void;
}>();

const props = defineProps<{
  loading: boolean;
  errors?: ZodFormattedError<Job>;
}>();

const job = defineModel<Job>({
  required: false,
  default: {
    title: "",
    mustToHave: "",
    niceToHave: "",
  },
});
</script>

<template>
  <Widget title="Título" class="my-5">
    <div class="flex flex-row gap-2">
      <div class="flex flex-col gap-2 flex-1">
        <InputText
          type="text"
          placeholder="Software Engineer"
          v-model="job.title"
        />
        <small v-if="props.errors?.title" class="text-red-500 text-sm">
          {{ props.errors?.title._errors[0] }}
        </small>
      </div>

      <div class="flex flex-col gap-2 self-end">
        <Button
          @click="() => emit('create')"
          :loading="props.loading"
          label="Criar"
          icon="pi pi-plus"
          icon-pos="right"
        />
      </div>
    </div>
  </Widget>

  <Widget title="Responsabilidades" class="my-5">
    <Textarea
      rows="10"
      class="w-full"
      v-model="job.mustToHave"
      placeholder="Profundo conhecimento e experiência prática com arquitetura Serverless."
    />
    <small v-if="props.errors?.mustToHave" class="text-red-500 text-sm">
      {{ props.errors?.mustToHave._errors[0] }}
    </small>
  </Widget>

  <Widget title="Diferenciais" class="my-5">
    <Textarea
      rows="10"
      class="w-full"
      v-model="job.niceToHave"
      placeholder="Experiência de trabalho em ambientes onde o ciclo de desenvolvimento foi baseado em metodologias ágeis ou enxutas...."
    />
    <small v-if="props.errors?.niceToHave" class="text-red-500 text-sm">
      {{ props.errors?.niceToHave._errors[0] }}
    </small>
  </Widget>
</template>
