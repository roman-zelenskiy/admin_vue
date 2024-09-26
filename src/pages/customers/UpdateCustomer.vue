<script setup lang="ts">
import { ref } from "vue";
import CustomerDetails from "@/components/layouts/CustomerDetails.vue";
import { useRoute } from "vue-router";
import { useCustomersStore } from "@/stores/customers";

const customersStore = useCustomersStore();
const route = useRoute();
const customerId = `${route.params.id}`;

const inputs = ref<CreateCustomer>({
  name: "",
  surname: "",
  aboutUser: "",
  categoryId: "",
  ref: "",
  typeAccount: "Personal account",
  country: "",
  state: "",
  city: "",
  address: "",
  language: "",
  partners: 0,
  listings: 0,
  photo: null,
  phone: [],
  email: [],
  websiteSocial: [],
  experience: [],
  notificationDisplayProfile: false,
  notificationDisplayRealEstate: false,
  whoCanSendMePrivateMessage: false,
  notificationReceiveRequest: false,
  notificationBookingAViewing: false,
  notificationMakeAnOffer: false,
  receiveNotificationOfSharingLeadsFromOtherPartners: false,
  receiveNotificationOfNewAddedRealEstateByOtherPartners: false,
  notificationShowViewingData: false,
  verified: false,
  displayBlockCatalogue: "Countries",
  displayComisionForPartners: "All users",
  displayMyPartnersFor: "All users",
  activateCommentsInMyPostsFor: "All users",
  receiveInvitationToGroupBy: "All users",
  receiveInvitationToEventsBy: "All users",
  notificationPaymentByStatusInvoice: "Failed",
  alertUnreadedContacts: 0,
  alertDeclinedBookingAViewing: 0,
  notificationShowActivityOnTheMarketByTypeInDifferentCities: "",
  notificationShowPriceAnalysisByTypeInDifferentCities: "",
  notificationSubscriptionExpireDays: 0,
  billingMethod: "",
  billingFor: null,
  billingCountry: "",
  billingState: "",
  billingAddress: "",
  postalCode: "",
  methodOfPayment: "",
  cyclePayment: "",
  subscriptions: null,
  company: "",
  yearCompanyFoundation: null,
  skills: [],
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
  const { status, document } = await customersStore.getCustomerById(customerId);

  if (status === 1) {
    saveDataCustomer(document as CreateCustomer);
  }
};
getCustomer();
</script>

<template>
  <div>
    <CustomerDetails
      :payloadInputs="inputs"
      :customerId="customerId"
      :type="'Update'"
    ></CustomerDetails>
  </div>
</template>

<style scoped></style>
