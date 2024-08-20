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
import { createCategory, getCategories } from "@/api/categories";
import { alert } from "@/utils/alert";

export default function TabOneScreen() {
  const { user } = useAuth();
  const router = useRouter();

  const [categoryName, setCategoryName] = useState<string>("");

  const handleSubmit = async () => {
    if (categoryName.length < 1) {
      alert("Veuillez remplir le champ");
      return;
    }

    //create category
    try {
      await createCategory({ name: categoryName });
      alert("Categorie créée avec succès");
      router.push("/categories");
      setCategoryName("");
    } catch (e) {
      console.log(e);
      alert("Erreur lors de la création de la categorie");
    }
  };

  return (
    <View className="flex-1 w-full items-center justify-center">
      <View className="px-4 w-full max-w-sm flex items-center space-y-10">
        <Text className="text-3xl font-bold  ">Créer Categorie</Text>

        <TextInput
          textContentType="name"
          placeholder="Nom de la categorie"
          className="w-full border border-solid  border-gray-300 rounded-md p-4 "
          onChangeText={(text) => setCategoryName(text)}
          value={categoryName}
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
