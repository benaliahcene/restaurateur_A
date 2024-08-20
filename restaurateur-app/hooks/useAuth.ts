import React from "react";

import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { getRestaurantWithUserId } from "@/api/restaurants";

export function useAuth() {
  const [user, setUser] = React.useState<User>();
  const [restaurant, setRestaurant] = React.useState<any>();

  React.useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth,async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        //get restaurant with user id
        const { uid } = user;
        await getRestaurantWithUserId(uid,setRestaurant);

        setUser(user);
      } else {
        // User is signed out
        setUser(undefined);
      }
    });

    return unsubscribeFromAuthStatuChanged;
  }, []);

  return {
    user,
    restaurant
  };
}
