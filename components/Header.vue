<script setup lang="ts">
const router = useRouter()
const session = useSession()

const props = defineProps<{
  email?: string
}>()

const menu = ref()
const items = [
    {
    label: 'Nova vaga',
    icon: 'pi pi-plus',
    command: () => router.push('/app/jobs/create'),
  },
  {
    label: 'Minhas vagas',
    icon: 'pi pi-list',
    command: () => router.push('/app/jobs'),
  },
  {
    separator: true,
  },
  {
    label: 'Sair',
    icon: 'pi pi-sign-out',
    command: async () => {
      await session.logout()
      router.push('/auth/login')
    },
  },
]

const toogle = (event: Event) => {
  menu.value?.toggle(event)
}
</script>

<template>
  <header class="w-full shadow">
    <nav class="bg-white px-4 lg:px-6 py-2.5">
      <div class="flex justify-between items-center mx-auto max-w-screen-xl">
        <div class="flex items-center">
          <nuxt-link to="/app/jobs">
            <Logo />
          </nuxt-link>
        </div>

        <div class="flex items-center">
          <button class="flex gap-2 items-center" aria-haspopup="true" aria-controls="header-auth-menu" @click="toogle">
            <span class="font-[Inter] font-regular text-gray-700">Olá, {{ props.email }}!</span>
          </button>
        </div>

        <Menu ref="menu" :model="items" :popup="true"></Menu>
      </div>
    </nav>
  </header>
</template>
