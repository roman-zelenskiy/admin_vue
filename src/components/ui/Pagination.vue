<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  currentPage: number;
  quantityPages: number;
}>();

const emits = defineEmits(["update:currentPage"]);

const changePage = (page: number) => {
  if (page <= 0) return false;
  emits("update:currentPage", page);
};

const showPages = computed(() => {
  const totalPages = props.quantityPages;
  const currentPage = props.currentPage;

  let startPage = Math.max(currentPage - 2, 1);

  if (startPage + 4 > totalPages) {
    startPage = Math.max(totalPages - 4, 1);
  }

  return Array.from(
    { length: Math.min(5, totalPages) },
    (_, i) => startPage + i
  );
});

const isShowLast = computed(
  () =>
    props.currentPage !== props.quantityPages &&
    !showPages.value.includes(props.quantityPages)
);
</script>

<template>
  <div class="d-md-flex align-items-center">
    <ul class="pagination mb-0 justify-content-center">
      <li class="page-item">
        <button @click="changePage(currentPage - 1)" class="page-link">
          Previous
        </button>
      </li>
      <li
        v-for="page in showPages"
        :key="page"
        :class="{ active: page === currentPage }"
        class="page-item"
      >
        <button class="page-link" @click="changePage(page)" href="#">
          {{ page }}
        </button>
      </li>
      <li v-if="isShowLast" class="page-item d-flex align-items-end">
        <span>...</span>
      </li>
      <li v-if="isShowLast" class="page-item">
        <button class="page-link" @click="changePage(quantityPages)">
          {{ quantityPages }}
        </button>
      </li>
      <li class="page-item">
        <button @click="changePage(currentPage + 1)" class="page-link" href="#">
          Next
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
