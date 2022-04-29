import { useState, useEffect } from "react";
import { firebaseFireStore } from "../firebase/config";
import { storage } from "../firebase/config";
import { ref, getMetadata } from "firebase/storage";

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsubscribe = firebaseFireStore
      .collection(collection)
      .onSnapshot((snap) => {
        snap.forEach(async (doc) => {
          try {
            const forestRef = ref(storage, doc.data().url);
            const metadata = await getMetadata(forestRef);
            const newDoc = { ...doc.data(), metadata, id: doc.id };
            console.log(doc.data().url);
            if (firebaseFireStore.collection(collection).doc().id === doc.id) {
              console.log("it has already");
            } else {
              console.log("no added again");
              setDocs((documents) => [...documents, newDoc]);
            }
          } catch (error) {
            console.log(error);
          }
        });
      });

    return unsubscribe;
  }, [collection]);

  return { docs };
};

export default useFirestore;
