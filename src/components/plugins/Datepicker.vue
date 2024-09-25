<template>
  <Datepicker
    v-model="formattedDate"
    :format="formatDate"
    @update:model-value="onDateChange"
    placeholder="Select month and year..."
    dark
    :range="range"
    :multi-calendars="multiCalendars"
  />
</template>

<script setup lang="ts">
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import { ref, defineProps, watch } from "vue";

const props = defineProps<{
  modelValue: string | string[] | null;
  range?: boolean;
  multiCalendars?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const formattedDate = ref<string | string[]>(props.modelValue || "");

const formatDate = (date: Date | Date[]): string | string[] => {
  if (date instanceof Date) {
    return date ? date.toISOString() : "";
  }

  if (Array.isArray(date) && date.length > 0) {
    return date.map((d) => d.toISOString());
  }

  return "";
};
const onDateChange = (date: Date | Date[] | null) => {
  formattedDate.value = date ? formatDate(date) : "";
  emit("update:modelValue", formattedDate.value);
};

watch(
  () => props.modelValue,
  (newVal) => {
    formattedDate.value = newVal;
  }
);
</script>
