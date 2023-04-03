<script setup lang="ts">
import { ref } from "vue";
import { useModal } from "../composables/modal";
import { useUsers } from "../stores/users";
import { NewUser } from "../users";
import UserForm from "./UserForm.vue";

const usersStore = useUsers();
const modal = useModal();
const error = ref("");

async function handleSignIn(newUser: NewUser) {
  const result = await usersStore.loginUser(newUser);

  if (result.error) {
    error.value = "Username or password is incorrect";
  } else {
    usersStore.authenticate();
    modal.hideModal();
  }
}
</script>

<template>
  <UserForm @submit="handleSignIn" :error="error" />
</template>
