<script setup lang="ts">
import { computed, ref } from "vue";
import QuillEditor from "@/components/plugins/QuillEditor.vue";
import { useCategoriesStore } from "@/stores/categories";
import { formatDate } from "@/utils";

type Props =
  | {
      type: "Create";
      payloadInputs: CreateCategory;
    }
  | {
      type: "Update";
      payloadInputs: UpdateCategory;
      categoryId: string;
    };

const props = defineProps<Props>();

const emits = defineEmits(["update:modelValue"]);
const categoriesStore = useCategoriesStore();

const error = ref("");
const message = ref("");
const keyQuill = ref(1);

const inputs = computed({
  get: () => props.payloadInputs,
  set: (newValue: Props["payloadInputs"]) => {
    emits("update:modelValue", newValue);
  },
});

const actionPage = async () => {
  error.value = "";
  message.value = "";

  let response = { status: 0 };

  if (props.type === "Create") {
    const i: CreateCategory = inputs.value as CreateCategory;
    i.createdAt = new Date().toISOString();
    i.updatedAt = new Date().toISOString();
    response = await categoriesStore.createCategory(i);
  }

  if (props.type === "Update") {
    inputs.value.updatedAt = formatDate(new Date());
    response = await categoriesStore.updateCategory(
      inputs.value,
      props.categoryId
    );
  }

  if (response.status === 0) {
    error.value = "The action is unsuccessful!";
  }
  if (response.status === 1) {
    message.value = "The action is successful!";
    inputs.value.title = "";
    inputs.value.description = "";
    keyQuill.value++;
  }
};
</script>

<template>
  <div class="d-flex align-items-center mb-3">
    <div>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="javascript:;">PAGES</a></li>
        <li class="breadcrumb-item text-uppercase active">
          CATEGORY {{ type }}
        </li>
      </ol>
      <h1 class="page-header mb-0">Category {{ type }}</h1>
    </div>
  </div>

  <div class="row gx-4">
    <div class="col-lg-8">
      <form action="#" @submit.prevent="actionPage">
        <card class="mb-4">
          <card-header
            class="d-flex align-items-center bg-inverse bg-opacity-10 fw-400"
          >
            Product Information
          </card-header>
          <card-body>
            <div class="mb-3">
              <label class="form-label"
                >Title <span class="text-danger">*</span></label
              >
              <input
                v-model="inputs.title"
                type="text"
                required
                class="form-control"
                name="title"
                placeholder="Product name"
              />
            </div>
            <div class="">
              <label class="form-label"
                >Description <span class="text-danger"></span
              ></label>
              <div class="form-control p-0">
                <div class="border-0">
                  <quill-editor
                    :key="keyQuill"
                    :contentType="'html'"
                    v-model:content="inputs.description"
                    theme="snow"
                    class="h-250px"
                  />
                </div>
              </div>
            </div>
          </card-body>
        </card>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <div v-if="message" class="alert alert-success">{{ message }}</div>
        <button type="submit" class="btn btn-theme">{{ type }}</button>
      </form>
    </div>
  </div>
</template>
