declare interface RealEstate {
  id: string;
  address: string | null;
  locationLat: string | null;
  locationIng: string | null;
  street: string | null;
  number: string | null;
  floor: string | null;
  door: string | null;
  zipCode: string | null;
  city: string | null;
  reference: string | null;
  market: "New building" | "Resale" | "Lands" | null;
  classification:
    | "Residential"
    | "Commercial"
    | "Agricultural"
    | "Parking"
    | null;
  typeOfProperty:
    | "House"
    | "Flat"
    | "Plot"
    | "Retail"
    | "Industrial"
    | "Office"
    | "Building"
    | "Parking"
    | null;

  category: Array<
    | "Single-family"
    | "Multi-family"
    | "Detached"
    | "Semi-detached"
    | "Terraced"
    | "Bungalow"
    | "Townhouse"
    | "Villa"
    | "Cottage"
    | "Mansion"
    | "Duplex"
    | "Chalet"
    | "Manufactured"
    | "Floating home"
    | "Quad-house"
    | "Loft"
    | "Ground floor"
    | "Condominium"
    | "Low-Rise"
    | "High-Rise"
    | "Penthouse"
    | "Studio"
    | "Skyscrapers"
    | "Large apartment"
    | "Apartments"
    | "Duplex"
    | "Top floor"
    | "Land"
    | "Island"
    | "Restaurant"
    | "Supermarket"
    | "Bar"
    | "Commercial unit"
    | "Fuel station"
    | "Warehouse"
    | "Office"
    | "Business-Center"
    | "Hotel"
    | "Building-apartment"
    | "Shopping center"
    | "Land"
    | "Countryhouse"
    | "Farmhouse"
    | "Rancho"
    | "Rural land"
    | "Garage"
    | "Storage"
    | "Parking space"
  > | null;

  yearOfConstruction: number | null;
  totalFloor: number | null;
  residentialComplex: string | null;
  sizePlot: number | null;
  purposeLand: Array<"Urban" | "Development" | "Undeveloped"> | null;
  energy: Array<"Connected" | "Disconnected" | "Yes">;
  water: Array<"Connected" | "Disconnected" | "Debts">;
  gas: Array<"Connected" | "Disconnected" | "Debts">;
  mobileCoverage:
    | "Full coverage"
    | "Stable coverage"
    | "Good coverage"
    | "Bad coverage"
    | null;

  discountOrSpecialPromotion: string | null;
  buildings: number | null;
  apartments: number | null;
  numberParkings: number | null;
  numberBlocks: number | null;
  deliveryDate: string | null;
  stage: "Off plan" | "Under construction" | "Key ready" | null;
  saleStatus: "Active listing" | "In draft listing" | "Banned listing" | null;
  priceFrom: number | null;
  priceTo: number | null;
  rentalPrice: number | null;
  priceCondition: string[];

  availableList: {
    id: string;
    totalFloor: number | null;
    category: string | null;
    bedroomsFrom: number | null;
    bedroomsTo: number | null;
    bathrooms: number | null;
    squareFrom: number | null;
    squareTo: number | null;
    availableUnitsForSale: number | null;
  }[];

  developerDetails: {
    companyDeveloper: string | null;
    contactPerson: string | null;
    phone: string | null;
    addressCompany: string | null;
    owner: string | null;
  };

  sold: "Furnished" | "Partly" | "Unfurnished" | null;

  featuresIds: Feature["id"][] | null;
  features: {
    id: string;
    properties: string[];
  }[];

  partnerCommission: number | null;
  typeCommission: string[] | null;
  hoaFees: number | null;
  taxAmount: number | null;

  listingAgreement: string[];
  showingRequirements: string[];
  listingTerms: string[];
  buyerIncentive: string[];

  description: string | null;
  video: string | null;
  virtualTour: string | null;
  pictures: string[];
  documentation: string[];

  energyRatingConsumption: string | null;
  energyRatingEmissions: string | null;

  authorCompany: string | null;
  userId: string | null;
  user?: Customer | null;
  date: string | null;
  status: string | null;
  quantityBathrooms: null | number;
  quantityBedrooms: null | number;
  createdAt: string | null;
  updatedAt: string | null;
}

declare interface CreateRealEstate extends Omit<RealEstate, "id"> {
  pictures: FileData[] | string[];
  documentation: FileData[] | string[];
}

declare type RealEstateFilters = "id" | "address" | "createdAt" | "";
