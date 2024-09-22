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

  const market: RealEstate["market"][] = ["New building", "Resale", "Lands"];

  const classification: RealEstate["classification"][] = [
    "Residencial",
    "Comercial",
    "Agricultural",
    "Parking",
  ];

  const residencialType: RealEstate["typeOfProperty"][] = [
    "House",
    "Flat",
    "Plot",
  ];

  const comercialType: RealEstate["typeOfProperty"][] = [
    "Retail",
    "Industrial",
    "Office",
    "Building",
    "Plot",
  ];

  const agriculturalType: RealEstate["typeOfProperty"][] = ["House", "Plot"];

  const parkingType: RealEstate["typeOfProperty"][] = ["Parking"];

  const residencialHouseCategory: RealEstate["category"] = [
    "Single-family",
    "Multi-family",
    "Detached",
    "Semi-detached",
    "Terraced",
    "Bungalow",
    "Townhouse",
    "Villa",
    "Cottage",
    "Mansion",
    "Duplex",
    "Chalet",
    "Manufactured",
    "Floating home",
    "Quad-house",
  ];

  const residencialFlatCategory: RealEstate["category"] = [
    "Loft",
    "Ground floor",
    "Condominium",
    "Low-Rise",
    "High-Rise",
    "Penthouse",
    "Studio",
    "Skyscrapers",
    "Large apartment",
    "Apartments",
    "Duplex",
    "Top floor",
  ];

  const residencialPlotCategory: RealEstate["category"] = ["Land", "Island"];

  const commercialRetailCategory: RealEstate["category"] = [
    "Restaurant",
    "Supermarket",
    "Bar",
    "Commercial unit",
    "Fuel station",
  ];

  const commercialIndustrialCategory: RealEstate["category"] = ["Warehouse"];

  const commercialOfficeCategory: RealEstate["category"] = [
    "Office",
    "Business-Center",
  ];

  const commercialBuildingCategory: RealEstate["category"] = [
    "Hotel",
    "Building-apartment",
    "Shopping center",
  ];

  const commercialPlotCategory: RealEstate["category"] = ["Land"];

  const agriculturalHouseCategory: RealEstate["category"] = [
    "Countryhouse",
    "Farmhouse",
    "Rancho",
  ];

  const agriculturalPlotCategory: RealEstate["category"] = ["Rural land"];

  const parkingParkingCategory: RealEstate["category"] = [
    "Garage",
    "Storage",
    "Parking space",
  ];

  const purposeLand: RealEstate["purposeLand"] = [
    "Urban",
    "Development",
    "Undeveloped",
  ];

  const statusFirst: Array<"Connected" | "Disconted" | "Yes"> = [
    "Connected",
    "Disconted",
    "Yes",
  ];

  const statusSecond: Array<"Connected" | "Disconted" | "Debts"> = [
    "Connected",
    "Disconted",
    "Debts",
  ];

  const statusThird: Array<"Connected" | "Disconted" | "No"> = [
    "Connected",
    "Disconted",
    "No",
  ];

  const stage: RealEstate["stage"][] = [
    "Off plan",
    "Under construction",
    "Key ready",
  ];

  const saleStatus: RealEstate["saleStatus"][] = [
    "Active listing",
    "In draft listing",
    "Banned listing",
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
    cyclePaymentOptions,
    market,
    classification,
    residencialType,
    comercialType,
    agriculturalType,
    parkingType,
    residencialHouseCategory,
    residencialFlatCategory,
    residencialPlotCategory,
    commercialRetailCategory,
    commercialIndustrialCategory,
    commercialOfficeCategory,
    commercialBuildingCategory,
    commercialPlotCategory,
    agriculturalHouseCategory,
    agriculturalPlotCategory,
    parkingParkingCategory,
    purposeLand,
    statusFirst,
    statusSecond,
    statusThird,
    stage,
    saleStatus,
  };
});
