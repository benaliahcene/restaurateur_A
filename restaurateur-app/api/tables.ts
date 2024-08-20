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
  orderBy,
  limit,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "@/config/firebaseConfig";

export const getTables = (
  setTables: React.Dispatch<React.SetStateAction<any[]>>
) => {
  const tablesRef = collection(db, "tables");
  const userId=auth.currentUser?.uid

  const q = query(tablesRef,where("userId", "==", userId));

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const tables: any[] = [];
    querySnapshot.forEach((doc) => {
      tables.push({ id: doc.id, ...doc.data() });
    });
    setTables(tables);
  });

  // Return the unsubscribe function to stop listening for updates
  return unsubscribe;
};

export const createTable = async (table: any) => {
  const userId=auth.currentUser?.uid
  const tablesRef = collection(db, "tables");
  table.timestamp = serverTimestamp(); // Add a timestamp to the salle
  return await addDoc(tablesRef, {...table,userId});
};

export const updateTable = async (table: any) => {
  const tableDoc = doc(db, "tables", table.id);
  await updateDoc(tableDoc, table);
};

export const deleteTable = async (tableId: string) => {
  const tableDoc = doc(db, "tables", tableId);
  await deleteDoc(tableDoc);
};

export const getLatestTable = async () => {
  const userId=auth.currentUser?.uid
  const sallesRef = collection(db, "tables");
  const q = query(
    sallesRef, 
    where("userId", "==", userId),
    orderBy("timestamp", "desc"), 
    limit(1)
  );  const querySnapshot = await getDocs(q);

  let latestSalle: any = null;
  querySnapshot.forEach((doc) => {
    latestSalle = doc.data();
  });
  return latestSalle;
};


export const getTableById = async (tableId: string) => {
  const tableDoc = doc(db, "tables", tableId);
  const tableSnap = await getDoc(tableDoc);
  return tableSnap.data();
}

export const toggleTableStatus = async (tableId: string,status:string) => {
  const table = await getTableById(tableId);
  const tableDoc = doc(db, "tables", tableId);
  await updateDoc(tableDoc, {
    ...table,
    status,
  });
}