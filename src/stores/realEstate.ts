import { defineStore } from "pinia";
import {
  realEstateCollection,
  uploadImage,
  deleteFileFromStorage,
  db,
} from "../../firebase.config";
import {
  doc,
  addDoc,
  deleteDoc,
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

  const createDocument = async (inputsDocument: CreateRealEstate) => {
    const inputs = inputsDocument;

    inputs.documentation = await Promise.all(
      inputs.documentation.map(async (el) => {
        if (el && !!el?.file) {
          el = (await uploadImage(
            el?.file,
            `real_estate_documentation/${generateUniqueId()}`
          )) as string;
        }
        return el;
      })
    );

    inputs.pictures = await Promise.all(
      inputs.pictures.map(async (el) => {
        if (el && !!el?.file) {
          el = (await uploadImage(
            el?.file,
            `real_estate_pictures/${generateUniqueId()}`
          )) as string;
        }
        return el;
      })
    );

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
  ): Promise<{ documents: RealEstate[]; totalPages: number }> => {
    try {
      const { documents, totalPages } = await getDocumentsByFilters<RealEstate>(
        realEstateCollection,
        documentsByFilters,
        currentPagePayload,
        filter
      );

      const documentsWithUsers = await Promise.all(
        documents.map(async (realEstateDoc) => {
          try {
            if (!realEstateDoc.userId) {
              throw new Error("User ID is missing");
            }
            const userDocRef = doc(db, "customers", realEstateDoc.userId);
            const userDocSnapshot = await getDoc(userDocRef);
            const userData = userDocSnapshot.exists()
              ? userDocSnapshot.data()
              : null;

            return {
              ...realEstateDoc,
              user: userData,
            };
          } catch (error) {
            console.error(
              "Error fetching user data for document: ",
              realEstateDoc.id,
              error
            );
            return {
              ...realEstateDoc,
              user: null,
            };
          }
        })
      );

      return { documents: documentsWithUsers, totalPages };
    } catch (error) {
      console.error("Error fetching documents: ", error);
      return { documents: [], totalPages: 0 };
    }
  };

  const deleteDocument = async (documentId: string) => {
    try {
      const docRef = doc(realEstateCollection, documentId);
      const document = await getDoc(docRef);
      if (document.exists()) {
        const data = document.data() as RealEstate;

        for (const picture of data.pictures) {
          if (picture) {
            await deleteFileFromStorage(picture);
          }
        }

        for (const docum of data.documentation) {
          if (docum) {
            await deleteFileFromStorage(docum);
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

  const getDocumentById = async (id: Customer["id"]) => {
    ///
    try {
      const docRef = doc(realEstateCollection, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { status: 1, document: { ...docSnap.data() } as Customer }; ///
      } else {
        return { status: 0, document: null };
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
      return { status: 0, document: null };
    }
  };

  const updateDocument = async (
    documentInputs: CreateRealEstate,
    id: RealEstate["id"]
  ) => {
    const inputs = documentInputs;
    inputs.documentation = await Promise.all(
      inputs.documentation.map(async (el) => {
        if (el && !!el?.file) {
          el = (await uploadImage(
            el?.file,
            `real_estate_documentation/${generateUniqueId()}`
          )) as string;
        }
        return el;
      })
    );

    inputs.pictures = await Promise.all(
      inputs.pictures.map(async (el) => {
        if (el && !!el?.file) {
          el = (await uploadImage(
            el?.file,
            `real_estate_pictures/${generateUniqueId()}`
          )) as string;
        }
        return el;
      })
    );
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
    getDocumentById,
    updateDocument,
  };
});
