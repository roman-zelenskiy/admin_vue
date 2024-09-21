<script setup lang="ts">
import { ref, watch } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

interface QuillWrapperProps {
  content: string;
}

const props = defineProps<QuillWrapperProps>();
const emit = defineEmits(["update:content"]);
const refQuill = ref();

const editorContent = ref(props.content);

watch(
  () => props.content,
  (newValue) => {
    if (newValue !== editorContent.value) {
      if (newValue === "") {
        refQuill.value.setContents("");
      }
      editorContent.value = newValue;
    }
  }
);

const onEditorChange = (content: string) => {
  emit("update:content", content);
};
</script>

<template>
  <QuillEditor
    ref="refQuill"
    v-model:content="editorContent"
    theme="snow"
    @update:content="onEditorChange"
  />
</template>
