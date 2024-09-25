<script setup lang="ts">
import CustomerDetails from "@/components/layouts/CustomerDetails.vue";
import { ref, watch } from "vue";

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
  createdAt: "",
  updatedAt: "",
});
</script>

<template>
  <div>
    <CustomerDetails :payloadInputs="inputs" :type="'Create'"></CustomerDetails>
  </div>
</template>

<style scoped></style>
