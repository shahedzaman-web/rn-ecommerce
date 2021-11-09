import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  Button,
  Text,
  Layout,
  Input,
  Icon,
  Spinner,
} from "@ui-kitten/components";
import Constants from "expo-constants";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { Base_url } from "./../../config.json";
import { ScrollView } from "react-native";

const Address = ({ navigation }) => {
  // street && city,postal_code && phone_number &&user && state
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postal_code, setPostal_code] = useState("");
  const [phone_number, setPhone_number] = useState("");
  const [state, setState] = useState("");
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user.user.id);
  const token = useSelector((state) => state.auth.token);
 

  const handleAddAddress = async () => {
    setLoading(true);
    if (!(street && city && postal_code && phone_number && state)) {
      alert("Please fill all the fields");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(Base_url + "/user/create-address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          street,
          city,
          postal_code,
          phone_number,
          state,
          user,
        }),
      });
      const data = await response.json();
      console.log({data});
      if (data.status == "success") {
        alert("Address added successfully");
        setStreet("");
        setCity("");
        setPostal_code("");
        setPhone_number("");
        setState("");
        setLoading(false);
      }
    } catch (error) {
      console.log({error});
      setLoading(false);
      alert("Something went  wrong!");
    }
  };

  return (
 
   
        <Layout
          style={{
            marginTop: Constants.statusBarHeight,

            height: "100%",
            width: wp("100%"),
            height: hp("100%"),
          }}
        >
          <View
            style={{ flexDirection: "row", marginBottom: 12, width: "96%" }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back-sharp" size={24} color="black" />
              </TouchableOpacity>
              <Text category="s1">Add Address</Text>
            </View>
          </View>
          <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, backgroundColor: "#fff" }}
      >
           <ScrollView
    style={{flex:1}}
    >
          <View style={{ marginHorizontal: 12 }}>
            <Input
              label="State"
              placeholder="Enter State"
              autoCapital="none"
              keyboardFocus
              autoCapitalize="none"
              returnKeyType="next"
              value={state}
              onChangeText={(nextValue) => setState(nextValue)}
              style={{ marginVertical: 12 }}
            />
            <Input
              label="City"
              placeholder="Enter City"
              autoCapital="none"
              keyboardFocus
              autoCapitalize="none"
              returnKeyType="next"
              value={city}
              onChangeText={(nextValue) => setCity(nextValue)}
              style={{ marginVertical: 12 }}
            />
            <Input
              label="Street"
              placeholder="Enter Street"
              autoCapital="none"
              keyboardFocus
              autoCapitalize="none"
              returnKeyType="next"
              value={street}
              onChangeText={(nextValue) => setStreet(nextValue)}
              style={{ marginVertical: 12 }}
            />

            <Input
              label="Postal Code"
              placeholder="Enter Postal Code"
              autoCapital="none"
              keyboardFocus
              autoCapitalize="none"
              keyboardType="number-pad"
              returnKeyType="next"
              value={postal_code}
              onChangeText={(nextValue) => setPostal_code(nextValue)}
              style={{ marginVertical: 12 }}
            />
            <Input
              label="Phone Number"
              placeholder="Enter Phone number"
              autoCapital="none"
              keyboardFocus
              keyboardType="number-pad"
              autoCapitalize="none"
              returnKeyType="next"
              value={phone_number}
              onChangeText={(nextValue) => setPhone_number(nextValue)}
              style={{ marginVertical: 12 }}
            />

            <Button
              style={{ marginTop: 12 }}
              status="warning"
              onPress={handleAddAddress}
            >
              Add
              {loading && <Spinner />}
            </Button>
   
          </View>
          </ScrollView>
      </KeyboardAvoidingView>
        </Layout>
  

  );
};

export default Address;

const styles = StyleSheet.create({});
