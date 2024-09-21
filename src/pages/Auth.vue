<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from "vue";
import { useAppOptionStore } from "@/stores/app-option";
import { useRouter } from "vue-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useFirebaseAuth } from "vuefire";

const appOption = useAppOptionStore();
const router = useRouter();
const auth = useFirebaseAuth()!;
const error = ref("");
const inputs = ref({
  email: "",
  password: "",
});

const login = () => {
  signInWithEmailAndPassword(auth, inputs.value.email, inputs.value.password)
    .then((user) => {
      error.value = "";
      router.push({ name: "MainPage" });
    })
    .catch((err) => {
      error.value = err;
    });
};

onMounted(() => {
  appOption.appSidebarHide = true;
  appOption.appHeaderHide = true;
  appOption.appContentClass = "p-0";
});

onBeforeUnmount(() => {
  appOption.appSidebarHide = false;
  appOption.appHeaderHide = false;
  appOption.appContentClass = "";
});
</script>

<template>
  <div class="login">
    <div class="login-content">
      <form @submit.prevent="login">
        <h1 class="text-center">Sign In</h1>
        <div class="text-muted text-center mb-4">
          For your protection, please verify your identity.
        </div>
        <div class="mb-3">
          <label class="form-label">Email Address</label>
          <input
            v-model="inputs.email"
            type="text"
            class="form-control form-control-lg fs-15px"
            placeholder="username@address.com"
          />
        </div>
        <div class="mb-3">
          <div class="d-flex">
            <label class="form-label">Password</label>
          </div>
          <input
            v-model="inputs.password"
            type="password"
            class="form-control form-control-lg fs-15px"
            placeholder="Enter your password"
          />
        </div>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <button
          type="submit"
          class="btn btn-theme btn-lg d-block w-100 fw-500 mb-3"
        >
          Sign In
        </button>
      </form>
    </div>
  </div>
</template>
