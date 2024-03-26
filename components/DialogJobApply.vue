<script setup lang="ts">
import { useDropZone } from "@vueuse/core";

const emit = defineEmits<{
  (e: "resume-upload", file: File): void;
}>();

const props = defineProps<{
  loading: boolean;
}>();

const visible = defineModel<boolean>("visible");

const dropZoneRef = ref<HTMLDivElement>();
const selected = ref<File>();

function onDrop(files: File[] | null) {
  const [file] = files ?? [];
  if (!file) {
    return;
  }

  selected.value = file;

  emit("resume-upload", file);
}

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  dataTypes: ["application/pdf"],
});
</script>

<template>
  <Dialog
    v-model:visible="visible"
    modal
    header="Header"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <template #header>
      <div class="inline-flex items-center justify-center gap-2">
        <span class="font-bold whitespace-nowrap">Enviar resume</span>
      </div>
    </template>

    <label
      for="resume-upload"
      ref="dropZoneRef"
      class="flex flex-col cursor-pointer justify-center items-center border-4 border-dashed border-gray-400 hover:bg-gray-100 transition-all bg-gray-50 h-64 rounded-lg"
      :class="{
        'border-gray-300': !isOverDropZone,
        'bg-gray-50 border-red-500': isOverDropZone,
      }"
    >
      <span class="text-4xl" v-if="!selected">🍕</span>
      <p class="text-gray-700 font-bold" v-if="selected">
        {{ selected.name }} selecionado
      </p>
      <p class="text-gray-700 font-bold" v-else>Solte o seu currículo aqui</p>
      <p class="text-gray-500">Arquivo .pdf</p>
    </label>
    <input
      id="resume-upload"
      @change="(event) => onDrop(event.target.files)"
      type="file"
      class="hidden"
    />

    <template #footer>
      <Button
        :loading="props.loading"
        label="Aplicar"
        icon="pi pi-check"
        @click="visible = false"
        autofocus
      />
    </template>
  </Dialog>
</template>
