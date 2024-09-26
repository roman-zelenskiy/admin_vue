<script setup lang="ts">
import quillEditor from "@/components/plugins/QuillEditor.vue";
import vueSelect from "@/components/plugins/VueSelect.vue";
import InputImage from "@/components/ui/InputImage.vue";
import datepicker from "@/components/plugins/Datepicker.vue";

import { ref, computed, watch } from "vue";
import { formatDate, generateUniqueId } from "@/utils";

import { useCountriesStore } from "@/stores/countries.ts";
import { useCategoriesStore } from "@/stores/categories.ts";
import { useAppConstantsStore } from "@/stores/app-constants.ts";
import { useCustomersStore } from "@/stores/customers.ts";
import { useSkillsStore } from "@/stores/skills.ts";

type Props =
  | {
      type: "Create";
      payloadInputs: CreateCustomer;
    }
  | {
      type: "Update";
      payloadInputs: CreateCustomer;
      customerId: Customer["id"];
    };

const props = defineProps<Props>();

const countriesStore = useCountriesStore();
const categoriesStore = useCategoriesStore();
const customersStore = useCustomersStore();
const appConstantsStore = useAppConstantsStore();
const skillsStore = useSkillsStore();

const emits = defineEmits(["update:modelValue"]);

const visibilityOptions = appConstantsStore.visibilityOptions;
const countries = computed(() => [
  "Multinational",
  ...countriesStore.countriesList,
]);
const languages = computed(() => countriesStore.languagesList);
const { categories } = categoriesStore.getAllCategories();
const { documents: skills } = skillsStore.getAllDocuments();

const error = ref("");
const message = ref("");

const previewExperience = ref<CreateCustomer["experience"][0]>({
  id: "",
  logo: "",
  company: "",
  position: "",
  country: "",
  city: "",
  employmentType: "",
  start: "",
  end: "",
  comment: "",
});

const changeDateExperience = computed({
  get: () => [previewExperience.value.start, previewExperience.value.end],
  set: (arrayDate: string[] | null[]) => {
    previewExperience.value.start = arrayDate[0] || "";
    previewExperience.value.end = arrayDate[1] || "";
  },
});

const inputs = computed({
  get: () => props.payloadInputs,
  set: (newValue: Props["payloadInputs"]) => {
    emits("update:modelValue", newValue);
  },
});
const imagePreviews = ref<{ [key: number]: string }>({});

const previewImage = (logo: string | File, index: number) => {
  if (typeof logo === "string") {
    imagePreviews.value[index] = logo;
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    imagePreviews.value[index] = reader.result as string;
  };
  reader.readAsDataURL(logo);
};

watch(
  () => inputs.value.experience,
  (newExperience) => {
    newExperience.forEach((el, index) => {
      previewImage(el.logo, index);
    });
  },
  { deep: true }
);

const showExperience = computed(() => {
  return inputs.value.experience.map((el, index) => {
    return {
      ...el,
      logo: imagePreviews.value[index] || "",
    };
  });
});

const validation = () => {
  if (inputs.value.phone.length === 0) {
    error.value = "There must be a phone number!";
    return false;
  }
  if (inputs.value.email.length === 0) {
    error.value = "There must be a email!";
    return false;
  }
  if (inputs.value.websiteSocial.length === 0) {
    error.value = "There must be a website!";
    return false;
  }
  if (!inputs.value.aboutUser) {
    error.value = "There must be a About User field!";
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
    const i: CreateCustomer = inputs.value as CreateCustomer;
    i.createdAt = new Date().toISOString();
    i.updatedAt = new Date().toISOString();
    response = await customersStore.createCustomer(i);
  }

  if (props.type === "Update") {
    inputs.value.updatedAt = new Date().toISOString();
    response = await customersStore.updateCustomer(
      inputs.value,
      props.customerId
    );
  }

  if (response.status === 0) {
    error.value = "The action is unsuccessful!";
  }
  if (response.status === 1) {
    message.value = "The action is successful!";
  }
};

const resetPreviewExperience = () => {
  for (const key of Object.keys(previewExperience.value)) {
    (previewExperience.value as Record<string, "">)[key] = "";
  }
};

const actionExperience = async () => {
  if (previewExperience.value.id) {
    inputs.value.experience = inputs.value.experience.map((el) => {
      if (el.id === previewExperience.value.id) {
        return {
          ...previewExperience.value,
        };
      }
    });
  } else {
    inputs.value.experience.push({
      ...previewExperience.value,
      id: generateUniqueId(),
    });
  }
  resetPreviewExperience();
};

const removeExperience = (id: string) => {
  inputs.value.experience = inputs.value.experience.filter(
    (el) => el.id !== id
  );
};

const changePreviewExperience = (id: string) => {
  const currentExperience = inputs.value.experience.find((el) => el.id === id);
  if (currentExperience) {
    previewExperience.value = { ...currentExperience };
  }
};

const addSocial = (type: "email" | "phone" | "websiteSocial") => {
  inputs.value[type].push({
    type: "",
    value: "",
  });
};
const removeSocial = (
  type: "email" | "phone" | "websiteSocial",
  index: number
) => {
  inputs.value[type] = inputs.value[type].filter((el, ind) => ind !== index);
};

const addSkills = () => {
  inputs.value.skills?.push({
    id: "",
    properties: [],
  });
};
const removeSkills = (index: number) => {
  inputs.value.skills = inputs.value.skills?.filter(
    (_el, ind) => ind !== index
  );
};
</script>

<template>
  <div class="d-flex align-items-center mb-3">
    <div>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="javascript:;">PAGES</a></li>
        <li class="breadcrumb-item active text-uppercase">
          {{ type }} CUSTOMER
        </li>
      </ol>
      <h1 class="page-header mb-0">{{ type }} Customer</h1>
    </div>
  </div>

  <div class="row gx-4">
    <form action="#" id="form-main-user" @submit.prevent="actionPage">
      <div class="">
        <card class="mb-4">
          <card-header
            class="d-flex align-items-center bg-inverse bg-opacity-10 fw-400"
          >
            Customer Information
          </card-header>
          <card-body>
            <div class="row">
              <div>
                <div class="row">
                  <div class="col-md-6 row-md-3 mb-3">
                    <label class="form-label"
                      >Photo <span class="text-danger"></span
                    ></label>
                    <InputImage v-model="inputs.photo"></InputImage>
                  </div>
                  <div class="col-md-6 mb-3">
                    <div class="mb-3">
                      <label class="form-label"
                        >Name <span class="text-danger">*</span></label
                      >
                      <input
                        v-model="inputs.name"
                        type="text"
                        class="form-control"
                        name="name"
                        required
                        placeholder="Customer name"
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label"
                        >Surname <span class="text-danger">*</span></label
                      >
                      <input
                        v-model="inputs.surname"
                        type="text"
                        class="form-control"
                        name="surname"
                        required
                        placeholder="Customer surname"
                      />
                    </div>

                    <div class="mb-3">
                      <label class="form-label"
                        >REF <span class="text-danger">*</span></label
                      >
                      <input
                        v-model="inputs.ref"
                        type="text"
                        class="form-control"
                        name="ref"
                        required
                        placeholder="Customer REF"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label"
                  >Type account <span class="text-danger">*</span></label
                >
                <vue-select
                  v-model="inputs.typeAccount"
                  :options="['Business account', 'Personal account']"
                  placeholder="Select an option"
                >
                </vue-select>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label"
                  >Company <span class="text-danger">*</span></label
                >
                <input
                  required
                  v-model="inputs.company"
                  type="text"
                  class="form-control"
                  name="surname"
                  placeholder="Company title"
                />
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label"
                  >Year of the company's foundation
                  <span class="text-danger">*</span></label
                >
                <input
                  required
                  v-model="inputs.yearCompanyFoundation"
                  type="number"
                  class="form-control"
                  name="surname"
                  placeholder=""
                />
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Role </label>
                <vue-select
                  v-model="inputs.role"
                  :options="[
                    'Owner',
                    'Manager',
                    'Agent',
                    'Lead',
                    'Buyer',
                    'Coordinator',
                    'Integrator',
                    'Marketing',
                    'Receptionist',
                    'Team leader',
                  ]"
                  placeholder="Select an option"
                ></vue-select>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Category </label>
                <select v-model="inputs.categoryId" class="form-select">
                  <option selected value="">Select a category</option>
                  <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.title }}
                  </option>
                </select>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label"
                  >Country <span class="text-danger">*</span>
                </label>
                <vue-select
                  v-model="inputs.country"
                  :options="countries"
                  placeholder="Select an country"
                >
                  <template #search-template="{ attributes, events }">
                    <input
                      class="vs__search form-control"
                      :required="!inputs.country"
                      v-bind="attributes"
                      v-on="events"
                    />
                  </template>
                </vue-select>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label"
                  >State <span class="text-danger">*</span></label
                >
                <input
                  v-model="inputs.state"
                  required
                  type="text"
                  class="form-control"
                  name="state"
                  placeholder="Customer state"
                />
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label"
                  >City <span class="text-danger">*</span></label
                >
                <input
                  v-model="inputs.city"
                  required
                  type="text"
                  class="form-control"
                  name="city"
                  placeholder="Customer city"
                />
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label"
                  >Address <span class="text-danger">*</span></label
                >
                <input
                  v-model="inputs.address"
                  required
                  type="text"
                  class="form-control"
                  name="address"
                  placeholder="Customer address"
                />
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label"
                  >Language <span class="text-danger">*</span>
                </label>
                <vue-select
                  v-model="inputs.language"
                  :options="languages"
                  placeholder="Select an language"
                >
                  <template #search-template="{ attributes, events }">
                    <input
                      class="vs__search form-control"
                      :required="!inputs.language"
                      v-bind="attributes"
                      v-on="events"
                    />
                  </template>
                </vue-select>
              </div>

              <div class="col-md-6 mb-3">
                <label class="form-label"
                  >Partners <span class="text-danger">*</span></label
                >
                <input
                  v-model="inputs.partners"
                  required
                  type="number"
                  class="form-control"
                  name="partners"
                  placeholder="Customer partners"
                />
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label"
                  >Listings <span class="text-danger">*</span></label
                >
                <input
                  v-model="inputs.listings"
                  required
                  type="number"
                  class="form-control"
                  name="listings"
                  placeholder="Customer listings"
                />
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Available slots </label>
                <input
                  v-model="inputs.availableSlots"
                  type="number"
                  class="form-control"
                  name="availableSlots"
                  placeholder="Available slots"
                />
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Customers </label>
                <input
                  v-model="inputs.customers"
                  type="number"
                  class="form-control"
                  name="customers"
                  placeholder="Customer customers"
                />
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Leads </label>
                <input
                  v-model="inputs.leads"
                  type="number"
                  class="form-control"
                  name="leads"
                  placeholder="Customer leads"
                />
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Buyers </label>
                <input
                  v-model="inputs.buyers"
                  type="number"
                  class="form-control"
                  name="buyers"
                  placeholder="Customer buyers"
                />
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Sellers </label>
                <input
                  v-model="inputs.sellers"
                  type="number"
                  class="form-control"
                  name="sellers"
                  placeholder="Customer sellers"
                />
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label">Followers </label>
                <input
                  v-model="inputs.followers"
                  type="number"
                  class="form-control"
                  name="followers"
                  placeholder="Customer followers"
                />
              </div>

              <div class="">
                <label class="form-label"
                  >About user <span class="text-danger">*</span></label
                >
                <div class="form-control p-0">
                  <div class="border-0">
                    <quill-editor
                      v-model:content="inputs.aboutUser"
                      contentType="html"
                      theme="snow"
                      class="h-250px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </card-body>
        </card>
        <div class="">
          <card class="mb-4">
            <card-header
              class="d-flex align-items-center fw-400 bg-inverse bg-opacity-15"
            >
              <div class="flex-1">
                <div>Experience</div>
              </div>
            </card-header>
            <card-body>
              <div class="row">
                <div class="col-lg-8 overflow-auto">
                  <table class="table table-hover text-nowrap">
                    <thead>
                      <tr>
                        <th class="pt-0 pb-2"></th>
                        <th class="pt-0 pb-2">Company</th>
                        <th class="pt-0 pb-2">Position</th>
                        <th class="pt-0 pb-2">Work period</th>
                        <th class="pt-0 pb-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="experience in showExperience"
                        :key="experience.id"
                      >
                        <td>
                          <div class="d-flex align-items-center">
                            <div
                              class="w-60px h-60px bg-gray-100 d-flex align-items-center justify-content-center"
                            >
                              <img
                                alt=""
                                class="mw-100 mh-100"
                                :src="experience.logo"
                              />
                            </div>
                          </div>
                        </td>
                        <td class="align-middle">{{ experience.company }}</td>
                        <td class="align-middle">{{ experience.position }}</td>
                        <td class="align-middle">
                          {{ formatDate(experience.start) }} -
                          {{ formatDate(experience.end) }}
                        </td>
                        <td class="align-middle">
                          <div class="d-flex align-items-center gap-1">
                            <button
                              type="button"
                              @click="changePreviewExperience(experience.id)"
                              class="btn btn-light"
                            >
                              <i class="fas fa-edit"></i>
                            </button>
                            <button
                              type="button"
                              @click="removeExperience(experience.id)"
                              class="btn btn-light"
                            >
                              <i class="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="col-lg-4">
                  <form
                    id="form-add-expirience"
                    @submit.prevent="actionExperience"
                  >
                    <div class="mb-3">
                      <label class="form-label">Logo </label>
                      <InputImage v-model="previewExperience.logo"></InputImage>
                    </div>
                    <div class="mb-3">
                      <label class="form-label"
                        >Company <span class="text-danger">*</span></label
                      >
                      <input
                        v-model="previewExperience.company"
                        required
                        type="text"
                        class="form-control"
                        name="company"
                        placeholder="Company title"
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label"
                        >Position <span class="text-danger">*</span></label
                      >
                      <input
                        v-model="previewExperience.position"
                        required
                        type="text"
                        class="form-control"
                        name="position"
                        placeholder="Position"
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Country </label>
                      <vue-select
                        v-model="previewExperience.country"
                        :options="countries"
                        placeholder="Select an country"
                      ></vue-select>
                    </div>
                    <div class="mb-3">
                      <label class="form-label"
                        >City <span class="text-danger"></span
                      ></label>
                      <input
                        v-model="previewExperience.city"
                        type="text"
                        class="form-control"
                        name="city"
                        placeholder="City"
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Employment type </label>
                      <vue-select
                        v-model="previewExperience.employmentType"
                        :options="[
                          'Full time',
                          'Part time',
                          'Self-employed',
                          'Freelancer',
                          'Intership',
                        ]"
                        placeholder="Select an option"
                      ></vue-select>
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Work period </label>
                      <datepicker
                        v-model="changeDateExperience"
                        :enable-time-picker="false"
                        range
                        multiCalendars
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label">Comment</label>
                      <div class="form-control p-0">
                        <div class="border-0">
                          <quill-editor
                            v-model:content="previewExperience.comment"
                            contentType="html"
                            theme="snow"
                            class="h-250px"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="d-flex justify-content-end">
                      <button
                        class="btn btn-theme fileinput-button me-2 mb-1"
                        type="submit"
                        form="form-add-expirience"
                      >
                        <i
                          v-if="!previewExperience.id"
                          class="fa fa-fw fa-plus"
                        ></i>
                        <i
                          v-if="previewExperience.id"
                          class="fa fa-fw fa-edit"
                        ></i>
                        <span v-if="!previewExperience.id">Add Experience</span>
                        <span v-if="previewExperience.id"
                          >Update Experience</span
                        >
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </card-body>
          </card>
        </div>

        <card class="mb-4">
          <card-header
            class="d-flex align-items-center bg-inverse bg-opacity-10 fw-400"
          >
            Skills
          </card-header>
          <card-body>
            <div class="row">
              <div>
                <div class="row">
                  <div
                    class="d-flex align-items-center justify-content-between"
                  >
                    <button
                      @click="addSkills"
                      type="button"
                      class="btn btn-theme fileinput-button me-2 mb-1"
                    >
                      <i class="fa fa-fw fa-plus"></i>
                      <span>Add feature...</span>
                    </button>
                  </div>
                  <div
                    v-for="(item, index) in inputs.skills"
                    :key="index"
                    class="row mb-3 gx-3"
                  >
                    <div class="col">
                      <select v-model="item.id" class="form-select">
                        <option selected value="">Select a category</option>
                        <option
                          v-for="skill in skills"
                          :key="skill.id"
                          :value="skill.id"
                        >
                          {{ skill.title }}
                        </option>
                      </select>
                    </div>
                    <div class="col">
                      <vue-select
                        v-model="item.properties"
                        :options="
                          skills.find((el) => el.id === item.id)?.properties
                        "
                        placeholder="Select an options"
                        multiple
                      ></vue-select>
                    </div>
                    <div class="col-1">
                      <button
                        @click="removeSkills(index)"
                        type="button"
                        href="#"
                        class="btn btn-default d-block"
                      >
                        <i class="fa fa-xmark"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </card-body>
        </card>

        <card class="mb-4">
          <card-header
            class="d-flex align-items-center bg-inverse bg-opacity-15 fw-400"
          >
            Contacts
          </card-header>
          <card-body>
            <div>
              <div class="d-flex align-items-center justify-content-between">
                <p><strong>Phone</strong></p>
                <button
                  type="button"
                  @click="addSocial('phone')"
                  class="btn btn-theme fileinput-button me-2 mb-1"
                >
                  <i class="fa fa-fw fa-plus"></i>
                  <span>Add phone...</span>
                </button>
              </div>
              <div class="row mb-3 fw-bold text-body">
                <div class="col">Option type</div>
                <div class="col">Option values</div>
                <div class="col-1"></div>
              </div>
              <div
                v-for="(item, index) in inputs.phone"
                :key="index"
                class="row mb-3 gx-3"
              >
                <div class="col">
                  <input
                    required
                    v-model="item.type"
                    type="text"
                    class="form-control"
                    name="variant[0][name]"
                    placeholder=""
                  />
                </div>
                <div class="col">
                  <input
                    required
                    v-model="item.value"
                    type="text"
                    class="form-control"
                    name="variant[0][name]"
                    placeholder=""
                  />
                </div>
                <div class="col-1">
                  <button
                    type="button"
                    @click="removeSocial('phone', index)"
                    href="#"
                    class="btn btn-default d-block"
                  >
                    <i class="fa fa-xmark"></i>
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div class="d-flex align-items-center justify-content-between">
                <p><strong>Email</strong></p>
                <button
                  type="button"
                  @click="addSocial('email')"
                  class="btn btn-theme fileinput-button me-2 mb-1"
                >
                  <i class="fa fa-fw fa-plus"></i>
                  <span>Add email...</span>
                </button>
              </div>
              <div class="row mb-3 fw-bold text-body">
                <div class="col">Option type</div>
                <div class="col">Option values</div>
                <div class="col-1"></div>
              </div>
              <div
                v-for="(item, index) in inputs.email"
                :key="index"
                class="row mb-3 gx-3"
              >
                <div class="col">
                  <input
                    required
                    v-model="item.type"
                    type="text"
                    class="form-control"
                    name="variant[0][name]"
                    placeholder=""
                  />
                </div>
                <div class="col">
                  <input
                    required
                    type="email"
                    class="form-control"
                    name="variant[0][name]"
                    placeholder=""
                    v-model="item.value"
                  />
                </div>
                <div class="col-1">
                  <button
                    type="button"
                    @click="removeSocial('email', index)"
                    href="#"
                    class="btn btn-default d-block"
                  >
                    <i class="fa fa-xmark"></i>
                  </button>
                </div>
              </div>
            </div>
            <div>
              <div class="d-flex align-items-center justify-content-between">
                <p><strong>Website/Social</strong></p>
                <button
                  type="button"
                  @click="addSocial('websiteSocial')"
                  class="btn btn-theme fileinput-button me-2 mb-1"
                >
                  <i class="fa fa-fw fa-plus"></i>
                  <span>Add option...</span>
                </button>
              </div>
              <div class="row mb-3 fw-bold text-body">
                <div class="col">Option type</div>
                <div class="col">Option values</div>
                <div class="col-1"></div>
              </div>
              <div
                v-for="(item, index) in inputs.websiteSocial"
                :key="index"
                class="row mb-3 gx-3"
              >
                <div class="col">
                  <input
                    required
                    v-model="item.type"
                    type="text"
                    class="form-control"
                    name="variant[0][name]"
                    placeholder=""
                  />
                </div>
                <div class="col">
                  <input
                    required
                    type="text"
                    class="form-control"
                    name="variant[0][name]"
                    placeholder=""
                    v-model="item.value"
                  />
                </div>
                <div class="col-1">
                  <button
                    type="button"
                    @click="removeSocial('websiteSocial', index)"
                    href="#"
                    class="btn btn-default d-block"
                  >
                    <i class="fa fa-xmark"></i>
                  </button>
                </div>
              </div>
            </div>
          </card-body>
        </card>

        <card class="mb-4">
          <card-header
            class="d-flex align-items-center bg-inverse bg-opacity-15 fw-400"
          >
            Notifications
          </card-header>
          <card-body>
            <div class="p-3 bg-inverse bg-opacity-10">
              <div class="form-group mb-0">
                <div class="shipping-container">
                  <div class="row align-items-center">
                    <div class="col-6 pt-1 pb-1">Display block catalogue</div>
                    <div class="col-6 d-flex align-items-center">
                      <div class="form-check w-100 form-switch ms-auto">
                        <vue-select
                          v-model="inputs.displayBlockCatalogue"
                          :options="['Countries', 'Type', 'Class', 'Market']"
                          placeholder="Select an option"
                        ></vue-select>
                        <label class="form-check-label" for="">&nbsp;</label>
                      </div>
                    </div>
                  </div>
                  <hr class="mt-2 mb-2" />

                  <div class="row align-items-center">
                    <div class="col-6 pt-1 pb-1">
                      Display comision for partners
                    </div>
                    <div class="col-6 d-flex align-items-center">
                      <div class="form-check w-100 form-switch ms-auto">
                        <vue-select
                          v-model="inputs.displayComisionForPartners"
                          :options="visibilityOptions"
                          placeholder="Select an option"
                        ></vue-select>
                        <label class="form-check-label" for="">&nbsp;</label>
                      </div>
                    </div>
                  </div>
                  <hr class="mt-2 mb-2" />

                  <div class="row align-items-center">
                    <div class="col-6 pt-1 pb-1">Display my partners for</div>
                    <div class="col-6 d-flex align-items-center">
                      <div class="form-check w-100 form-switch ms-auto">
                        <vue-select
                          v-model="inputs.displayMyPartnersFor"
                          :options="visibilityOptions"
                          placeholder="Select an option"
                        ></vue-select>
                        <label class="form-check-label" for="">&nbsp;</label>
                      </div>
                    </div>
                  </div>
                  <hr class="mt-2 mb-2" />

                  <div class="row align-items-center">
                    <div class="col-6 pt-1 pb-1">
                      Activate comments in my posts for
                    </div>
                    <div class="col-6 d-flex align-items-center">
                      <div class="form-check w-100 form-switch ms-auto">
                        <vue-select
                          v-model="inputs.activateCommentsInMyPostsFor"
                          :options="visibilityOptions"
                          placeholder="Select an option"
                        ></vue-select>
                        <label class="form-check-label" for="">&nbsp;</label>
                      </div>
                    </div>
                  </div>
                  <hr class="mt-2 mb-2" />

                  <div class="row align-items-center">
                    <div class="col-6 pt-1 pb-1">
                      Receive invitation to group by
                    </div>
                    <div class="col-6 d-flex align-items-center">
                      <div class="form-check w-100 form-switch ms-auto">
                        <vue-select
                          v-model="inputs.receiveInvitationToGroupBy"
                          :options="visibilityOptions"
                          placeholder="Select an option"
                        ></vue-select>
                        <label class="form-check-label" for="">&nbsp;</label>
                      </div>
                    </div>
                  </div>
                  <hr class="mt-2 mb-2" />

                  <div class="row align-items-center">
                    <div class="col-6 pt-1 pb-1">
                      Receive invitation to events by
                    </div>
                    <div class="col-6 d-flex align-items-center">
                      <div class="form-check w-100 form-switch ms-auto">
                        <vue-select
                          v-model="inputs.receiveInvitationToEventsBy"
                          :options="visibilityOptions"
                          placeholder="Select an option"
                        ></vue-select>
                        <label class="form-check-label" for="">&nbsp;</label>
                      </div>
                    </div>
                  </div>
                  <hr class="mt-2 mb-2" />

                  <div class="row align-items-center">
                    <div class="col-6 pt-1 pb-1">
                      Notification payment by status invoice
                    </div>
                    <div class="col-6 d-flex align-items-center">
                      <div class="form-check w-100 form-switch ms-auto">
                        <vue-select
                          v-model="inputs.notificationPaymentByStatusInvoice"
                          :options="['Failed', 'Paid']"
                          placeholder="Select an option"
                        ></vue-select>
                        <label class="form-check-label" for="">&nbsp;</label>
                      </div>
                    </div>
                  </div>
                  <hr class="mt-2 mb-2" />

                  <div class="row align-items-center">
                    <div class="col-6 pt-1 pb-1">Alert unreaded contacts</div>
                    <div class="col-6 d-flex align-items-center">
                      <div class="form-check w-100 form-switch ms-auto">
                        <input
                          v-model="inputs.alertUnreadedContacts"
                          type="number"
                          class="form-control"
                          name="partners"
                        />
                        <label class="form-check-label" for="">&nbsp;</label>
                      </div>
                    </div>
                  </div>
                  <hr class="mt-2 mb-2" />

                  <div class="row align-items-center">
                    <div class="col-6 pt-1 pb-1">
                      Alert declined booking a viewing
                    </div>
                    <div class="col-6 d-flex align-items-center">
                      <div class="form-check w-100 form-switch ms-auto">
                        <input
                          v-model="inputs.alertDeclinedBookingAViewing"
                          type="number"
                          class="form-control"
                          name="partners"
                        />
                        <label class="form-check-label" for="">&nbsp;</label>
                      </div>
                    </div>
                  </div>
                  <hr class="mt-2 mb-2" />

                  <div class="row align-items-center">
                    <div class="col-6 pt-1 pb-1">
                      Notification show activity on the market by type in
                      different cities
                    </div>
                    <div class="col-6 d-flex align-items-center">
                      <div class="form-check w-100 form-switch ms-auto">
                        <input
                          v-model="
                            inputs.notificationShowActivityOnTheMarketByTypeInDifferentCities
                          "
                          type="text"
                          class="form-control"
                          name="partners"
                        />
                        <label class="form-check-label" for="">&nbsp;</label>
                      </div>
                    </div>
                  </div>
                  <hr class="mt-2 mb-2" />

                  <div class="row align-items-center">
                    <div class="col-6 pt-1 pb-1">
                      Notification show price analysis by type in diferent
                      cities
                    </div>
                    <div class="col-6 d-flex align-items-center">
                      <div class="form-check w-100 form-switch ms-auto">
                        <input
                          v-model="
                            inputs.notificationShowPriceAnalysisByTypeInDifferentCities
                          "
                          type="text"
                          class="form-control"
                          name="partners"
                        />
                        <label class="form-check-label" for="">&nbsp;</label>
                      </div>
                    </div>
                  </div>
                  <hr class="mt-2 mb-2" />

                  <div class="row align-items-center">
                    <div class="col-6 pt-1 pb-1">
                      Notification subscription Expire Days
                    </div>
                    <div class="col-6 d-flex align-items-center">
                      <div class="form-check w-100 form-switch ms-auto">
                        <input
                          v-model="inputs.notificationSubscriptionExpireDays"
                          type="number"
                          class="form-control"
                          name="partners"
                        />
                        <label class="form-check-label" for="">&nbsp;</label>
                      </div>
                    </div>
                  </div>
                  <hr class="mt-2 mb-2" />

                  <div class="row align-items-center">
                    <div class="col-6 pt-1 pb-1">
                      Notification display profile
                    </div>
                    <div class="col-6 d-flex align-items-center">
                      <div class="form-check form-switch ms-auto">
                        <input
                          v-model="inputs.notificationDisplayProfile"
                          type="checkbox"
                          class="form-check-input"
                          id="shippingFree"
                          name="shipping_free_enable"
                        />
                        <label class="form-check-label" for="shippingFree"
                          >&nbsp;</label
                        >
                      </div>
                    </div>
                  </div>
                  <hr class="mt-2 mb-2" />
                  <div class="row align-items-center">
                    <div class="col-6 pt-1 pb-1">
                      Notification display real estate
                    </div>
                    <div class="col-6 d-flex align-items-center">
                      <div class="form-check form-switch ms-auto">
                        <input
                          v-model="inputs.notificationDisplayRealEstate"
                          type="checkbox"
                          class="form-check-input"
                          id="shippingAliExpress"
                          name="shipping_enable"
                        />
                        <label class="form-check-label" for="shippingAliExpress"
                          >&nbsp;</label
                        >
                      </div>
                    </div>
                  </div>
                  <hr class="mt-2 mb-2" />
                  <div class="row align-items-center">
                    <div class="col-6 pt-1 pb-1">
                      Who can send me a private message
                    </div>
                    <div class="col-6 d-flex align-items-center">
                      <div class="form-check form-switch ms-auto">
                        <input
                          v-model="inputs.whoCanSendMePrivateMessage"
                          type="checkbox"
                          class="form-check-input"
                          id="shippingSaleHoo"
                          name="shipping_enable"
                        />
                        <!-- <vue-select
                          v-model="inputs.displayMyPartnersFor"
                          :options="visibilityOptions"
                          placeholder="Select an option"
                        ></vue-select> -->
                        <label class="form-check-label" for="shippingSaleHoo"
                          >&nbsp;</label
                        >
                      </div>
                    </div>
                  </div>
                  <hr class="mt-2 mb-2" />
                  <div class="row align-items-center">
                    <div class="col-6 pt-1 pb-1">
                      Notification receive request
                    </div>
                    <div class="col-6 d-flex align-items-center">
                      <div class="form-check form-switch ms-auto">
                        <input
                          v-model="inputs.notificationReceiveRequest"
                          type="checkbox"
                          class="form-check-input"
                          id="shippingMegagoods"
                          name="shipping_enable"
                        />
                        <label class="form-check-label" for="shippingMegagoods"
                          >&nbsp;</label
                        >
                      </div>
                    </div>
                  </div>
                  <hr class="mt-2 mb-2" />
                  <div class="row align-items-center">
                    <div class="col-6 pt-1 pb-1">
                      Notification booking a viewing
                    </div>
                    <div class="col-6 d-flex align-items-center">
                      <div class="form-check form-switch ms-auto">
                        <input
                          v-model="inputs.notificationBookingAViewing"
                          type="checkbox"
                          class="form-check-input"
                          id="shippingWholesale2B"
                          name="shipping_enable"
                        />
                        <label
                          class="form-check-label"
                          for="shippingWholesale2B"
                          >&nbsp;</label
                        >
                      </div>
                    </div>
                  </div>
                  <hr class="mt-2 mb-2" />
                  <div class="row align-items-center">
                    <div class="col-6 pt-1 pb-1">
                      Notification make an offer
                    </div>
                    <div class="col-6 d-flex align-items-center">
                      <div class="form-check form-switch ms-auto">
                        <input
                          v-model="inputs.notificationMakeAnOffer"
                          type="checkbox"
                          class="form-check-input"
                          id="shippingSunriseWholesale"
                          name="shipping_enable"
                        />
                        <label
                          class="form-check-label"
                          for="shippingSunriseWholesale"
                          >&nbsp;</label
                        >
                      </div>
                    </div>
                  </div>
                  <hr class="mt-2 mb-2" />
                  <div class="row align-items-center">
                    <div class="col-6 pt-1 pb-1">
                      Receive notification of sharing leads from other partners
                    </div>
                    <div class="col-6 d-flex align-items-center">
                      <div class="form-check form-switch ms-auto">
                        <input
                          v-model="
                            inputs.receiveNotificationOfSharingLeadsFromOtherPartners
                          "
                          type="checkbox"
                          class="form-check-input"
                          id="shippingSunriseWholesale"
                          name="shipping_enable"
                        />
                        <label
                          class="form-check-label"
                          for="shippingSunriseWholesale"
                          >&nbsp;</label
                        >
                      </div>
                    </div>
                  </div>
                  <hr class="mt-2 mb-2" />
                  <div class="row align-items-center">
                    <div class="col-6 pt-1 pb-1">
                      Receive notification of new added real estate by other
                      partners
                    </div>
                    <div class="col-6 d-flex align-items-center">
                      <div class="form-check form-switch ms-auto">
                        <input
                          v-model="
                            inputs.receiveNotificationOfNewAddedRealEstateByOtherPartners
                          "
                          type="checkbox"
                          class="form-check-input"
                          id="shippingSunriseWholesale"
                          name="shipping_enable"
                        />
                        <label
                          class="form-check-label"
                          for="shippingSunriseWholesale"
                          >&nbsp;</label
                        >
                      </div>
                    </div>
                  </div>
                  <hr class="mt-2 mb-2" />

                  <div class="row align-items-center">
                    <div class="col-6 pt-1 pb-1">
                      Notification Show Viewing Data
                    </div>
                    <div class="col-6 d-flex align-items-center">
                      <div class="form-check form-switch ms-auto">
                        <input
                          v-model="inputs.notificationShowViewingData"
                          type="checkbox"
                          class="form-check-input"
                          id="shippingSunriseWholesale"
                          name="shipping_enable"
                        />
                        <label
                          class="form-check-label"
                          for="shippingSunriseWholesale"
                          >&nbsp;</label
                        >
                      </div>
                    </div>
                  </div>
                  <hr class="mt-2 mb-2" />

                  <div class="row align-items-center">
                    <div class="col-6 pt-1 pb-1">Verified</div>
                    <div class="col-6 d-flex align-items-center">
                      <div class="form-check form-switch ms-auto">
                        <input
                          v-model="inputs.verified"
                          type="checkbox"
                          class="form-check-input"
                          id="shippingSunriseWholesale"
                          name="shipping_enable"
                        />
                        <label
                          class="form-check-label"
                          for="shippingSunriseWholesale"
                          >&nbsp;</label
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </card-body>
        </card>

        <card class="mb-4">
          <card-header
            class="d-flex align-items-center bg-inverse bg-opacity-10 fw-400"
          >
            Billing information
          </card-header>
          <card-body>
            <div class="row">
              <div class="col-md-6 mb-3">
                <label class="form-label"
                  >Billing method <span class="text-danger">*</span></label
                >
                <vue-select
                  v-model="inputs.billingMethod"
                  :options="['E-Invoice', 'Paper invoice']"
                  placeholder="Select an option"
                >
                  <template #search-template="{ attributes, events }">
                    <input
                      class="vs__search form-control"
                      :required="!inputs.billingMethod"
                      v-bind="attributes"
                      v-on="events"
                    />
                  </template>
                </vue-select>
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label"
                  >Billion for <span class="text-danger"></span
                ></label>
                <vue-select
                  v-model="inputs.billingFor"
                  :options="[
                    'Membership',
                    'Subscription',
                    'Per listing',
                    'Per lead',
                  ]"
                  placeholder="Select an option"
                >
                </vue-select>
              </div>

              <div class="col-md-6 mb-3">
                <label class="form-label"
                  >Billing country <span class="text-danger">*</span></label
                >
                <vue-select
                  v-model="inputs.billingCountry"
                  :options="countries"
                  placeholder="Select an option"
                >
                  <template #search-template="{ attributes, events }">
                    <input
                      class="vs__search form-control"
                      :required="!inputs.billingCountry"
                      v-bind="attributes"
                      v-on="events"
                    />
                  </template>
                </vue-select>
              </div>

              <div class="col-md-6 mb-3">
                <label class="form-label"
                  >Billing state <span class="text-danger">*</span></label
                >
                <input
                  required
                  v-model="inputs.billingState"
                  type="text"
                  class="form-control"
                  name="surname"
                  placeholder="Billing state"
                />
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label"
                  >Billing address

                  <span class="text-danger">*</span></label
                >
                <input
                  required
                  v-model="inputs.billingAddress"
                  type="text"
                  class="form-control"
                  name="surname"
                  placeholder="Billing address"
                />
              </div>
              <div class="col-md-6 mb-3">
                <label class="form-label"
                  >Postal code <span class="text-danger">*</span></label
                >
                <input
                  required
                  v-model="inputs.postalCode"
                  type="text"
                  class="form-control"
                  name="surname"
                  placeholder="Postal code"
                />
              </div>

              <div class="col-md-6 mb-3">
                <label class="form-label"
                  >Method of payment <span class="text-danger">*</span></label
                >
                <vue-select
                  v-model="inputs.methodOfPayment"
                  :options="['Bank account', 'Card']"
                  placeholder="Select an option"
                >
                  <template #search-template="{ attributes, events }">
                    <input
                      class="vs__search form-control"
                      :required="!inputs.methodOfPayment"
                      v-bind="attributes"
                      v-on="events"
                    />
                  </template>
                </vue-select>
              </div>

              <div class="col-md-6 mb-3">
                <label class="form-label"
                  >Cicle of payment <span class="text-danger">*</span></label
                >
                <vue-select
                  v-model="inputs.cyclePayment"
                  :options="['At the begging', 'At the end']"
                  placeholder="Select an option"
                >
                  <template #search-template="{ attributes, events }">
                    <input
                      class="vs__search form-control"
                      :required="!inputs.cyclePayment"
                      v-bind="attributes"
                      v-on="events"
                    />
                  </template>
                </vue-select>
              </div>

              <div class="col-md-6 mb-3">
                <label class="form-label"
                  >Subcriptions <span class="text-danger">*</span></label
                >
                <vue-select
                  v-model="inputs.subscriptions"
                  :options="['Premium', 'Fremium']"
                  placeholder="Select an option"
                ></vue-select>
              </div>
            </div>
          </card-body>
        </card>
      </div>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <div v-if="message" class="alert alert-success">{{ message }}</div>
      <button type="submit" form="form-main-user" class="btn btn-theme">
        {{ type }} customer
      </button>
    </form>
  </div>
</template>
