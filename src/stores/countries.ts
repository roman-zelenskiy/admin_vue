import { defineStore } from "pinia";
import * as COUNTRIES from "@jagomf/countrieslist";
import { computed } from "vue";

export const useCountriesStore = defineStore("countries", () => {
  const countriesList = computed(() => {
    return Object.keys(COUNTRIES.en).map((el) => COUNTRIES.en[el]);
  });

  return {
    countriesList,
  };
});
