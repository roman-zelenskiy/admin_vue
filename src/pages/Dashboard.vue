<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();
</script>
<template>
  <h1 class="page-header mb-3 word-break fs-1 fs-sm-2 fs-md-3 fs-lg-4">
    Hi, {{ auth.user?.email }}
    <p>
      <small class="fs-6 fs-sm-5 fs-md-4 fs-lg-3"
        >here's what's happening with your store today.</small
      >
    </p>
  </h1>
</template>

<style>
.word-break {
  word-break: break-all;
}
</style>
