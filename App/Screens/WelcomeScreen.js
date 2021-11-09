import React from "react";
import { StyleSheet, View, ImageBackground } from "react-native";
import {
  Button,
  Text,
} from "@ui-kitten/components";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const WelcomeScreen = ({navigation}) => {
  return (
   <View
   style={styles.container}>
      <ImageBackground
      source={require("./../assets/Big_phone_with_cart.jpg")}
      style={styles.backgroundImg}
    >
      <View style={styles.textView}>
        <Text style={{marginVertical:16}} category="s1">Welcome to the Biggest Online Shop</Text>
        <Text  style={{textAlign:"center"}} category="p2">
          Latest Trends in Clothing For Women, Men & kids. At Easiest. Find New
          Arrivals, Fashion Catalogs, Collections & Lookbooks Every Weeks{" "}
        </Text>
        <View style={{marginTop:20,width:"90%"}}> 
        <Button 
        onPress={()=>navigation.navigate("SignUp")}
        status='warning'  >Start</Button>
        </View>
      </View>
    </ImageBackground>
   </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  backgroundImg: {

    width: "100%",
    height: hp('100%'),
    resizeMode: "contain",
  },
  textView: {
    alignItems: "center",
    marginTop: hp('75%'),
    flex: 1,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  
  },
});
