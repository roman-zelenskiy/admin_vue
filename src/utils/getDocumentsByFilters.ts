import {
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  getCountFromServer,
  CollectionReference,
  QuerySnapshot,
  type DocumentData,
} from "firebase/firestore";
import type { Ref } from "vue";

export const getDocumentsByFilters = async <T>(
  collectionRef: CollectionReference<DocumentData, DocumentData>,
  documentsByFilters: Ref<QuerySnapshot<DocumentData> | null>,
  currentPagePayload: number = 1,
  filter?: {
    filterValue: string;
    filterKey: string;
  },
  pageSize: number = 20
): Promise<{ documents: T[]; totalPages: number }> => {
  const currentPage = currentPagePayload;
  const lastVisible =
    currentPage > 1 ? documentsByFilters.value?.docs[pageSize - 1] : null;

  try {
    let q = query(
      collectionRef,
      orderBy(filter?.filterValue ? filter.filterKey : "createdAt"),
      limit(pageSize)
    );

    let queryNoLimit = query(collectionRef);

    if (filter?.filterValue) {
      q = query(
        q,
        where(filter.filterKey, ">=", filter.filterValue),
        where(filter.filterKey, "<=", filter.filterValue + "\uf8ff")
      );
      queryNoLimit = query(
        queryNoLimit,
        where(filter.filterKey, ">=", filter.filterValue),
        where(filter.filterKey, "<=", filter.filterValue + "\uf8ff")
      );
    }

    if (lastVisible) {
      q = query(q, startAfter(lastVisible));
    }

    const querySnapshot = await getDocs(q);
    documentsByFilters.value = querySnapshot;

    const newDocuments = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
    })) as T[];

    const snapshot = await getCountFromServer(queryNoLimit);
    const totalPages = Math.ceil(snapshot.data().count / pageSize);

    return { documents: newDocuments, totalPages };
  } catch (error) {
    console.error("Error fetching documents: ", error);
    return { documents: [], totalPages: 0 };
  }
};
