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
import { getCategories } from "@/api/categories";
import { alert } from "@/utils/alert";
import SelectDropdown from "react-native-select-dropdown";
import { createArticles } from "@/api/articles";

export default function TabOneScreen() {
  const { user } = useAuth();
  const router = useRouter();

  const [articleName, setArticleName] = useState<string>("");
  const [price, setPrice] = useState<number | null>(null);
  const [categories, setCategories] = useState<any>([]);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = getCategories(setCategories);
    return () => unsubscribe();
  }, []);

  const handleSubmit = async () => {
    if (articleName.length < 1 || !price || price < 1 || !selectedCategory) {
      alert("Veuillez remplir les champs");
      return;
    }

    //create category
    try {
      await createArticles({
        name: articleName,
        price,
        category: selectedCategory,
      });
      alert("Article créé avec succès");
      setArticleName("");
      setPrice(null);
      setSelectedCategory(null);
      router.push("/articles");
    } catch (e) {
      console.log(e);
      alert("Erreur lors de la création de l'article");
    }
  };

  return (
    <View className="flex-1 w-full items-center justify-center">
      <View className="px-4 w-full max-w-sm flex items-center space-y-10">
        <Text className="text-3xl font-bold  ">Créer Article</Text>

        <View className="w-full space-y-4">
          <TextInput
            textContentType="name"
            placeholder="Nom de l'article"
            className="w-full border border-solid  border-gray-300 rounded-md p-4 "
            onChangeText={(text) => setArticleName(text)}
            value={articleName}
          />

          <TextInput
            textContentType="telephoneNumber"
            placeholder="Prix de l'article"
            className="w-full border border-solid  border-gray-300 rounded-md p-4 "
            onChangeText={(text) => setPrice(Number(text))}
            value={price?.toString()}
          />

          <SelectDropdown
            data={categories}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
              setSelectedCategory(selectedItem);
            }}
            renderButton={(selectedItem, isOpened) => {
              return (
                <View className="">
                  <Text className="w-full border border-solid  border-gray-300 rounded-md p-4 mt-4">
                    {(selectedItem && selectedItem.name) || "Choisir Categorie"}
                  </Text>
                </View>
              );
            }}
            renderItem={(item, index, isSelected) => {
              return (
                <View className="bg-red-400">
                  <Text className="active:bg-gray-50 w-full px-4 py-2">
                    {item.name}
                  </Text>
                </View>
              );
            }}
            showsVerticalScrollIndicator={false}
          />

          {/* select for  categories */}
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
