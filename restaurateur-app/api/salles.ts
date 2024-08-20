import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  limit,
  orderBy,
} from "firebase/firestore";
import { auth, db } from "@/config/firebaseConfig";

export const getSalles = (
  setSalles: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const sallesRef = collection(db, "salles");

  const userId=auth.currentUser?.uid

  
  const q = query(sallesRef,where('userId','==',userId));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const salles: any[] = [];
    querySnapshot.forEach((doc) => {
      salles.push({ id: doc.id, ...doc.data() });
    });
    setSalles(salles);
  });

  // Return the unsubscribe function to stop listening for updates
  return unsubscribe;
};


export const createSalle = async (salle: any) => {
  const sallesRef = collection(db, "salles");
  const userId=auth.currentUser?.uid
  
  salle.timestamp = serverTimestamp(); // Add a timestamp to the salle
  return await addDoc(sallesRef, {...salle,userId});
};

export const updateSalle = async (salle: any) => {
  const salleDoc = doc(db, "salles", salle.id);
  await updateDoc(salleDoc, salle);
};

export const deleteSalle = async (salleId: string) => {
  const salleDoc = doc(db, "salles", salleId);
  await deleteDoc(salleDoc);
};
