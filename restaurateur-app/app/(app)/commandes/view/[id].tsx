

import { Button, Pressable, ScrollView, StyleSheet } from "react-native";
import QRCodeStyled from 'react-native-qrcode-styled';

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { signOut } from "firebase/auth";
import { auth, db } from "@/config/firebaseConfig";
import { useAuth } from "@/hooks/useAuth";
import { Link, Redirect, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { deleteTable, getTableById, getTables, toggleTableStatus } from "@/api/tables"; // Import getTables instead of getSalles
import { AntDesign, EvilIcons, MaterialIcons } from '@expo/vector-icons';
import { alert } from "@/utils/alert";
import { useRoute } from "@react-navigation/native";
import { getCommandeById, updateCommande } from "@/api/commandes";

export default function TabOneScreen() {
  const { user } = useAuth();

  const route=useRoute();

  //get params id
  const id=route.params?.id


  const [commande, setCommande] = useState<any>([]);

  useEffect(() => {
    getCommande()
  }
    ,[])

  if(!id){
    return <Redirect href="/commandes"/>
  }


  const getCommande=()=>{
    getCommandeById(id)
    .then((commande)=>{
      setCommande(commande)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  //handlers
  const changeStatusHandler=(status:string)=>{
   //update commnande
   updateCommande(id,{status:status})
    .then(()=>{
      alert("Commande modifié avec succes")

      if(status=='validated'){
        //update table status
        toggleTableStatus(commande.tableId,"closed")
        .then(()=>{
          console.log("Table status updated")
        })
        .catch((err)=>{
          console.log(err)
        })
      }else{
        //update table status
        toggleTableStatus(commande.tableId,"open")
        .then(()=>{
          console.log("Table status updated")
        })
        .catch((err)=>{
          console.log(err)
        })
      }

    })

    getCommande()
  }


  const translateStatus=(status:string)=>{
    switch(status){
      case 'pending':
        return "En attente"
      case 'validated':
        return "Validée"
      case 'finalized':
        return "Finalisée"
      case 'canceled':
        return "Annulée"
      default:
        return status
    }
  }

  // Render your tables here

  return (
    <View style={styles.container} className="p-5">

          <ScrollView className="flex-1 w-full  center py-10 space-y-10">
        <View className=" w-full flex flex-row justify-between items-center">

        </View>
        <View>
          
          <View className="w-full mx-auto ">
            {/* categories with articles in them */}

            <Text className="text-2xl font-bold">Details  {commande?.tableName}: </Text>
            <Text className="text-lg font-bold">Status: {translateStatus(commande?.status)} </Text>
            
            <View className="flex flex-row w-full items-center py-6 ">
                          <Text className="text-md flex-1 text-center ">Article</Text>
                          <Text className="text-md flex-1 text-center">Prix</Text>
                          <Text className="text-md flex-1 text-center"> Quantité</Text>
                          <Text className="text-md flex-1 text-center"> Total</Text>
                          </View>
                <View>
                  {commande?.items?.map((article: any, index: number) => (
                    <View className="my-3  flex flex-col justify-center items-center">
                        <>
                          <View className="flex flex-row w-full items-center py-6 ">
                          <Text className="text-md flex-1 text-center ">{article.name}</Text>
                          <Text className="text-md flex-1 text-center">{article.price} DA</Text>
                          <Text className="text-md flex-1 text-center"> {article.quantity}</Text>
                          <Text className="text-md flex-1 text-center"> {article.quantity * article.price} DA</Text>
                          </View>

                        </>
                    </View>
                  ))}

                </View>
                <View className="flex flex-row w-full items-center py-6 justify-end px-10 ">
                          <Text className="text-md"> Total: {commande?.total} DA</Text>
                </View>


                </View>



                 {commande?.status=='pending' ?  <>


                <Pressable
                                    className="p-2 bg-red-500 text-center text-white flex flex-row justify-center py-4 "
                                    onPress={() => changeStatusHandler('validated')}
                                    >
                                     <Text className="text-white ">{ "Confirmer"}</Text>
                                    </Pressable>

                                    <Pressable
                                    className="p-2 bg-red-800 my-5 text-center text-white flex flex-row justify-center py-4 "
                                    onPress={() => changeStatusHandler('canceled')}
                                    >
                                     <Text className="text-white ">{ "Annuler"}</Text>
                                    </Pressable>
                                    
                                    </>
                                    :
                                    commande?.status=='validated' ?
                                    <>
                                    <Pressable
                                    className="p-2 bg-red-500 text-center text-white flex flex-row justify-center py-4 "
                                    onPress={() => changeStatusHandler('finalized')}
                                    >
                                     <Text className="text-white ">{ "Finaliser"}</Text>
                                    </Pressable>

                                    <Pressable
                                    className="p-2 bg-red-800 my-5 text-center text-white flex flex-row justify-center py-4 "
                                    onPress={() => changeStatusHandler('canceled')}
                                    >
                                     <Text className="text-white ">{ "Annuler"}</Text>
                                    </Pressable>
                                    </>

                                  :
                                  <></>
            
                  }

          {/* <ScrollView>
            {categories.map((category: any, index: number) => (
              <Pressable
                key={index}
                className="active:bg-gray-200 transition w-full py-5 border-b-[0.5px] border-gray-300 px-10 flex flex-row justify-between"
              >
                <Text>{category.name}</Text>

                <View className="flex flex-row gap-4">
                  <MaterialIcons name="edit" size={24} color="black" />
                  </View>
              </Pressable>
            ))}
          </ScrollView> */}
        </View>
        <StatusBar style="auto" />
      </ScrollView>
  
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
