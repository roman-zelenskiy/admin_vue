import { defineStore } from "pinia";
import {
  usersCollection,
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

export const useCustomersStore = defineStore("customers", () => {
  const documentsByFilters = ref<QuerySnapshot<
    DocumentData,
    DocumentData
  > | null>(null);

  const createCustomer = async (customer: CreateCustomer) => {
    const inputsCustomer = customer;

    if (inputsCustomer.photo && inputsCustomer.photo instanceof File) {
      await uploadImage(
        inputsCustomer.photo,
        `user_photos/${generateUniqueId()}`
      ).then((res) => {
        inputsCustomer.photo = res as string;
      });
    }

    inputsCustomer.experience = await Promise.all(
      inputsCustomer.experience.map(async (el) => {
        if (el.logo && el.logo instanceof File) {
          el.logo = (await uploadImage(
            el.logo,
            `experience_logos/${generateUniqueId()}`
          )) as string;
        }
        return el;
      })
    );

    try {
      const docRef = await addDoc(usersCollection, inputsCustomer);
      await updateDoc(docRef, { id: docRef.id });
      return { status: 1 };
    } catch (error) {
      console.log(error);
      return { status: 0 };
    }
  };

  const getCustomersByFilters = async (
    currentPagePayload: number = 1,
    filter?: {
      filterValue: string;
      filterKey: string;
    }
  ): Promise<{ documents: Customer[]; totalPages: number }> => {
    try {
      const { documents, totalPages } = await getDocumentsByFilters<Customer>(
        usersCollection,
        documentsByFilters,
        currentPagePayload,
        filter
      );
      console.log(documents);

      return { documents: documents, totalPages };
    } catch (error) {
      console.error("Error fetching documents: ", error);
      return { documents: [], totalPages: 0 };
    }
  };

  const deleteDocument = async (documentId: string) => {
    try {
      const docRef = doc(usersCollection, documentId);
      const userDoc = await getDoc(docRef);
      if (userDoc.exists()) {
        const userData = userDoc.data() as Customer;

        if (userData.photo) {
          await deleteFileFromStorage(userData.photo);
        }

        for (const experience of userData.experience) {
          if (experience.logo) {
            await deleteFileFromStorage(experience.logo);
          }
        }
      }
      await deleteDoc(docRef);
      return { status: 1 };
    } catch (error) {
      console.error("Error deleting document: ", error);
      return { status: 0 };
    }
  };

  const getCustomerById = async (id: Customer["id"]) => {
    try {
      const docRef = doc(usersCollection, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { status: 1, document: { ...docSnap.data() } as Customer };
      } else {
        return { status: 0, document: null };
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
      return { status: 0, document: null };
    }
  };

  const updateCustomer = async (inputs: CreateCustomer, id: Customer["id"]) => {
    const inputsCustomer = inputs;
    if (inputsCustomer.photo && inputsCustomer.photo instanceof File) {
      await uploadImage(
        inputsCustomer.photo,
        `user_photos/${generateUniqueId()}`
      ).then((res) => {
        inputsCustomer.photo = res as string;
      });
    }

    inputsCustomer.experience = await Promise.all(
      inputsCustomer.experience.map(async (el) => {
        if (el.logo && el.logo instanceof File) {
          el.logo = (await uploadImage(
            el.logo,
            `experience_logos/${generateUniqueId()}`
          )) as string;
        }
        return el;
      })
    );
    try {
      const docRef = doc(usersCollection, id);
      await updateDoc(docRef, { ...inputs });
      return { status: 1 };
    } catch (error) {
      console.log("Error updating document:", error);
      return { status: 0 };
    }
  };

  return {
    createCustomer,
    getCustomersByFilters,
    deleteDocument,
    getCustomerById,
    updateCustomer,
  };
});
