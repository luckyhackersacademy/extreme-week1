<script setup lang="ts">

const emit = defineEmits<{
    (e: 'read-more', id: string): void
}>()

const props = withDefaults(defineProps<{
    id: string
    title: string
    description: string
}>(), {
    id: '123',
    title: 'Software Engineer',
    description: 'Profundo conhecimento e experiência prática com arquitetura Serverless. Experiência de trabalho em ambientes onde o ciclo de desenvolvimento foi baseado em metodologias ágeis ou enxutas....'
})
</script>

<template>
    <Card>
        <template #title> {{  props.title }} </template>
        <template #subtitle> Nova vaga! </template>
        <template #content>
            <p class="m-0">
                {{  props.description }}
            </p>
        </template>
        <template #footer>
            <Button icon="pi pi-chevron-right" label="Saiba mais" icon-pos="right" @click="() => emit('read-more', props.id)" />
        </template>
    </Card>
</template>