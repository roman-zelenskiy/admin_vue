declare interface Skills {
  id: string;
  title: string;
  properties: string[];
  createdAt: string;
  updatedAt: string;
}

declare interface SkillsCreate {
  title: string;
  properties: string[];
  createdAt: string;
  updatedAt: string;
}

declare interface SkillsUpdate {
  title: string;
  properties: string[];
  updatedAt: string;
}
