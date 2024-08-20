import {
  Button,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
// import { Text, View } from '@/components/Themed';
import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { signOut } from "firebase/auth";
import { auth, db } from "@/config/firebaseConfig";
import { useAuth } from "@/hooks/useAuth";
import { Link, Redirect, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { createSalle, getSalles } from "@/api/salles";
import { alert } from "@/utils/alert";

export default function TabOneScreen() {
  const { user } = useAuth();
  const router = useRouter();

  const [salleName, setSalleName] = useState<string>("");

  const handleSubmit = async () => {
    if (salleName.length < 1) {
      alert("Veuillez remplir le champ");
      return;
    }

    //create Salle
    try {
      await createSalle({ name: salleName });
      alert("Salle créée avec succès");
      router.push("/salles");
      setSalleName("");
    } catch (e) {
      console.log(e);
      alert("Erreur lors de la création de la salle");
    }
  };

  return (
    <View className="flex-1 w-full items-center justify-center">
      <View className="px-4 w-full max-w-sm flex items-center space-y-10">
        <Text className="text-3xl font-bold  ">Créer Salle</Text>

        <TextInput
          textContentType="name"
          placeholder="Nom de la Salle"
          className="w-full border border-solid  border-gray-300 rounded-md p-4 "
          onChangeText={(text) => setSalleName(text)}
          value={salleName}
        />
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
