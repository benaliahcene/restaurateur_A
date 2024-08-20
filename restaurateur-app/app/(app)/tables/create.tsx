import {
  Button,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { signOut } from "firebase/auth";
import { auth, db } from "@/config/firebaseConfig";
import { useAuth } from "@/hooks/useAuth";
import { Link, Redirect, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { createTable, getLatestTable, getTables } from "@/api/tables";
import { getSalles } from "@/api/salles";
import { alert } from "@/utils/alert";
import SelectDropdown from "react-native-select-dropdown";

export default function TabOneScreen() {
  const { user } = useAuth();
  const router = useRouter();

  const [tableCount, setTableCount] = useState<number>(1);
  const [selectedSalle, setSelectedSalle] = useState<any>("");
  const [salles, setSalles] = useState<any[]>([]);
  const [tables, setTables] = useState<any[]>([]);

  useEffect(() => {
    const unsubscribe = getSalles(setSalles);
    return () => unsubscribe();
  }, []);

  const handleSubmit = async () => {
    if (tableCount < 1) {
      alert("Veuillez remplir le champ");
      return;
    }

    // Get the latest table
    console.log("nikmok")

    try{

      //use tables array to get the latest table
    const tablesDb = await getTables(setTables);
    //sort them by timestamp
    const latestTable = tables.sort((a, b) => b.timestamp - a.timestamp)[0];
    
    let latestTableNumber = 0;
    if (latestTable) {
      // Extract the table number from the latest table's name
      const match = latestTable.name.match(/\d+$/);
      if (match) {
        latestTableNumber = Number(match[0]);
      }
    }

    // Create tables
      for (let i = 0; i < tableCount; i++) {
        await createTable({
          name: `Table ${latestTableNumber + i + 1}`,
          salle: selectedSalle,
        });
      }
      alert("Table(s) créée(s) avec succès");
      router.push("/tables");
    } catch (e) {
      console.log(e);
      alert("Erreur lors de la création de la table");
    }
  };
  return (
    <View className="flex-1 w-full items-center justify-center">
      <View className="px-4 w-full max-w-sm flex items-center space-y-10">
        <Text className="text-3xl font-bold  ">Créer Table</Text>

        <View className="w-full space-y-4">
          <TextInput
            keyboardType="numeric"
            placeholder="Nombre de tables à créer"
            className="w-full border border-solid  border-gray-300 rounded-md p-4 "
            onChangeText={(text) => setTableCount(Number(text))}
            value={String(tableCount)}
          />
          <SelectDropdown
            data={salles}
            onSelect={(selectedItem, index) => {
              setSelectedSalle(selectedItem);
            }}
            renderButton={(selectedItem, isOpened) => (
              <View className="">
                <Text className="w-full border border-solid  border-gray-300 rounded-md p-4 mt-4">
                  {(selectedItem && selectedItem.name) || "Choisir Salle"}
                </Text>
              </View>
            )}
            renderItem={(salle, index, isSelected) => (
              <View className="bg-red-400">
                <Text className="active:bg-gray-50 w-full px-4 py-2">
                  {salle.name}
                </Text>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <TouchableOpacity
          className="w-full border border-solid  border-gray-300 rounded-md p-4 bg-red-500 cursor-pointer"
          onPress={() => handleSubmit()}
        >
          <Text className="text-white">Créer</Text>
        </TouchableOpacity>
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
