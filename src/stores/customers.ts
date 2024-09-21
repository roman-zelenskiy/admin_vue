import { defineStore } from "pinia";
import { usersCollection, uploadImage } from "../../firebase.config";
import {
  addDoc,
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
      return { documents: documents, totalPages };
    } catch (error) {
      console.error("Error fetching documents: ", error);
      return { documents: [], totalPages: 0 };
    }
  };

  return { createCustomer, getCustomersByFilters };
});
