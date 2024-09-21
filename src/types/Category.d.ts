declare interface Category {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

declare interface CreateCategory {
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}


declare interface UpdateCategory {
  title: string;
  description: string;
  updatedAt: string;
}

declare type CategoryFilters = "id" | "title" | "createdAt" | "";
