import { Button, Pressable, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
// import { Text, View } from '@/components/Themed';
import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";
import { useAuth } from "@/hooks/useAuth";
import { Redirect, useRouter } from "expo-router";
import { getCommandes } from "@/api/commandes";
import { useState, useEffect } from "react";

export default function TabOneScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [countPending, setCountPending] = useState(0);
  const [finalizedForToday, setFinalizedForToday] = useState(0);

  const [commandes, setCommandes] = useState<any>([]); 

  useEffect(() => {
    getCommandes(setCommandes); 
    
  }, []);


  useEffect(() => {
    const pending = commandes.filter((commande: any) => commande.status === "pending");
    setCountPending(pending.length); 

    const finalizedForToday = commandes.filter((commande: any) => commande.status === "finalized" && commande.timestamp.toDate().toDateString() === new Date().toDateString());
    setFinalizedForToday(finalizedForToday.length);
    
  }, [commandes]);

  // if (!user) {
  //   return <Redirect href="/login" />;
  // }

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        router.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <View style={styles.container}>
      <View className="flex-1 w-full items-center justify-center space-y-5 ">
        <Text className="text-xl font-bold">Statistique</Text>
        <View className="flex flex-col w-3/4 justify-center items-center border border-black p-5 py-10 space-y-5 rounded-xl">
          <Text>Commandes En Attentes</Text>
          <Text className="font-bold text-5xl">{countPending}</Text>
        </View>

        <View className="flex flex-col w-3/4 justify-center items-center border border-black p-5 py-10 space-y-5 rounded-xl">
          <Text>Commandes Finalisée Pour Aujourd'hui</Text>
          <Text className="font-bold text-5xl">{finalizedForToday}</Text>
        </View>
        <Pressable 
        onPress={() => handleSignOut()}
         className="flex flex-row justify-center w-40 border border-solid  border-gray-300 rounded-md p-4 bg-red-500 cursor-pointer"
         >
           <Text className="text-white">se Deconnecter</Text>
         </Pressable>

       
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
