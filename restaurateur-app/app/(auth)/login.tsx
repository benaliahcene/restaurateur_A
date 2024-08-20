//screen for login page
import { auth, app } from "@/config/firebaseConfig";
import { useAuth } from "@/hooks/useAuth";
import { alert } from "@/utils/alert";
import { Link, Redirect, useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { user } = useAuth();

  if (user) {
    return <Redirect href="/home" />;
  }

  const handleLogin = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful");
      router.push("/home");

      // User is signed in
    } catch (error) {
      alert("Login failed");
    }
  };

  return (
    <View className="flex-1 w-full items-center justify-center">
      <View className="px-4 w-full max-w-sm">
        <Text className="text-5xl font-bold mb-6 ">Login</Text>

        <View className="flex flex-col items-center gap-4">
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
            <Link href="/register">Create Account Instead</Link>
          </Pressable>
          <Pressable>
            <Text className=" font-bold">Reset password</Text>
          </Pressable>
        </View>

        <TouchableOpacity
          className="w-full border border-solid  border-gray-300 rounded-md p-4 bg-red-500  cursor-pointer"
          onPress={handleLogin}
        >
          <Text className="text-white">Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
