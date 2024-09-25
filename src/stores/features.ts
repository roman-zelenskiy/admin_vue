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
import { featuresCollection as currentCollection } from "../../firebase.config";
import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { useCollection } from "vuefire";
import { getDocumentsByFilters } from "@/utils/getDocumentsByFilters";

export const useFeaturesStore = defineStore("features", () => {
  const categoriesByFilters = ref<QuerySnapshot<
    DocumentData,
    DocumentData
  > | null>(null);

  const createDocument = async (document: FeatureCreate) => {
    try {
      const docRef = await addDoc(currentCollection, document);
      await updateDoc(docRef, { id: docRef.id });
      return { status: 1 };
    } catch (error) {
      console.log(error);
      return { status: 0 };
    }
  };

  const getAllDocuments = () => {
    const q = query(currentCollection, orderBy("createdAt"));

    const documents = useCollection(q);

    const categoriesWithId = computed(() => {
      return documents.value.map((doc) => ({
        id: doc.id,
        ...doc,
      })) as Feature[];
    });

    return { documents: categoriesWithId };
  };

  const getDocsByFilters = async (
    currentPagePayload: number = 1,
    filter?: {
      filterValue: string;
      filterKey: string;
    }
  ): Promise<{ documents: Feature[]; totalPages: number }> => {
    try {
      const { documents, totalPages } = await getDocumentsByFilters<Feature>(
        currentCollection,
        categoriesByFilters,
        currentPagePayload,
        filter
      );

      return { documents: documents, totalPages };
    } catch (error) {
      console.error("Error fetching documents: ", error);
      return { documents: [], totalPages: 0 };
    }
  };

  const deleteDocument = async (categoryId: Feature["id"]) => {
    try {
      const docRef = doc(currentCollection, categoryId);
      await deleteDoc(docRef);
      return { status: 1 };
    } catch (error) {
      console.error("Error deleting Document: ", error);
      return { status: 0 };
    }
  };

  const updateDocument = async (
    inputs: FeatureUpdate,
    categoryId: Feature["id"]
  ) => {
    try {
      const docRef = doc(currentCollection, categoryId);
      await updateDoc(docRef, { ...inputs });
      return { status: 1 };
    } catch (error) {
      console.log("Error updating Document:", error);
      return { status: 0 };
    }
  };

  const getDocumentById = async (id: Feature["id"]) => {
    try {
      const docRef = doc(currentCollection, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { status: 1, document: { ...docSnap.data() } as Feature };
      } else {
        return { status: 0, document: null };
      }
    } catch (error) {
      console.error("Error fetching Document: ", error);
      return { status: 0, document: null };
    }
  };

  return {
    createDocument,
    getAllDocuments,
    getDocsByFilters,
    deleteDocument,
    updateDocument,
    getDocumentById,
  };
});
