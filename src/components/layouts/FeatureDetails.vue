<script setup lang="ts">
import { computed, ref } from "vue";
import tagsInput from "@/components/plugins/TagsInput.vue";
import { useFeaturesStore } from "@/stores/features";

type Props =
  | {
      type: "Create";
      payloadInputs: FeatureCreate;
    }
  | {
      type: "Update";
      payloadInputs: FeatureUpdate;
      featureId: string;
    };

const props = defineProps<Props>();

const emits = defineEmits(["update:modelValue"]);
const featuresStore = useFeaturesStore();

const error = ref("");
const message = ref("");

const inputs = computed({
  get: () => props.payloadInputs,
  set: (newValue: Props["payloadInputs"]) => {
    emits("update:modelValue", newValue);
  },
});

const validation = () => {
  if (inputs.value.properties.length === 0) {
    error.value = "There must be a properties!";
    return false;
  }

  return true;
};

const actionPage = async () => {
  error.value = "";
  message.value = "";

  if (!validation()) return false;

  let response = { status: 0 };

  if (props.type === "Create") {
    const i: FeatureCreate = inputs.value as FeatureCreate;
    i.createdAt = new Date().toISOString();
    i.updatedAt = new Date().toISOString();
    response = await featuresStore.createDocument(i);
  }

  if (props.type === "Update") {
    inputs.value.updatedAt = new Date().toISOString();
    response = await featuresStore.updateDocument(
      inputs.value,
      props.featureId
    );
  }

  if (response.status === 0) {
    error.value = "The action is unsuccessful!";
  }
  if (response.status === 1) {
    message.value = "The action is successful!";
  }
};

const onChangeProperties = (newProperties: { text: string }[]) => {
  inputs.value.properties = newProperties.map((el) => el.text);
};
</script>

<template>
  <div class="d-flex align-items-center mb-3">
    <div>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="javascript:;">PAGES</a></li>
        <li class="breadcrumb-item text-uppercase active">
          Feature {{ type }}
        </li>
      </ol>
      <h1 class="page-header mb-0">Feature {{ type }}</h1>
    </div>
  </div>

  <div class="row gx-4">
    <div class="col-lg-8">
      <form action="#" @submit.prevent="actionPage">
        <card class="mb-4">
          <card-header
            class="d-flex align-items-center bg-inverse bg-opacity-10 fw-400"
          >
            Feature Information
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
            <div class="mb-3">
              <label class="form-label"
                >Properties <span class="text-danger">*</span></label
              >
              <tags-input
                @tags-changed="onChangeProperties"
                :tags="inputs.properties"
                :autocomplete-items="[]"
              />
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
