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
    limit,
  } from "firebase/firestore";
  import { db } from "@/config/firebaseConfig";
  

  
  export const createRestaurant = async (restaurant: any) => {
    const restoRef = collection(db, "restaurants");
    return await addDoc(restoRef, restaurant);
  };


export const getRestaurantWithUserId = async (userId: string,  setResto: React.Dispatch<React.SetStateAction<any[]>> ) => {
    const restoRef = collection(db, "restaurants");
    const q = query(restoRef, where("userId", "==", userId),limit(1));
    const querySnapshot = await getDocs(q);
    let restaurant: any;
    querySnapshot.forEach((doc) => {
        if (!restaurant) {
            restaurant = doc.data();
            return;
        }
    });
    setResto(restaurant);
}
  
