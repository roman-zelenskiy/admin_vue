import {
  addDoc,
  orderBy,
  query,
  type DocumentData,
  QuerySnapshot,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { categoriesCollection } from "../../firebase.config";
import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useCollection } from "vuefire";
import { getDocumentsByFilters } from "@/utils/getDocumentsByFilters";

export const useCategoriesStore = defineStore("categories", () => {
  const categoriesByFilters = ref<QuerySnapshot<
    DocumentData,
    DocumentData
  > | null>(null);

  const createCategory = async (category: CreateCategory) => {
    try {
      const docRef = await addDoc(categoriesCollection, category);
      await updateDoc(docRef, { id: docRef.id });
      return { status: 1 };
    } catch (error) {
      console.log(error);
      return { status: 0 };
    }
  };

  const getAllCategories = () => {
    const q = query(categoriesCollection, orderBy("createdAt"));

    const categories = useCollection(q);

    const categoriesWithId = computed(() => {
      return categories.value.map((doc) => ({
        id: doc.id,
        ...doc,
      })) as Category[];
    });

    return { categories: categoriesWithId };
  };

  const getCategoriesByFilters = async (
    currentPagePayload: number = 1,
    filter?: {
      filterValue: string;
      filterKey: string;
    }
  ): Promise<{ categories: Category[]; totalPages: number }> => {
    try {
      const { documents, totalPages } = await getDocumentsByFilters<Category>(
        categoriesCollection,
        categoriesByFilters,
        currentPagePayload,
        filter
      );
      return { categories: documents, totalPages };
    } catch (error) {
      console.error("Error fetching documents: ", error);
      return { categories: [], totalPages: 0 };
    }
  };

  const deleteCategory = async (categoryId: Category["id"]) => {
    try {
      const docRef = doc(categoriesCollection, categoryId);
      await deleteDoc(docRef);
      return { status: 1 };
    } catch (error) {
      console.error("Error deleting category: ", error);
      return { status: 0 };
    }
  };

  const updateCategory = async (
    inputs: UpdateCategory,
    categoryId: Category["id"]
  ) => {
    try {
      const docRef = doc(categoriesCollection, categoryId);
      await updateDoc(docRef, { ...inputs });
      return { status: 1 };
    } catch (error) {
      console.log("Error updating category:", error);
      return { status: 0 };
    }
  };

  const getCategoryById = async (id: Category["id"]) => {
    try {
      const docRef = doc(categoriesCollection, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { status: 1, category: { ...docSnap.data() } as Category };
      } else {
        return { status: 0, category: null };
      }
    } catch (error) {
      console.error("Error fetching category: ", error);
      return { status: 0, category: null };
    }
  };

  return {
    createCategory,
    getAllCategories,
    getCategoriesByFilters,
    deleteCategory,
    updateCategory,
    getCategoryById,
  };
});
