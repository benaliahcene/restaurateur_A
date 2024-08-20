

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
    orderBy,
    getDoc,
  } from "firebase/firestore";
  import { auth, db } from "@/config/firebaseConfig";
  
  export const getCommandes = (
    setCommandes: React.Dispatch<React.SetStateAction<any[]>>
  ) => {
    const commandesRef = collection(db, "commandes");
  
    const userId=auth.currentUser?.uid;  
  
    const q = query(commandesRef,where("userId", "==", userId)
    );
  
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const commandes: any[] = [];
      querySnapshot.forEach((doc) => {
        commandes.push({ id: doc.id, ...doc.data() });
      });
      setCommandes(commandes);
    });
  
    // Return the unsubscribe function to stop listening for updates
    return unsubscribe;
  };

  export const getCommandeById = async (commandeId: string) => {
    const commandesRef = doc(db, "commandes", commandeId);
    const docSnapshot = await getDoc(commandesRef);
    let commande: any;
    if (docSnapshot.exists()) {
      commande = docSnapshot.data();
    }
    return commande;
  }
  

  export const updateCommande = async (commandeId: string,commande:any) => {
    const commandesRef = doc(db, "commandes", commandeId);
    await updateDoc(commandesRef, commande);
  }