import { defineStore } from "pinia";

export const useAppConstantsStore = defineStore("constants", () => {
  const visibilityOptions: VisibilityOptions[] = [
    "All users",
    "All partners",
    "Only me",
    "Custom choose",
  ];

  const typeAccountOptions: Customer["typeAccount"][] = [
    "Business account",
    "Personal account",
  ];

  const roleOptions: Customer["role"][] = [
    "Owner",
    "Manager",
    "Agent",
    "Lead",
    "Buyer",
    "Seller",
    "Coordinator",
    "Integrator",
    "Marketing",
    "Receptionist",
    "Team leader",
  ];

  const employmentTypeOptions: EmploymentTypeOptions[] = [
    "Full time",
    "Part time",
    "Self-employed",
    "Freelancer",
    "Intership",
  ];

  const displayBlockCatalogueOptions: Customer["displayBlockCatalogue"][] = [
    "Countries",
    "Type",
    "Class",
    "Market",
  ];

  const billingMethodOptions: Customer["billingMethod"][] = [
    "E-Invoice",
    "Paper invoice",
  ];

  const billingForOptions: Customer["billingFor"][] = [
    "Membership",
    "Subscription",
    "Per listing",
    "Per lead",
  ];

  const methodOfPaymentOptions: Customer["methodOfPayment"][] = [
    "Bank account",
    "Card",
  ];

  const cyclePaymentOptions: Customer["cyclePayment"][] = [
    "At the begging",
    "At the end",
  ];

  return {
    visibilityOptions,
    typeAccountOptions,
    roleOptions,
    employmentTypeOptions,
    displayBlockCatalogueOptions,
    billingMethodOptions,
    billingForOptions,
    methodOfPaymentOptions,
    cyclePaymentOptions
  };
});
