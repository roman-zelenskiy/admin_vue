<script setup lang="ts">
import { ref } from "vue";
import FeatureDetails from "@/components/layouts/FeatureDetails.vue";
import { useRoute } from "vue-router";
import { useFeaturesStore } from "@/stores/features";

const featuresStore = useFeaturesStore();
const route = useRoute();
const documentId = `${route.params.id}`;

const inputs = ref<FeatureUpdate>({
  title: "",
  properties: [],
  updatedAt: "",
});

const getDocument = async () => {
  const { status, document } = await featuresStore.getDocumentById(documentId);
  console.log(status);

  if (status === 1) {
    console.log(document);
    inputs.value.title = document?.title || "";
    inputs.value.properties = document?.properties || [];
  }
};
getDocument();
</script>

<template>
  <div>
    <FeatureDetails
      :payloadInputs="inputs"
      :featureId="documentId"
      :type="'Update'"
    ></FeatureDetails>
  </div>
</template>

<style scoped></style>
