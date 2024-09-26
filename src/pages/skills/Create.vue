<script setup lang="ts">
import { ref } from "vue";
import SkillsDetails from "@/components/layouts/SkillsDetails.vue";

const inputs = ref<SkillsCreate>({
  title: "",
  properties: [],
  createdAt: "",
  updatedAt: "",
});
</script>

<template>
  <div>
    <SkillsDetails :payloadInputs="inputs" :type="'Create'"></SkillsDetails>
  </div>
</template>

<style scoped></style>
