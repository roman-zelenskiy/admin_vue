declare interface Feature {
  id: string;
  title: string;
  properties: string[];
  createdAt: string;
  updatedAt: string;
}

declare interface FeatureCreate {
  title: string;
  properties: string[];
  createdAt: string;
  updatedAt: string;
}

declare interface FeatureUpdate {
  title: string;
  properties: string[];
  updatedAt: string;
}
