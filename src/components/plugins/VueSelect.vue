<script setup lang="ts">
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
</script>

<template>
  <v-select>
    <template #search="{ attributes, events }">
      <slot
        name="search-template"
        :attributes="attributes as any"
        :events="events as any"
      ></slot>
    </template>
  </v-select>
</template>
