<script setup lang="ts">
import vueSelect from "@/components/plugins/VueSelect.vue";
import datepicker from "@/components/plugins/Datepicker.vue";
import quillEditor from "@/components/plugins/QuillEditor.vue";
import InputFiles from "@/components/ui/InputFiles.vue";

import { ref, computed } from "vue";
import { generateUniqueId } from "@/utils";

import { useAppConstantsStore } from "@/stores/app-constants.ts";
import { useFeaturesStore } from "@/stores/features";
import { useCustomersStore } from "@/stores/customers.ts";
import { useRealEstateStore } from "@/stores/realEstate.ts";

type Props =
  | {
      type: "Create";
      payloadInputs: CreateRealEstate;
    }
  | {
      type: "Update";
      payloadInputs: CreateRealEstate;
      realEstateId: RealEstate["id"];
    };

const props = defineProps<Props>();

const featuresStore = useFeaturesStore();
const appConstantsStore = useAppConstantsStore();
const customersStore = useCustomersStore();
const realEstateStore = useRealEstateStore();

const emits = defineEmits(["update:modelValue"]);

const marketOptions = appConstantsStore.market;
const { documents: features } = featuresStore.getAllDocuments();
const { documents: customers } = customersStore.getAllDocuments();

const customersOptions = computed(() =>
  customers.value?.map((el) => {
    return {
      id: el.id,
      name: el.name,
    };
  })
);

const error = ref("");
const message = ref("");

const previewAvailable = ref<CreateRealEstate["availableList"][0]>({
  id: "",
  totalFloor: null,
  category: "",
  bedroomsFrom: null,
  bedroomsTo: null,
  bathrooms: null,
  squareFrom: null,
  squareTo: null,
  availableUnitsForSale: null,
});

const inputs = computed({
  get: () => props.payloadInputs,
  set: (newValue: Props["payloadInputs"]) => {
    emits("update:modelValue", newValue);
  },
});

const categoriesOptions = computed(() => {
  if (
    inputs.value.classification === "Residential" &&
    inputs.value.typeOfProperty === "House"
  ) {
    return appConstantsStore.residencialHouseCategory;
  }

  if (
    inputs.value.classification === "Residential" &&
    inputs.value.typeOfProperty === "Flat"
  ) {
    return appConstantsStore.residencialFlatCategory;
  }
  if (
    inputs.value.classification === "Residential" &&
    inputs.value.typeOfProperty === "Plot"
  ) {
    return appConstantsStore.residencialPlotCategory;
  }

  if (
    inputs.value.classification === "Commercial" &&
    inputs.value.typeOfProperty === "Industrial"
  ) {
    return appConstantsStore.commercialIndustrialCategory;
  }
  if (
    inputs.value.classification === "Commercial" &&
    inputs.value.typeOfProperty === "Office"
  ) {
    return appConstantsStore.commercialOfficeCategory;
  }
  if (
    inputs.value.classification === "Commercial" &&
    inputs.value.typeOfProperty === "Building"
  ) {
    return appConstantsStore.commercialBuildingCategory;
  }
  if (
    inputs.value.classification === "Commercial" &&
    inputs.value.typeOfProperty === "Plot"
  ) {
    return appConstantsStore.commercialPlotCategory;
  }
  if (
    inputs.value.classification === "Commercial" &&
    inputs.value.typeOfProperty === "Retail"
  ) {
    return appConstantsStore.commercialRetailCategory;
  }

  if (
    inputs.value.classification === "Agricultural" &&
    inputs.value.typeOfProperty === "House"
  ) {
    return appConstantsStore.agriculturalHouseCategory;
  }
  if (
    inputs.value.classification === "Agricultural" &&
    inputs.value.typeOfProperty === "Plot"
  ) {
    return appConstantsStore.agriculturalPlotCategory;
  }

  if (
    inputs.value.classification === "Parking" &&
    inputs.value.typeOfProperty === "Parking"
  ) {
    return appConstantsStore.parkingParkingCategory;
  }
  return "";
});

const validation = () => {
  if (inputs.value.pictures?.length === 0) {
    error.value = "There must be a pictures!";
    return false;
  }

  if (inputs.value.documentation?.length === 0) {
    error.value = "There must be a documentation!";
    return false;
  }

  if (inputs.value.category?.length === 0) {
    error.value = "There must be a Category!";
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
    const i: CreateRealEstate = inputs.value as CreateRealEstate;
    i.createdAt = new Date().toDateString();
    i.updatedAt = new Date().toDateString();
    response = await realEstateStore.createDocument(i);
  }

  // if (props.type === "Update") {
  //   inputs.value.updatedAt = new Date().toDateString();
  //   response = await customersStore.updateCustomer(
  //     inputs.value,
  //     props.customerId,
  //   );
  // }

  if (response.status === 0) {
    error.value = "The action is unsuccessful!";
  }
  if (response.status === 1) {
    message.value = "The action is successful!";
  }
};

const resetPreviewAvailable = () => {
  for (const key of Object.keys(previewAvailable.value)) {
    (previewAvailable.value as Record<string, "">)[key] = null;
  }
};

const actionAvailable = async () => {
  if (previewAvailable.value.id) {
    inputs.value.availableList =
      inputs.value.availableList.map((el) => {
        if (el.id === previewAvailable.value.id) {
          return {
            ...previewAvailable.value,
          };
        }
      }) || [];
  } else {
    inputs.value.availableList.push({
      ...previewAvailable.value,
      id: generateUniqueId(),
    });
  }
  resetPreviewAvailable();
};

const removeAvailable = (id: string) => {
  inputs.value.availableList = inputs.value.availableList.filter(
    (el) => el.id !== id
  );
};

const changePreviewAvailable = (id: string) => {
  const currentExperience = inputs.value.availableList.find(
    (el) => el.id === id
  );
  if (currentExperience) {
    previewAvailable.value = { ...currentExperience };
  }
};

const addFeature = () => {
  inputs.value.features?.push({
    id: "",
    properties: [],
  });
};
const removeFeature = (index: number) => {
  inputs.value.features = inputs.value.features?.filter(
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
          {{ type }} Real Estate
        </li>
      </ol>
      <h1 class="page-header mb-0">{{ type }} Real Estate</h1>
    </div>
  </div>

  <div class="row gx-4">
    <form action="#" id="form-main-user" @submit.prevent="actionPage">
      <div class="">
        <card class="mb-4">
          <card-header
            class="d-flex align-items-center bg-inverse bg-opacity-10 fw-400"
          >
            Location
          </card-header>
          <card-body>
            <div class="row">
              <div>
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label class="form-label"
                      >Address <span class="text-danger">*</span></label
                    >
                    <input
                      v-model="inputs.address"
                      type="text"
                      class="form-control"
                      required
                      placeholder="Address"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label"
                      >Location lat <span class="text-danger">*</span></label
                    >
                    <input
                      v-model="inputs.locationLat"
                      type="text"
                      class="form-control"
                      required
                      placeholder="Location lat"
                    />
                  </div>

                  <div class="mb-3 col-md-6">
                    <label class="form-label"
                      >Location ing <span class="text-danger">*</span></label
                    >
                    <input
                      v-model="inputs.locationIng"
                      type="text"
                      class="form-control"
                      required
                      placeholder="Location ing"
                    />
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
            Confirm the Address
          </card-header>
          <card-body>
            <div class="row">
              <div>
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label class="form-label"
                      >Street <span class="text-danger">*</span></label
                    >
                    <input
                      v-model="inputs.street"
                      type="text"
                      class="form-control"
                      required
                      placeholder="Street"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label"
                      >Number <span class="text-danger">*</span></label
                    >
                    <input
                      v-model="inputs.number"
                      type="text"
                      class="form-control"
                      required
                      placeholder="Number"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label"
                      >Floor <span class="text-danger">*</span></label
                    >
                    <input
                      v-model="inputs.floor"
                      type="number"
                      class="form-control"
                      required
                      placeholder="Floor"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label"
                      >Door <span class="text-danger">*</span></label
                    >
                    <input
                      v-model="inputs.door"
                      type="text"
                      class="form-control"
                      required
                      placeholder="Door"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label"
                      >Zip Code <span class="text-danger">*</span></label
                    >
                    <input
                      v-model="inputs.zipCode"
                      type="text"
                      class="form-control"
                      required
                      placeholder="Zip Code"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label"
                      >City <span class="text-danger">*</span></label
                    >
                    <input
                      v-model="inputs.city"
                      type="text"
                      class="form-control"
                      required
                      placeholder="City"
                    />
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
            General information
          </card-header>
          <card-body>
            <div class="row">
              <div>
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label class="form-label"
                      >Reference <span class="text-danger">*</span></label
                    >
                    <input
                      v-model="inputs.reference"
                      type="text"
                      class="form-control"
                      required
                      placeholder="Reference"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label"
                      >Market <span class="text-danger">*</span></label
                    >
                    <vue-select
                      v-model="inputs.market"
                      :options="marketOptions"
                      placeholder="Select an option"
                    >
                      <template #search-template="{ attributes, events }">
                        <input
                          class="vs__search form-control"
                          :required="!inputs.market"
                          v-bind="attributes"
                          v-on="events"
                        />
                      </template>
                    </vue-select>
                  </div>

                  <div class="mb-3 col-md-6">
                    <label class="form-label"
                      >Clasification <span class="text-danger">*</span></label
                    >
                    <vue-select
                      v-model="inputs.classification"
                      :options="appConstantsStore.classification"
                      placeholder="Select an option"
                    >
                      <template #search-template="{ attributes, events }">
                        <input
                          class="vs__search form-control"
                          :required="!inputs.classification"
                          v-bind="attributes"
                          v-on="events"
                        />
                      </template>
                    </vue-select>
                  </div>

                  <div class="mb-3 col-md-6" v-if="inputs.classification">
                    <label class="form-label"
                      >Type of property
                      <span class="text-danger">*</span></label
                    >
                    <vue-select
                      v-if="inputs.classification === 'Agricultural'"
                      v-model="inputs.typeOfProperty"
                      :options="appConstantsStore.agriculturalType"
                      placeholder="Select an option"
                    >
                      <template #search-template="{ attributes, events }">
                        <input
                          class="vs__search form-control"
                          :required="!inputs.typeOfProperty"
                          v-bind="attributes"
                          v-on="events"
                        />
                      </template>
                    </vue-select>

                    <vue-select
                      v-if="inputs.classification === 'Commercial'"
                      v-model="inputs.typeOfProperty"
                      :options="appConstantsStore.comercialType"
                      placeholder="Select an option"
                    >
                      <template #search-template="{ attributes, events }">
                        <input
                          class="vs__search form-control"
                          :required="!inputs.typeOfProperty"
                          v-bind="attributes"
                          v-on="events"
                        />
                      </template>
                    </vue-select>

                    <vue-select
                      v-if="inputs.classification === 'Parking'"
                      v-model="inputs.typeOfProperty"
                      :options="appConstantsStore.parkingType"
                      placeholder="Select an option"
                    >
                      <template #search-template="{ attributes, events }">
                        <input
                          class="vs__search form-control"
                          :required="!inputs.typeOfProperty"
                          v-bind="attributes"
                          v-on="events"
                        />
                      </template>
                    </vue-select>

                    <vue-select
                      v-if="inputs.classification === 'Residential'"
                      v-model="inputs.typeOfProperty"
                      :options="appConstantsStore.residencialType"
                      placeholder="Select an option"
                    >
                      <template #search-template="{ attributes, events }">
                        <input
                          class="vs__search form-control"
                          :required="!inputs.typeOfProperty"
                          v-bind="attributes"
                          v-on="events"
                        />
                      </template>
                    </vue-select>
                  </div>

                  <div class="mb-3 col-md-6" v-if="inputs.typeOfProperty">
                    <label class="form-label"
                      >Category <span class="text-danger">*</span></label
                    >
                    <vue-select
                      v-model="inputs.category"
                      :options="categoriesOptions"
                      placeholder="Select an option"
                      multiple
                    >
                      <template #search-template="{ attributes, events }">
                        <input
                          class="vs__search form-control"
                          :required="!inputs.category"
                          v-bind="attributes"
                          v-on="events"
                        />
                      </template>
                    </vue-select>
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
            Building details
          </card-header>
          <card-body>
            <div class="row">
              <div>
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label class="form-label">Year of construction </label>
                    <input
                      v-model="inputs.yearOfConstruction"
                      type="number"
                      class="form-control"
                      placeholder="Year of construction"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label">Total floor</label>
                    <input
                      v-model="inputs.totalFloor"
                      type="number"
                      class="form-control"
                      placeholder="Total floor"
                    />
                  </div>

                  <div class="mb-3 col-md-6">
                    <label class="form-label">Residential complex </label>
                    <input
                      v-model="inputs.residentialComplex"
                      type="text"
                      class="form-control"
                      placeholder="Residential complex"
                    />
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
            Land and supply details
          </card-header>
          <card-body>
            <div class="row">
              <div>
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label class="form-label">Size plot </label>
                    <input
                      v-model="inputs.sizePlot"
                      type="number"
                      class="form-control"
                      placeholder="Size plot"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label">Purpose land </label>
                    <vue-select
                      v-model="inputs.purposeLand"
                      :options="appConstantsStore.purposeLand"
                      placeholder="Select an option"
                    >
                    </vue-select>
                  </div>

                  <div class="mb-3 col-md-6">
                    <label class="form-label">Energy </label>
                    <vue-select
                      v-model="inputs.energy"
                      :options="appConstantsStore.statusFirst"
                      placeholder="Select an option"
                    >
                    </vue-select>
                  </div>

                  <div class="mb-3 col-md-6">
                    <label class="form-label">Water </label>
                    <vue-select
                      v-model="inputs.water"
                      :options="appConstantsStore.statusSecond"
                      placeholder="Select an option"
                    >
                    </vue-select>
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label">Gas </label>
                    <vue-select
                      v-model="inputs.gas"
                      :options="appConstantsStore.statusThird"
                      placeholder="Select an option"
                    >
                    </vue-select>
                  </div>

                  <div class="mb-3 col-md-6">
                    <label class="form-label">Mobile coverage </label>
                    <vue-select
                      v-model="inputs.mobileCoverage"
                      :options="appConstantsStore.coverageOptions"
                      placeholder="Select an option"
                    >
                    </vue-select>
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
            Promotion details of new building
          </card-header>
          <card-body>
            <div class="row">
              <div>
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label class="form-label"
                      >Discount or special promotion
                      <span class="text-danger">*</span>
                    </label>
                    <input
                      v-model="inputs.discountOrSpecialPromotion"
                      type="text"
                      required
                      class="form-control"
                      placeholder="Discount or special promotion"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label"
                      >Buildings <span class="text-danger">*</span>
                    </label>
                    <input
                      required
                      v-model="inputs.buildings"
                      type="number"
                      class="form-control"
                      placeholder="Buildings"
                    />
                  </div>

                  <div class="mb-3 col-md-6">
                    <label class="form-label"
                      >Apartaments <span class="text-danger">*</span>
                    </label>
                    <input
                      required
                      v-model="inputs.apartments"
                      type="number"
                      class="form-control"
                      placeholder="Apartaments"
                    />
                  </div>

                  <div class="mb-3 col-md-6">
                    <label class="form-label"
                      >Nº Parkings <span class="text-danger">*</span>
                    </label>
                    <input
                      required
                      v-model="inputs.numberParkings"
                      type="number"
                      class="form-control"
                      placeholder="Nº Parkings"
                    />
                  </div>

                  <div class="mb-3 col-md-6">
                    <label class="form-label"
                      >Nº blocks <span class="text-danger">*</span>
                    </label>
                    <input
                      required
                      v-model="inputs.numberBlocks"
                      type="number"
                      class="form-control"
                      placeholder="Nº blocks"
                    />
                  </div>

                  <div class="mb-3 col-md-6">
                    <label class="form-label"
                      >Delivery data <span class="text-danger">*</span>
                    </label>
                    <datepicker
                      v-model="inputs.deliveryDate"
                      :enable-time-picker="false"
                      required
                    />
                  </div>

                  <div class="mb-3 col-md-6">
                    <label class="form-label"
                      >Stage <span class="text-danger">*</span>
                    </label>
                    <vue-select
                      v-model="inputs.stage"
                      :options="appConstantsStore.stage"
                      placeholder="Select an option"
                    >
                      <template #search-template="{ attributes, events }">
                        <input
                          class="vs__search form-control"
                          :required="!inputs.stage"
                          v-bind="attributes"
                          v-on="events"
                        />
                      </template>
                    </vue-select>
                  </div>

                  <div class="mb-3 col-md-6">
                    <label class="form-label"
                      >Sale status <span class="text-danger">*</span>
                    </label>
                    <vue-select
                      v-model="inputs.saleStatus"
                      :options="appConstantsStore.saleStatus"
                      placeholder="Select an option"
                    >
                      <template #search-template="{ attributes, events }">
                        <input
                          class="vs__search form-control"
                          :required="!inputs.saleStatus"
                          v-bind="attributes"
                          v-on="events"
                        />
                      </template>
                    </vue-select>
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
            Price
          </card-header>
          <card-body>
            <div class="row">
              <div>
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label class="form-label"
                      >Price from <span class="text-danger">*</span></label
                    >
                    <input
                      v-model="inputs.priceFrom"
                      type="number"
                      class="form-control"
                      required
                      placeholder="Price from"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label"
                      >Price to <span class="text-danger">*</span></label
                    >
                    <input
                      v-model="inputs.priceTo"
                      type="number"
                      class="form-control"
                      required
                      placeholder="Price to"
                    />
                  </div>

                  <div class="mb-3 col-md-6">
                    <label class="form-label">Rental price </label>
                    <input
                      v-model="inputs.rentalPrice"
                      type="number"
                      class="form-control"
                      placeholder="Rental price"
                    />
                  </div>

                  <div class="mb-3 col-md-6">
                    <label class="form-label">Price condition </label>
                    <input
                      v-model="inputs.priceCondition"
                      type="number"
                      class="form-control"
                      placeholder="Price condition"
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
                <div>Available list</div>
              </div>
            </card-header>
            <card-body>
              <div class="row">
                <div class="col-lg-8 overflow-auto">
                  <table class="table table-hover text-nowrap">
                    <thead>
                      <tr>
                        <th class="pt-0 pb-2">Total floor</th>
                        <th class="pt-0 pb-2">Category</th>
                        <th class="pt-0 pb-2">Bedrooms</th>
                        <th class="pt-0 pb-2">Bathrooms</th>
                        <th class="pt-0 pb-2">Square</th>
                        <th class="pt-0 pb-2">Square</th>
                        <th class="pt-0 pb-2">Available units for sale</th>
                        <th class="pt-0 pb-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="available in inputs.availableList"
                        :key="available.id"
                      >
                        <td class="align-middle">
                          {{ available?.totalFloor }}
                        </td>
                        <td class="align-middle">{{ available?.category }}</td>
                        <td class="align-middle">
                          {{ available?.bedroomsFrom }} -
                          {{ available?.bedroomsTo }}
                        </td>
                        <td class="align-middle">{{ available?.bathrooms }}</td>
                        <td class="align-middle">
                          {{ available?.squareFrom }} -
                          {{ available?.squareTo }}
                        </td>
                        <td class="align-middle">
                          {{ available?.availableUnitsForSale }}
                        </td>

                        <td class="align-middle">
                          <div class="d-flex align-items-center gap-1">
                            <button
                              type="button"
                              @click="changePreviewAvailable(available.id)"
                              class="btn btn-light"
                            >
                              <i class="fas fa-edit"></i>
                            </button>
                            <button
                              type="button"
                              @click="removeAvailable(available.id)"
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
                    @submit.prevent="actionAvailable"
                  >
                    <div class="mb-3">
                      <label class="form-label">Total floor</label>
                      <input
                        v-model="previewAvailable.totalFloor"
                        type="number"
                        class="form-control"
                      />
                    </div>

                    <div class="mb-3">
                      <label class="form-label"
                        >Category <span class="text-danger">*</span></label
                      >
                      <input
                        v-model="previewAvailable.category"
                        required
                        type="text"
                        class="form-control"
                      />
                    </div>

                    <div class="mb-3">
                      <label class="form-label"
                        >Bedrooms from <span class="text-danger">*</span></label
                      >
                      <input
                        v-model="previewAvailable.bedroomsFrom"
                        required
                        type="number"
                        class="form-control"
                      />
                    </div>
                    <div class="mb-3">
                      <label class="form-label"
                        >Bedrooms to <span class="text-danger">*</span></label
                      >
                      <input
                        v-model="previewAvailable.bedroomsTo"
                        required
                        type="number"
                        class="form-control"
                      />
                    </div>

                    <div class="mb-3">
                      <label class="form-label"
                        >Bathrooms

                        <span class="text-danger">*</span></label
                      >
                      <input
                        v-model="previewAvailable.bathrooms"
                        required
                        type="number"
                        class="form-control"
                      />
                    </div>

                    <div class="mb-3">
                      <label class="form-label"
                        >Square from

                        <span class="text-danger">*</span></label
                      >
                      <input
                        v-model="previewAvailable.squareFrom"
                        required
                        type="number"
                        class="form-control"
                      />
                    </div>

                    <div class="mb-3">
                      <label class="form-label"
                        >Square to

                        <span class="text-danger">*</span></label
                      >
                      <input
                        v-model="previewAvailable.squareTo"
                        required
                        type="number"
                        class="form-control"
                      />
                    </div>

                    <div class="mb-3">
                      <label class="form-label"
                        >Available units for sale

                        <span class="text-danger">*</span></label
                      >
                      <input
                        v-model="previewAvailable.availableUnitsForSale"
                        required
                        type="number"
                        class="form-control"
                      />
                    </div>

                    <div class="d-flex justify-content-end">
                      <button
                        class="btn btn-theme fileinput-button me-2 mb-1"
                        type="submit"
                        form="form-add-expirience"
                      >
                        <i
                          v-if="!previewAvailable.id"
                          class="fa fa-fw fa-plus"
                        ></i>
                        <i
                          v-if="previewAvailable.id"
                          class="fa fa-fw fa-edit"
                        ></i>
                        <span v-if="!previewAvailable.id">Add Experience</span>
                        <span v-if="previewAvailable.id"
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
            Developer details
          </card-header>
          <card-body>
            <div class="row">
              <div>
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label class="form-label"
                      >Company developer
                      <span class="text-danger">*</span></label
                    >
                    <input
                      v-model="inputs.developerDetails.companyDeveloper"
                      type="text"
                      class="form-control"
                      required
                      placeholder="Company developer"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label"
                      >Contact person

                      <span class="text-danger">*</span></label
                    >
                    <input
                      v-model="inputs.developerDetails.contactPerson"
                      type="text"
                      class="form-control"
                      required
                      placeholder="Contact person"
                    />
                  </div>

                  <div class="mb-3 col-md-6">
                    <label class="form-label"
                      >Phone

                      <span class="text-danger">*</span></label
                    >
                    <input
                      v-model="inputs.developerDetails.phone"
                      type="text"
                      class="form-control"
                      required
                      placeholder="Phone"
                    />
                  </div>

                  <div class="mb-3 col-md-6">
                    <label class="form-label"
                      >Adress company

                      <span class="text-danger">*</span></label
                    >
                    <input
                      v-model="inputs.developerDetails.addressCompany"
                      type="text"
                      class="form-control"
                      required
                      placeholder="Adress company"
                    />
                  </div>

                  <div class="mb-3 col-md-6">
                    <label class="form-label"
                      >Owner

                      <span class="text-danger">*</span></label
                    >
                    <input
                      v-model="inputs.developerDetails.owner"
                      type="text"
                      class="form-control"
                      required
                      placeholder="Owner"
                    />
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
            Features
          </card-header>
          <card-body>
            <div class="row">
              <div>
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label class="form-label">Sold </label>
                    <vue-select
                      v-model="inputs.sold"
                      :options="appConstantsStore.sold"
                      placeholder="Select an option"
                    ></vue-select>
                  </div>
                  <div
                    class="d-flex align-items-center justify-content-between"
                  >
                    <p><strong>Popular features </strong></p>
                    <button
                      @click="addFeature"
                      type="button"
                      class="btn btn-theme fileinput-button me-2 mb-1"
                    >
                      <i class="fa fa-fw fa-plus"></i>
                      <span>Add feature...</span>
                    </button>
                  </div>
                  <div
                    v-for="(item, index) in inputs.features"
                    :key="index"
                    class="row mb-3 gx-3"
                  >
                    <div class="col">
                      <select v-model="item.id" class="form-select">
                        <option selected value="">Select a category</option>
                        <option
                          v-for="feature in features"
                          :key="feature.id"
                          :value="feature.id"
                        >
                          {{ feature.title }}
                        </option>
                      </select>
                    </div>
                    <div class="col">
                      <vue-select
                        v-model="item.properties"
                        :options="
                          features.find((el) => el.id === item.id)?.properties
                        "
                        placeholder="Select an options"
                        multiple
                      ></vue-select>
                    </div>
                    <div class="col-1">
                      <button
                        @click="removeFeature(index)"
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
            class="d-flex align-items-center bg-inverse bg-opacity-10 fw-400"
          >
            Сomision and taxes
          </card-header>
          <card-body>
            <div class="row">
              <div>
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label class="form-label"
                      >Partner <span class="text-danger">*</span></label
                    >
                    <input
                      v-model="inputs.partnerCommission"
                      type="number"
                      class="form-control"
                      required
                      placeholder="Partner"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label">Type comision </label>
                    <input
                      v-model="inputs.typeCommission"
                      type="text"
                      class="form-control"
                      placeholder="Type comision"
                    />
                  </div>

                  <div class="mb-3 col-md-6">
                    <label class="form-label">HOA fees</label>
                    <input
                      v-model="inputs.hoaFees"
                      type="number"
                      class="form-control"
                      placeholder="HOA fees"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label">Tax amount </label>
                    <input
                      v-model="inputs.taxAmount"
                      type="number"
                      class="form-control"
                      placeholder="Tax amount"
                    />
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
            Listing condition and buyer incentive
          </card-header>
          <card-body>
            <div class="row">
              <div>
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label class="form-label">Listing agremedemt </label>
                    <input
                      v-model="inputs.listingAgreement"
                      type="text"
                      class="form-control"
                      placeholder="Listing agremedemt"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label"> Showing requirements</label>
                    <input
                      v-model="inputs.showingRequirements"
                      type="text"
                      class="form-control"
                      placeholder=" Showing requirements"
                    />
                  </div>

                  <div class="mb-3 col-md-6">
                    <label class="form-label"> Listing terms</label>
                    <input
                      v-model="inputs.listingTerms"
                      type="text"
                      class="form-control"
                      placeholder="Listing terms"
                    />
                  </div>
                  <div class="mb-3 col-md-6">
                    <label class="form-label"> Buyer incentive</label>
                    <input
                      v-model="inputs.buyerIncentive"
                      type="text"
                      class="form-control"
                      placeholder="Buyer incentive"
                    />
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
            Multimedia
          </card-header>
          <card-body>
            <div class="row">
              <div>
                <div class="">
                  <div class="row">
                    <label class="form-label">About user </label>
                    <div class="form-control mb-3 p-0">
                      <div class="border-0">
                        <quill-editor
                          v-model:content="inputs.description"
                          contentType="html"
                          theme="snow"
                          class="h-250px"
                        />
                      </div>
                    </div>

                    <div class="mb-3 col-md-6">
                      <label class="form-label"> Video</label>
                      <input
                        v-model="inputs.video"
                        type="text"
                        class="form-control"
                        placeholder="Video"
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label class="form-label"> Virtual tour </label>
                      <input
                        v-model="inputs.virtualTour"
                        type="text"
                        class="form-control"
                        placeholder="Virtual tour"
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label class="form-label">
                        Energy rating consumption
                        <span class="text-danger">*</span>
                      </label>
                      <input
                        v-model="inputs.energyRatingConsumption"
                        type="text"
                        required
                        class="form-control"
                        placeholder="Energy rating consumption"
                      />
                    </div>
                    <div class="mb-3 col-md-6">
                      <label class="form-label">
                        Energy rating emissions
                      </label>
                      <input
                        v-model="inputs.energyRatingEmissions"
                        type="text"
                        class="form-control"
                        placeholder="Energy rating consumption"
                      />
                    </div>

                    <div class="mb-3 col-md-6">
                      <label class="form-label">
                        Author/Company
                        <span class="text-danger">*</span>
                      </label>
                      <input
                        v-model="inputs.authorCompany"
                        type="text"
                        required
                        class="form-control"
                        placeholder="Author/Company"
                      />
                    </div>

                    <div class="col-md-6 mb-3">
                      <label class="form-label"
                        >User <span class="text-danger">*</span>
                      </label>
                      <vue-select
                        v-model="inputs.userId"
                        :options="customersOptions"
                        :label="'name'"
                        :reduce="(option: Customer) => option.id"
                        placeholder="Select an option"
                      >
                        <template #search-template="{ attributes, events }">
                          <input
                            class="vs__search form-control"
                            :required="!inputs.userId"
                            v-bind="attributes"
                            v-on="events"
                          />
                        </template>
                      </vue-select>
                    </div>

                    <div class="mb-3 col-md-6">
                      <label class="form-label"
                        >Date <span class="text-danger">*</span>
                      </label>
                      <datepicker
                        v-model="inputs.date"
                        :enable-time-picker="false"
                        required
                      />
                    </div>

                    <div class="col-md-6 mb-3">
                      <label class="form-label"
                        >Status <span class="text-danger">*</span>
                      </label>
                      <vue-select
                        v-model="inputs.status"
                        :options="appConstantsStore.statusListing"
                        placeholder="Select an option"
                      >
                        <template #search-template="{ attributes, events }">
                          <input
                            class="vs__search form-control"
                            :required="!inputs.status"
                            v-bind="attributes"
                            v-on="events"
                          />
                        </template>
                      </vue-select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </card-body>
        </card>
        <InputFiles
          showPreview
          title="Pictures"
          v-model="inputs.pictures"
        ></InputFiles>
        <InputFiles
          title="Documentation"
          v-model="inputs.documentation"
        ></InputFiles>
      </div>
      <div v-if="error" class="alert alert-danger">{{ error }}</div>
      <div v-if="message" class="alert alert-success">{{ message }}</div>
      <button type="submit" form="form-main-user" class="btn btn-theme">
        {{ type }} real Estate
      </button>
    </form>
  </div>
</template>
