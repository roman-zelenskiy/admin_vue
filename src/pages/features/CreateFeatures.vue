<script setup lang="ts">
import { ref } from "vue";
import FeatureDetails from "@/components/layouts/FeatureDetails.vue";

const inputs = ref<FeatureCreate>({
  title: "",
  properties: [],
  createdAt: "",
  updatedAt: "",
});
</script>

<template>
  <div>
    <FeatureDetails :payloadInputs="inputs" :type="'Create'"></FeatureDetails>
  </div>
</template>

<style scoped></style>
