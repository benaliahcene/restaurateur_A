import { Button, Pressable, ScrollView, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { signOut } from "firebase/auth";
import { auth, db } from "@/config/firebaseConfig";
import { useAuth } from "@/hooks/useAuth";
import { Link, Redirect, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { deleteTable, getTables } from "@/api/tables"; // Import getTables instead of getSalles
import { AntDesign, EvilIcons, MaterialIcons } from '@expo/vector-icons';
import { alert } from "@/utils/alert";

export default function TabOneScreen() {
  const { user } = useAuth();

  const [users, setUsers] = useState([]);

  const router = useRouter();

  const [tables, setTables] = useState<any>([]); // Rename salles to tables

  useEffect(() => {
    const unsubscribe = getTables(setTables); // Use getTables instead of getSalles
    return () => unsubscribe();
  }, []);

  //handlers

  const deleteTableHandler=(tableId:string)=>{
    deleteTable(tableId).then(()=>{
    alert("Table supprimé avec succes")
  })
  .catch((err:any)=>{
      console.log(err)
    alert("Une Erreur s'est survenue")
  })
  }

  const navigateToTable=(table:any)=>{
    router.navigate(`/tables/view/${table}`)
  }

  // Render your tables here


  return (
    <View style={styles.container}>
      <View className="flex-1 w-full  center py-10 space-y-10">
        <Link
          className="py-2 bg-red-500 w-48 text-center text-white self-end mx-10"
          href="/tables/create" // Change the link to create a table
        >
          Create Tables
        </Link>

        <View>
          <ScrollView>
            {tables.map(
              (
                table: any,
                index: number // Map over tables instead of salles
              ) => (
                <Pressable
                  key={index}
                  className="active:bg-gray-200 transition w-full py-5 border-b-[0.5px] border-gray-300 px-10 flex flex-row justify-between"
                  onPress={()=>navigateToTable(table.id)}
               >
                  <View>
                  <Text>{table.name}</Text>
                  <Text className="text-xs text-gray">{table.salle.name}</Text>

                  </View>

                  <View className="flex flex-row gap-4">
                  <MaterialIcons onPress={()=>deleteTableHandler(table.id)} name="delete" size={24} color="black" />
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
