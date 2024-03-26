<script setup lang="ts">
import type { User } from "@/entities/User";
import type { ZodFormattedError } from "zod";

const props = defineProps<{
  loading: boolean;
  errors?: ZodFormattedError<User>;
}>();

const user = defineModel<User>({
  required: false,
  default: {
    email: "",
    password: "",
  },
});

const emit = defineEmits<{
  (e: "wants-login"): void;
}>();
</script>

<template>
  <div
    class="flex flex-col gap-8 justify-center items-center bg-white rounded-lg p-10 w-[500px]"
  >
    <form
      @submit.prevent="() => emit('wants-login')"
      class="w-full flex flex-col gap-5"
    >
      <h2 class="text-gray-700 text-lg font-regular">Entre com a sua conta.</h2>
      <div class="flex flex-col gap-4 w-full">
        <div class="flex flex-col gap-4 w-full">
          <div class="flex flex-col gap-2">
            <label for="email">E-mail</label>
            <InputText
              id="email"
              placeholder="exemplo@gmail.com"
              v-model="user.email"
            />
            <small v-if="props.errors?.email" class="text-red-500 text-sm">
              {{ props.errors?.email._errors[0] }}
            </small>
          </div>

          <div class="flex flex-col gap-2">
            <label for="password">Senha</label>
            <InputText
              id="password"
              placeholder="****"
              v-model="user.password"
            />
            <small v-if="props.errors?.password" class="text-red-500 text-sm">
              {{ props.errors?.password._errors[0] }}
            </small>
          </div>
        </div>

        <Button
          type="submit"
          :loading="props.loading"
          label="Entrar"
          icon="pi pi-sign-in"
          icon-pos="right"
        />
      </div>
    </form>
  </div>
</template>
