import { defineStore } from "pinia";
import {
  realEstateCollection,
  uploadImage,
  deleteFileFromStorage,
} from "../../firebase.config";
import {
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  QuerySnapshot,
  updateDoc,
  type DocumentData,
} from "firebase/firestore";
import { generateUniqueId } from "@/utils";
import { getDocumentsByFilters } from "@/utils/getDocumentsByFilters";
import { ref } from "vue";

export const useRealEstateStore = defineStore("realEstate", () => {
  const documentsByFilters = ref<QuerySnapshot<
    DocumentData,
    DocumentData
  > | null>(null);

  const createDocument = async (inputsDocument: CreateCustomer) => {
    const inputs = inputsDocument;

    try {
      const docRef = await addDoc(realEstateCollection, inputs);
      await updateDoc(docRef, { id: docRef.id });
      return { status: 1 };
    } catch (error) {
      console.log(error);
      return { status: 0 };
    }
  };

  const getItemsByFilters = async (
    currentPagePayload: number = 1,
    filter?: {
      filterValue: string;
      filterKey: string;
    }
  ): Promise<{ documents: Customer[]; totalPages: number }> => {////
    try {
      const { documents, totalPages } = await getDocumentsByFilters<Customer>(//////
        realEstateCollection,
        documentsByFilters,
        currentPagePayload,
        filter
      );
      return { documents: documents, totalPages };
    } catch (error) {
      console.error("Error fetching documents: ", error);
      return { documents: [], totalPages: 0 };
    }
  };

  const deleteDocument = async (documentId: string) => {
    try {
      const docRef = doc(realEstateCollection, documentId);
      // const document = await getDoc(docRef);
      // if (document.exists()) {
      //   const data = document.data() as Customer;///

      //   if (data.photo) {
      //     await deleteFileFromStorage(data.photo);
      //   }

      //   for (const experience of data.experience) {
      //     if (experience.logo) {
      //       await deleteFileFromStorage(experience.logo);
      //     }
      //   }
      // }
      await deleteDoc(docRef);
      return { status: 1 };
    } catch (error) {
      console.error("Error deleting document: ", error);
      return { status: 0 };
    }
  };

  const getCustomerById = async (id: Customer["id"]) => {///
    try {
      const docRef = doc(realEstateCollection, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { status: 1, document: { ...docSnap.data() } as Customer };///
      } else {
        return { status: 0, document: null };
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
      return { status: 0, document: null };
    }
  };

  const updateCustomer = async (documentInputs: CreateCustomer, id: Customer["id"]) => {///
    const inputs = documentInputs;
    // if (inputsCustomer.photo && inputsCustomer.photo instanceof File) {
    //   await uploadImage(
    //     inputsCustomer.photo,
    //     `user_photos/${generateUniqueId()}`
    //   ).then((res) => {
    //     inputsCustomer.photo = res as string;
    //   });
    // // }

    // inputs.experience = await Promise.all(
    //   inputs.experience.map(async (el) => {
    //     if (el.logo && el.logo instanceof File) {
    //       el.logo = (await uploadImage(
    //         el.logo,
    //         `experience_logos/${generateUniqueId()}`
    //       )) as string;
    //     }
    //     return el;
    //   })
    // );
    try {
      const docRef = doc(realEstateCollection, id);
      await updateDoc(docRef, { ...inputs });
      return { status: 1 };
    } catch (error) {
      console.log("Error updating document:", error);
      return { status: 0 };
    }
  };

  return {
    createDocument,
    getItemsByFilters,
    deleteDocument,
    getCustomerById,
    updateCustomer,
  };
});
