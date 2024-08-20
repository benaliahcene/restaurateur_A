//screen for login page
import { createRestaurant } from "@/api/restaurants";
import { auth, app } from "@/config/firebaseConfig";
import { alert } from "@/utils/alert";
import { Link, Redirect, router } from "expo-router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";

export default function Register() {
  const [restaurantName, setRestaurantName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (user) {
        await updateProfile(user, {
          displayName: name,
        });

        await createRestaurant({
          name: restaurantName,
          userId: user.uid,
        });

      }
      alert("Registration successful");
      router.push("/login");

      // User is signed in
    } catch (error:any) {
      console.log(error);
      alert("Registration failed :"+ error?.message);
    }
  };

  return (
    <View className="flex-1 w-full items-center justify-center">
      <View className="px-4 w-full max-w-sm">
        <Text className="text-5xl font-bold mb-6 ">Register</Text>

        <View className="flex flex-col items-center gap-4">
          <TextInput
            textContentType="name"
            placeholder="Enter Restaurant Name"
            className="w-full border border-solid  border-gray-300 rounded-md p-4 "
            onChangeText={(text) => setRestaurantName(text)}
            value={restaurantName}
          />

          <TextInput
            textContentType="name"
            placeholder="Enter Name"
            className="w-full border border-solid  border-gray-300 rounded-md p-4 "
            onChangeText={(text) => setName(text)}
            value={name}
          />
          <TextInput
            textContentType="emailAddress"
            placeholder="Enter email address"
            className="w-full border border-solid  border-gray-300 rounded-md p-4 "
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            textContentType="password"
            placeholder="Enter password"
            className="w-full border border-solid  border-gray-300 rounded-md p-4 "
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
        </View>

        <View className="flex flex-row justify-between items-center my-8">
          <Pressable>
            <Link push href="/login">
              Already have an account ?
            </Link>
          </Pressable>
        </View>

        <TouchableOpacity
          className="w-full border border-solid  border-gray-300 rounded-md p-4 bg-red-500  cursor-pointer"
          onPress={handleRegister}
        >
          <Text className="text-white">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
