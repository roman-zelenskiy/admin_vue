<script setup lang="ts">
import { ref } from "vue";
import CategoryDetails from "@/components/layouts/CategoryDetails.vue";

const inputs = ref<CreateCategory>({
  title: "",
  description: "",
  createdAt: "",
  updatedAt: "",
});
</script>

<template>
  <div>
    <CategoryDetails :payloadInputs="inputs" :type="'Create'"></CategoryDetails>
  </div>
</template>

<style scoped></style>
