<script lang="ts" setup>
import { computed, ref } from "vue";

import FormInput from "./FormInput.vue";
import { validate, lenght, required } from "../validation";

const username = ref("");
const usernameStatus = computed(() => {
  return validate(username.value, [required, lenght({ min: 5, max: 10 })]);
});

const password = ref("");
const passwordStatus = computed(() => {
  return validate(password.value, [required, lenght({ min: 10, max: 40 })]);
});
</script>

<template>
  <form class="form">
    <FormInput name="Username" v-model="username" :status="usernameStatus" />
    <FormInput name="Password" v-model="password" :status="passwordStatus" />
  </form>
</template>

<style scoped>
.form {
  background: white;
  padding: 30px;
  margin-top: 50px;
}
</style>
