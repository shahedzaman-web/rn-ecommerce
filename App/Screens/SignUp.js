import React, { useState,useEffect } from "react";
import { StyleSheet, Image, View,Platform,TouchableOpacity,ImageBackground,Alert ,StatusBar} from "react-native";
import { registerRootComponent } from "expo";
import { Button, Text, Layout, Input, Icon,Spinner } from "@ui-kitten/components";
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons'; 
import { InputPassword } from "../components/InputPassword";
import jwt_decode from "jwt-decode";
import colors from "../config/colors";

import { Base_url} from "./../../config.json"
import { useSelector, useDispatch } from 'react-redux'
import {storeUserToken} from "./../../Store/authSlice"
import { storeUser } from "../../Store/userSlice";


const SignUp = ({navigation}) => {
  //redux loginSelector
  const user =useSelector((state) => state.auth.user)

  const dispatch = useDispatch()
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const [image, setImage] = useState(null);


   const checkCameraPermission =  async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    }
 
  const pickImage = async () => {
    checkCameraPermission()
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  //handle sign up
  const handleSignup = async() => {
    if(!(fullName  && email && password && image)){
      alert("Please fill all the fields")
      return
    }
    setLoading(true)
    const formData= new FormData();

    formData.append("image", {
      type: "image/jpg",
      uri: image,
      name: "profile.jpg",
    });
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("password", password);
    console.log({formData})
    const settings = {
      method: 'POST',
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
      body: formData,
  };

     const res =   await  fetch(Base_url+"/auth/register", settings)
     const data = await res.json()
      console.log(data)
      if(data.message === "success"){ 
        setLoading(false)
        Alert.alert("Success", "You have successfully registered")
        await SecureStore.setItemAsync("token", data.token);
        const decoded = jwt_decode(data.token);
        dispatch(storeUserToken(data.token))
        dispatch(storeUser(decoded))
        navigation.navigate("App",{screen:"Drawer"})
      }
    else{
        setLoading(false)
        alert(data.message)
      }
    }

  


  return (
    <Layout
      style={{
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        marginTop: StatusBar.currentHeight,
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
        Hey! Sign Up
      </Text>

{!image ?  <View style={{justifyContent:"center",alignItems:"center"}}>
    
  <ImageBackground style={{width:100,height:100,borderRadius:50}}  source={require('../assets/profile.png')}>
 <View style={{alignItems: "center",justifyContent:"center",position: "absolute",bottom:1,left: "40%",}}>
 <TouchableOpacity
 onPress={pickImage}
 style={{alignItems: "center",justifyContent:"center",alignSelf:"center"}}>
      <Feather name="camera" size={24} color={colors.primary}/>
      </TouchableOpacity>
 </View>
      </ImageBackground>
    </View> 
    : 
    <View style={{justifyContent:"center",alignItems:"center"}}>
    
    <Image style={{width:100,height:100,borderRadius:50}}    source={{ uri: image }}/>
  
      </View>
    
    }  
    <Input
        label="Full Name"
        accessoryLeft={<Icon name="person-outline" />}
        placeholder="Enter your full Name"
        autoCapital="none"
        keyboardFocus
        autoCapitalize="none"
        returnKeyType="next"
        keyboardType="email-address"
        value={fullName}
        onChangeText={(nextValue) => setFullName(nextValue)}
        style={{ marginVertical: 12 }}
      />

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
      <View style={{marginVertical: 20,width: "100%"}}>
      
      <Button
      
      status="warning"
 
      onPress={handleSignup}
      >
   {loading &&   <Spinner/>}
      Sign Up
      </Button>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 12,
        }}
      >
        {/* <View
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
      </View>

   <View style={{width: "100%"}}>  */}
   {/* <Button
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
 </Button> */}
   </View>

      <Button
      onPress={()=>navigation.navigate("Login")}
      appearance="ghost" status="basic">
        Already have an account? Sign In{" "}
      </Button>
    </Layout>
  );
};

export default SignUp;
registerRootComponent(SignUp);
const styles = StyleSheet.create({});
