import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import {
  ApplicationProvider,
  Layout,
  IconRegistry,
  Spinner,
} from "@ui-kitten/components";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons, AntDesign, Feather } from "@expo/vector-icons";

//navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import WelcomeScreen from "./App/Screens/WelcomeScreen";
import SignUp from "./App/Screens/SignUp";
import Login from "./App/Screens/Login";
import Products from "./App/Screens/Products";
import ProductDetails from "./App/Screens/ProductDetails";
import ProductCategories from "./App/Screens/ProductCategories";

//redux
import { store } from "./Store/store";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { storeUserToken } from "./Store/authSlice";
import Cart from "./App/Screens/Cart";
import Profile from "./App/Screens/Profile";
import ProductsByCategory from "./App/Screens/ProductsByCategory";
import { storeUserInfo } from "./Store/userSlice";
import Address from "./App/Screens/Address";
import Checkout from "./App/Screens/Checkout";
import OrderHistory from "./App/Screens/OrderHistory";

const Tab = createBottomTabNavigator();
const TabScreen = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        options={{
          tabBarLabel: "Products",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
        name="Products"
        component={Products}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Product Category",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="appstore-o" size={size} color={color} />
          ),
        }}
        name="ProductCategories"
        component={ProductCategories}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Cart",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="shoppingcart" size={size} color={color} />
          ),
        }}
        name="Cart"
        component={Cart}
      />

      <Tab.Screen
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};

const Drawer = createDrawerNavigator();
const DrawerScreen = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerPosition: "left",
      }}
      headerMode="none"
      initialRouteName="Tab"
    >
      <Drawer.Screen
        options={{ drawerLabel: "Products" }}
        name="Tab"
        component={TabScreen}
      />
    </Drawer.Navigator>
  );
};

const AppStack = createNativeStackNavigator();

const AppScreen = () => {
  return (
    <AppStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Drawer"
    >
      <AppStack.Screen name="Drawer" component={DrawerScreen} />
      <AppStack.Screen name="ProductDetails" component={ProductDetails} />
      <AppStack.Screen
        name="ProductsByCategory"
        component={ProductsByCategory}
      />
      <AppStack.Screen name="Address" component={Address} />
      <AppStack.Screen name="Checkout" component={Checkout} />
      <AppStack.Screen name="OrderHistory" component={OrderHistory} />
    </AppStack.Navigator>
  );
};

const Auth = createNativeStackNavigator();
const AuthScreen = () => {
  return (
    <Auth.Navigator screenOptions={{ headerShown: false }}>
      <Auth.Screen name="Welcome" component={WelcomeScreen} />
      <Auth.Screen name="SignUp" component={SignUp} />
      <Auth.Screen name="Login" component={Login} />
    </Auth.Navigator>
  );
};

const Root = createNativeStackNavigator();
const RootScreen = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUserFunction = async () => {
      try {
        let result = await SecureStore.getItemAsync("token");
        let user = await AsyncStorage.getItem("user");

 

        dispatch(storeUserToken(result));
        dispatch(
          storeUserInfo({
            user: JSON.parse(user),
          })
        );
      } catch (e) {
        console.log(e);
      }
    };
    setTimeout(() => {
      setLoading(false);
    }, 2500);
    getUserFunction();
  }, []);

  const token = useSelector((state) => state.auth.token);
  console.log("app user", token);
  if (loading) {
    return (
      <Layout
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Spinner />
      </Layout>
    );
  }

  return (
    <NavigationContainer>
      <Root.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={token ? "App" : "Auth"}
      >
        <Root.Screen name="Auth" component={AuthScreen} />
        <Root.Screen name="App" component={AppScreen} />
      </Root.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <RootScreen />
      </ApplicationProvider>
    </Provider>
  );
}
