<script setup lang="ts">
import { ref } from "vue";
import SkillsDetails from "@/components/layouts/SkillsDetails.vue";
import { useRoute } from "vue-router";
import { useSkillsStore } from "@/stores/skills";

const skillsStore = useSkillsStore();
const route = useRoute();
const documentId = `${route.params.id}`;

const inputs = ref<SkillsUpdate>({
  title: "",
  properties: [],
  updatedAt: "",
});

const getDocument = async () => {
  const { status, document } = await skillsStore.getDocumentById(documentId);
  console.log(status);

  if (status === 1) {
    inputs.value.title = document?.title || "";
    inputs.value.properties = document?.properties || [];
  }
};
getDocument();
</script>

<template>
  <div>
    <SkillsDetails
      :payloadInputs="inputs"
      :skillsId="documentId"
      :type="'Update'"
    ></SkillsDetails>
  </div>
</template>

<style scoped></style>
