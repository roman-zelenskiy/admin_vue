import { defineStore } from "pinia";

export const useAppConstantsStore = defineStore("constants", () => {
  const visibilityOptions: VisibilityOptions = [
    "All users",
    "All partners",
    "Only me",
    "Custom choose",
  ];

  return { visibilityOptions };
});
