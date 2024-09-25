import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  ref,
} from "firebase/storage";

const {
  VITE_FIREBASE_API_KEY,
  VITE_FIREBASE_AUTH_DOMAIN,
  VITE_FIREBASE_DATABASE_URL,
  VITE_FIREBASE_PROJECT_ID,
  VITE_FIREBASE_STORAGE_BUCKET,
  VITE_FIREBASE_MESSAGING_SENDER_ID,
  VITE_FIREBASE_APP_ID,
  VITE_FIREBASE_MEASUREMENT_ID,
} = import.meta.env;

export const firebaseApp = initializeApp({
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: VITE_FIREBASE_DATABASE_URL,
  projectId: VITE_FIREBASE_PROJECT_ID,
  storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: VITE_FIREBASE_APP_ID,
  measurementId: VITE_FIREBASE_MEASUREMENT_ID,
});

export const db = getFirestore(firebaseApp);

export const categoriesCollection = collection(db, "user-categories");
export const usersCollection = collection(db, "customers");
export const realEstateCollection = collection(db, "real-estate");
export const featuresCollection = collection(db, "features");

export const storage = getStorage(firebaseApp);

export const uploadImage = (file: File, path: string) => {
  return new Promise((resolve, reject) => {
    const storagePath = `${path}/${file.name}`;

    const storageReference = storageRef(storage, storagePath);

    uploadBytes(storageReference, file)
      .then(async (snapshot) => {
        console.log("Upload successful!");
        const downloadURL: string = await getDownloadURL(snapshot.ref);
        resolve(downloadURL);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteFileFromStorage = async (filePath: string) => {
  const storageRef = ref(storage, filePath);
  await deleteObject(storageRef);
};
