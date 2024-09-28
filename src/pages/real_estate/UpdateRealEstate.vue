<script setup lang="ts">
import { ref } from "vue";
import RealEstateDetails from "@/components/layouts/RealEstateDetails.vue";
import { useRoute } from "vue-router";
import { useRealEstateStore } from "@/stores/realEstate.ts";

const realEstateStore = useRealEstateStore();
const route = useRoute();
const id = `${route.params.id}`;

const inputs = ref<CreateRealEstate>({
  address: "",
  locationLat: "",
  locationIng: "",
  street: "",
  number: "",
  floor: "",
  door: "",
  zipCode: "",
  city: "",
  reference: "",
  market: null,
  classification: null,
  typeOfProperty: null,
  category: [],
  yearOfConstruction: null,
  totalFloor: null,
  residentialComplex: "",
  sizePlot: null,
  purposeLand: [],
  energy: [],
  water: [],
  gas: [],
  mobileCoverage: null,
  discountOrSpecialPromotion: "",
  buildings: null,
  apartments: null,
  numberParkings: null,
  numberBlocks: null,
  deliveryDate: "",
  stage: null,
  saleStatus: null,
  priceFrom: null,
  priceTo: null,
  rentalPrice: null,
  priceCondition: [],
  availableList: [],
  developerDetails: {
    companyDeveloper: "",
    contactPerson: "",
    phone: "",
    addressCompany: "",
    owner: "",
  },
  sold: null,
  featuresIds: [],
  features: [],
  partnerCommission: null,
  typeCommission: [],
  hoaFees: null,
  taxAmount: null,
  listingAgreement: [],
  showingRequirements: [],
  listingTerms: [],
  buyerIncentive: [],
  description: "",
  video: "",
  virtualTour: "",
  pictures: [],
  documentation: [],
  energyRatingConsumption: "",
  energyRatingEmissions: "",
  authorCompany: "",
  userId: "",
  date: "",
  status: "",
  quantityBathrooms: null,
  quantityBedrooms: null,
  createdAt: "",
  updatedAt: "",
});

const saveDataCustomer = (customer: CreateCustomer) => {
  for (const key of Object.keys(inputs.value) as Array<keyof CreateCustomer>) {
    if (customer[key]) {
      inputs.value[key] = customer[key];
    }
  }
};

const getCustomer = async () => {
  const { status, document } = await realEstateStore.getDocumentById(id);

  if (status === 1) {
    saveDataCustomer(document as CreateCustomer);
  }
};
getCustomer();
</script>

<template>
  <div>
    <RealEstateDetails
      :payloadInputs="inputs"
      :realEstateId="id"
      :type="'Update'"
    ></RealEstateDetails>
  </div>
</template>

<style scoped></style>
