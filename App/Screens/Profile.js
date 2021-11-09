import * as SecureStore from "expo-secure-store";

import React, { useEffect, useState } from "react";
import { StyleSheet, View ,Image} from "react-native";
import { Button, Text,Card, Avatar } from "@ui-kitten/components";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { EvilIcons } from '@expo/vector-icons';
import jwt_decode from "jwt-decode";
const Profile = ({ navigation }) => {
    const [userInfo, setUserInfo] = useState({});


    const token = useSelector((state) => state.auth.token);

    useEffect(()=>{
        const getUserInfo=()=>{
            var decoded = jwt_decode(token);
            console.log({decoded});
            setUserInfo(decoded);
        }
        getUserInfo();
    },[])
 
  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("token");
    navigation.replace("Auth");
  };
console.log({userInfo})
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text category="h5">Profile</Text>
      </View>
        <View style={{justifyContent: "center",alignItems: "center",margin:12}}>
        <Image source={{uri : "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg"}} style={{width:120,height:120,borderRadius:60}}/>
            </View>
    <View style={{justifyContent:"center",alignItems:"center",marginBottom:12}}>

    <Text category="s1"> Name :{userInfo.fullName}</Text>
         
         <Text category="s1"> Email :{userInfo.email}</Text>
    </View>
               
           
          
           
      <Button style={{margin:4}} status='warning' onPress={() => navigation.navigate("OrderHistory")}>
        Order History
      </Button>
      <Button style={{margin:4}} status='warning' onPress={handleLogout}>Logout </Button>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
