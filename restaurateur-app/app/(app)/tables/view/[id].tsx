

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
import { deleteTable, getTableById, getTables } from "@/api/tables"; // Import getTables instead of getSalles
import { AntDesign, EvilIcons, MaterialIcons } from '@expo/vector-icons';
import { alert } from "@/utils/alert";
import { useRoute } from "@react-navigation/native";

export default function TabOneScreen() {
  const { user } = useAuth();

  const route=useRoute();

  //get params id
  const id=route.params?.id


  const [table, setTable] = useState<any>([]);

  useEffect(() => {
   getTableById(id)
    .then((table)=>{
      setTable(table)
    })
  }
    ,[])

  if(!id){
    return <Redirect href="/tables"/>
  }


  // Render your tables here

  return (
    <View style={styles.container}>
      <View className="flex-1 w-full  center py-10 space-y-10">
        {/* <Link
          className="py-2 bg-red-500 w-48 text-center text-white self-end mx-10"
          href="/tables/create" // Change the link to create a table
        >
          {id}
        </Link> */}

        <View className="flex flex-col justify-center items-center gap-5">
    <Text>QR Code de la {table?.name} :</Text>

        <QRCodeStyled
            data={id}
            style={{backgroundColor: 'white'}}
            padding={20}
            pieceSize={8}
            />
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
