<script setup lang="ts">
defineProps<{
  modelValue: boolean;
  title: string;
}>();

const emits = defineEmits(["update:modelValue", "actionSuccess"]);
</script>

<template>
  <div v-if="modelValue" class="modal_wrapper">
    <div class="modal align-items-center d-flex justify-content-center">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button
              @click="emits('update:modelValue', false)"
              type="button"
              class="btn-close"
            ></button>
          </div>
          <div class="modal-body text-center h5">
            <p>{{ title }}</p>
          </div>
          <div class="modal-footer justify-content-center">
            <button
              type="button"
              class="btn w-25 btn-danger"
              @click="emits('actionSuccess')"
            >
              Yes
            </button>
            <button
              type="button"
              @click="emits('update:modelValue', false)"
              class="btn w-25 btn-default"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal_wrapper .modal {
  background: rgba(0, 0, 0, 0.5);

  .modal-dialog {
    max-width: 400px;
    width: 100%;
  }
}
</style>
