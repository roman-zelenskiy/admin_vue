declare interface RealEstate {
  id: string;
  address: string;
  locationLat: string;
  LocationIng: string;
  street: string;
  number: string;
  floor: string;
  door: string;
  zipCode: string;
  city: string;
  reference: string;
  market: "New building" | "Resale" | "Lands";
  classification: "Residencial" | "Comercial" | "Agricultural" | "Parking";
  typeOfProperty:
    | "House"
    | "Flat"
    | "Plot"
    | "Retail"
    | "Industrial"
    | "Office"
    | "Building"
    | "Parking";

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
  >;

  yearOfConstruction: number;
  totalFloor: number;
  residentialComplex: string;
  sizePlot: number;
  purposeLand: Array<"Urban" | "Development" | "Undeveloped">;
  energy: "Connected" | "Disconted" | "Yes";
  water: "Connected" | "Disconted" | "Debts";
  gas: "Connected" | "Disconted" | "No";
  mobileCoverage:
    | "Full coverage"
    | "Stable coverage"
    | "Good coverage"
    | "Bad coverage";

  discountOrSpecialPromotion: string;
  buildings: number;
  apartaments: number;
  numberParkings: number;
  numberBlocks: number;
  deliveryData: string;
  stage: "Off plan" | "Under construction" | "Key ready";
  saleStatus: "Active listing" | "In draft listing" | "Banned listing";
  priceFrom: number;
  priceTo: number;
  rentalPrice: number;
  priceCondition: number;

  availableList: {
    
  }[]
}

declare interface CreateRealEstate extends Omit<RealEstate, "id"> {}

declare type RealEstateFilters = "id" | "title" | "createdAt" | "";
