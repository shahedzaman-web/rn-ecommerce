import React, { useState } from "react";
import { Image, View, Alert } from "react-native";
import { Button, Text, Layout, Input, Icon ,Spinner} from "@ui-kitten/components";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";

import { Base_url } from "./../../config.json";
import { useDispatch, useSelector } from "react-redux";
import { storeUserToken } from "./../../Store/authSlice";
import { storeUserInfo } from "../../Store/userSlice";

import { InputPassword } from "../components/InputPassword";
import colors from "../config/colors";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const token =useSelector(state=>state.auth.token)
  //handle signIn
  const handleSignIn = async () => {
    setLoading(true);
    try {
      if (!(email && password)) {
        Alert.alert("Please fill all the fields");
        return;
      }
      const response = await fetch(Base_url + "/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': 'Bearer '+token
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      console.log({ data });
      console.log(data.message)
      if (data.message = "success") {
        setLoading(false);
        await SecureStore.setItemAsync("token", data.token);

        const decoded = jwt_decode(data.token);
        await AsyncStorage.setItem('user', JSON.stringify(decoded))
       

        console.log({ decoded });
        dispatch(storeUserToken(data.token));
        dispatch(
          storeUserInfo({
            user: decoded,
            order: data.order,
            address: data.address,
          })
        );

        navigation.navigate("App", { screen: "Drawer" });
      }
    } catch (err) {
      Alert.alert("Error","Login Failed!");
      setLoading(false);
    }
  };



  return (
    <Layout
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: colors.gray,
      }}
    >
      <View>
        <Image
          style={{ width: 100, height: 100, backgroundColor: colors.gray }}
          source={require("./../assets/logoe.png")}
        />
      </View>
      <Text category="h5" style={{ marginVertical: 12 }}>
        Hey! Sign In
      </Text>
      <Input
        label="Email"
        accessoryLeft={<Icon name="email-outline" />}
        placeholder="Enter your Email"
        autoCapital="none"
        keyboardFocus
        autoCapitalize="none"
        returnKeyType="next"
        keyboardType="email-address"
        value={email}
        onChangeText={(nextValue) => setEmail(nextValue)}
        style={{ marginVertical: 12 }}
      />
      <InputPassword
        value={password}
        onChangeText={(nextValue) => setPassword(nextValue)}
      />
      <View style={{ marginVertical: 20, width: "100%" }}>
        <Button status="warning" style onPress={handleSignIn}>
          Sign In
          {loading && <Spinner size="tiny" />}
        </Button>
      </View>

      {/* <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 12,
        }}
      >
        <View
          style={{
            borderBottom: 1,
            borderBottomColor: "#BABABA",
            borderBottomWidth: 0.5,
            width: "32%",
          }}
        />
        <Text style={{ marginHorizontal: 12 }}>Or Sign In With</Text>
        <View
          style={{
            borderBottom: 1,
            borderBottomColor: "#BABABA",
            borderBottomWidth: 0.5,
            width: "32%",
          }}
        />
      </View> */}

      {/* <View style={{width: "100%"}}> 
   <Button
   onPress={handleGoogleSignIn}
   style={{ marginVertical: 12 }}
   status="primary"
   accessoryLeft={
     <Image
       source={{
         uri: "https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png",
       }}
     />
   }
 >
   Sign In with Google
 </Button>
</View> */}
      <Button
        onPress={() => navigation.navigate("SignUp")}
        appearance="ghost"
        status="basic"
      >
        Don't have an account? Sign Up{" "}
      </Button>
    </Layout>
  );
};

export default Login;
