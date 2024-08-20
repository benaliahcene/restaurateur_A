import { Button, Pressable, ScrollView, StyleSheet } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { signOut } from "firebase/auth";
import { auth, db } from "@/config/firebaseConfig";
import { useAuth } from "@/hooks/useAuth";
import { Link, Redirect, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { AntDesign, EvilIcons, MaterialIcons } from '@expo/vector-icons';
import { alert } from "@/utils/alert";
import { getCommandes } from "@/api/commandes";

export default function TabOneScreen() {
  const { user } = useAuth();


  const router = useRouter();

  const [commandes, setCommandes] = useState<any>([]); 

  useEffect(() => {
    getCommandes(setCommandes); 
    
  }, []);

  //handlers

  const deleteTableHandler=(tableId:string)=>{
  //   deleteTable(tableId).then(()=>{
  //   alert("Table supprimé avec succes")
  // })
  // .catch((err:any)=>{
  //     console.log(err)
  //   alert("Une Erreur s'est survenue")
  // })
  }

  const navigateToCommande=(commandeId:any)=>{
    console.log(commandeId)
    router.navigate(`/commandes/view/${commandeId}`)
  }

  // Render your tables here


  return (
    <View style={styles.container}>
      <View className="flex-1 w-full  center py-10 space-y-10">
        <Text className="font-bold text-xl px-5 ">Commandes</Text>

        <View>
          <ScrollView>
            {commandes.map(
              (
                commande: any,
                index: number // Map over commandes instead of salles
              ) => (
                <Pressable
                  key={index}
                  className="active:bg-gray-200 transition w-full py-5 border-b-[0.5px] border-gray-300 px-10 flex flex-row justify-between"
                  onPress={()=>navigateToCommande(commande.id)}
               >
                  <View>
                  <Text>{commande.tableName}</Text>
                  <Text className="text-xs text-gray">{commande.total} DA</Text>

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
