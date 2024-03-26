<script setup lang="ts">
const router = useRouter();
const { user, signIn, errors, safeParse, loading } = useAuth();

const handleLogin = async () => {
  const isValid = safeParse({
    email: user.value?.email ?? "",
    password: user.value?.password ?? "",
  }).success;

  if (!isValid || !user.value) {
    return;
  }

  const response = await signIn({
    email: user.value.email,
    password: user.value.password,
  });

  if (!response?.error) {
    router.push("/app/jobs");
  }
};
</script>

<template>
  <section
    class="w-full h-screen flex flex-col items-center justify-center gap-5 bg-gray-50"
  >
    <Logo />
    <LoginForm
      v-model="user"
      :loading="loading"
      :errors="errors"
      @wants-login="handleLogin"
    />
  </section>
</template>
