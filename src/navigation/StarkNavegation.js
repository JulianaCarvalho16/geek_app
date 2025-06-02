import React, { useContext, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DrawerNavigation from "./DrawerNavigation";
import Login from "../screens/Login";
import SplashScreen from "../screens/SplashScreen";
import Auth from "../services/firebase";
import Home from "../screens/Home";

const Stack = createNativeStackNavigator();
export default function StackNavigation() {
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await Auth.checkIfLogin();
      setIsAuthenticated(user!= null);
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  if (isLoading) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
    </Stack.Navigator>
  );
}

  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name= "Home" component={DrawerNavigation} />
    <Stack.Screen name="Drawer" component={DrawerNavigation} options={{ headerShown: false }} />
    </Stack.Navigator>

  );
}
