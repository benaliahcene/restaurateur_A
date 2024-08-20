import { Button, Pressable, ScrollView, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { signOut } from "firebase/auth";
import { auth, db } from "@/config/firebaseConfig";
import { useAuth } from "@/hooks/useAuth";
import { Link, Redirect, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { deleteSalle, getSalles } from "@/api/salles"; // Import getSalles instead of getCategories
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";
import { alert } from "@/utils/alert";

export default function TabOneScreen() {
  const { user } = useAuth();

  const [users, setUsers] = useState([]);

  const [salles, setSalles] = useState<any>([]); // Rename categories to salles

  useEffect(() => {
    const unsubscribe = getSalles(setSalles); // Use getSalles instead of getCategories
    return () => unsubscribe();
  }, []);


     //handlers
     const deleteSalleHandler=(salleId:string)=>{
      deleteSalle(salleId).then(()=>{
      alert("Salle supprimée avec succes")
    })
    .catch((err:any)=>{
        console.log(err)
      alert("Une Erreur s'est survenue")
    })
    }
  // Render your salles here

  return (
    <View style={styles.container}>
      <View className="flex-1 w-full  center py-10 space-y-10">
        <Link
          className="py-2 bg-red-500 w-48 text-center text-white self-end mx-10"
          href="/salles/create" // Change the link to create a salle
        >
          Create Salle
        </Link>

        <View>
          <ScrollView>
            {salles.map(
              (
                salle: any,
                index: number // Map over salles instead of categories
              ) => (
                <Pressable
                  key={index}
                  className="active:bg-gray-200 transition w-full py-5 border-b-[0.5px] border-gray-300 px-10 flex flex-row justify-between"
                >
                  <Text>{salle.name}</Text>


                  <View className="flex flex-row gap-4">
                  <MaterialIcons name="edit" size={24} color="black" />
                  <MaterialIcons onPress={()=>deleteSalleHandler(salle.id)} name="delete" size={24} color="black" />
                  </View>
                </Pressable>
              )
            )}
          </ScrollView>
        </View>
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
