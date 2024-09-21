<script setup lang="ts">
import { ref } from "vue";
import CategoryDetails from "@/components/layouts/CategoryDetails.vue";
import { useRoute } from "vue-router";
import { useCategoriesStore } from "@/stores/categories";

const categoriesStore = useCategoriesStore();
const route = useRoute();
const categoryId = `${route.params.categoryId}`;

const inputs = ref<UpdateCategory>({
  title: "",
  description: "",
  updatedAt: ""
});

const getCategory = async () => {
  const { status, category } =
    await categoriesStore.getCategoryById(categoryId);

  if (status === 1) {
    inputs.value.title = category?.title || "";
    inputs.value.description = category?.title || "";
  }
};
getCategory();
</script>

<template>
  <div>
    <CategoryDetails
      :payloadInputs="inputs"
      :categoryId="categoryId"
      :type="'Update'"
    ></CategoryDetails>
  </div>
</template>

<style scoped></style>
