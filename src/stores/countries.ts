import { defineStore } from "pinia";
import * as COUNTRIES from "@jagomf/countrieslist";
import { countries } from "countries-list";
import ISO6391 from "iso-639-1";
import { computed } from "vue";

export const useCountriesStore = defineStore("countries", () => {
  const countriesList = computed(() => {
    return Object.keys(COUNTRIES.en).map((el) => COUNTRIES.en[el]);
  });

  const languagesList = computed(() => {
    const languagesSet = new Set();

    Object.values(countries).forEach((country) => {
      country.languages.forEach((languageCode) => {
        const languageName = ISO6391.getName(languageCode);
        if (languageName) {
          languagesSet.add(languageName);
        }
      });
    });

    return Array.from(languagesSet);
  });

  return {
    countriesList,
    languagesList,
  };
});
