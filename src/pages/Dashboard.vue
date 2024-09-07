<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
const auth = useAuthStore();
</script>
<template>
  <h1 class="page-header mb-3">
    Hi, {{ auth.user?.email }}
    <small>here's what's happening with your store today.</small>
  </h1>
</template>
