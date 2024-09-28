<script setup lang="ts">
import RealEstateDetails from "@/components/layouts/RealEstateDetails.vue";
import { ref, watch } from "vue";

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
  createdAt: "",
  updatedAt: "",
  quantityBathrooms: null,
    quantityBedrooms: null,
});

watch(
  inputs,
  () => {
    console.log(inputs.value);
  },
  { deep: true }
);
</script>

<template>
  <div>
    <RealEstateDetails
      :payloadInputs="inputs"
      :type="'Create'"
    ></RealEstateDetails>
  </div>
</template>

<style scoped></style>
