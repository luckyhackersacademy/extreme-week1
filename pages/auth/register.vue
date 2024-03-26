<script setup lang="ts">
const router = useRouter();
const { user, signUp, errors, safeParse, loading } = useAuth();

const handleRegister = async () => {
  const isValid = safeParse({
    email: user.value?.email ?? "",
    password: user.value?.password ?? "",
  }).success;

  if (!isValid || !user.value) {
    return;
  }

  const response = await signUp({ ...user.value });
  if (!response?.error) {
    router.push("/auth/login");
  }
};
</script>

<template>
  <section
    class="w-full h-screen flex flex-col items-center justify-center gap-5 bg-gray-50"
  >
    <Logo />
    <RegisterForm
      v-model="user"
      :loading="loading"
      :errors="errors"
      @wants-register="handleRegister"
    />
  </section>
</template>
