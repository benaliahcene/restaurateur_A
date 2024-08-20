import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, Stack, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import Drawer from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAuth } from "@/hooks/useAuth";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { user } = useAuth();
  const router = useRouter();
  // useEffect(() => {
  //   if (!user) {
  //     router.replace("/login");
  //   }
  // }, [user]);

  return (
    // <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="home" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Home",
            title: "Home Page",
          }}
        />
        <Drawer.Screen
          name="categories/index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Categories",
            title: "Categories",
          }}
        />
        <Drawer.Screen
          name="articles/index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Articles",
            title: "Articles",
          }}
        />
        <Drawer.Screen
          name="salles/index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Salles",
            title: "Salles",
          }}
        />
        <Drawer.Screen
          name="tables/index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Tables",
            title: "Tables",
          }}
        />
        <Drawer.Screen
          name="commandes/index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Commandes",
            title: "Commandes",
          }}
        />

        <Drawer.Screen
          name="articles/create" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: () => null,
            title: "Creer Article",
          }}
        />

        <Drawer.Screen
          name="categories/create"
          options={{
            drawerLabel: () => null,
            title: "Creer Categories",
          }}
        />
        <Drawer.Screen
          name="salles/create"
          options={{
            drawerLabel: () => null,
            title: "Creer Salles",
          }}
        />
        <Drawer.Screen
          name="tables/create"
          options={{
            drawerLabel: () => null,
            title: "Creer Tables",
          }}
        />  
        
        <Drawer.Screen
          name="tables/view/[id]"
          options={{
            drawerLabel: () => null,
            title: "Voir Table",
          }}
        />  

      <Drawer.Screen
          name="commandes/view/[id]"
          options={{
            drawerLabel: () => null,
            title: "Voir Commande",
          }}
        />  
      </Drawer>
    </GestureHandlerRootView>
    // </ThemeProvider>
  );
}
