import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";
import colors from "../config/colors";
import { MaterialIcons } from '@expo/vector-icons';
import {
  Button,
  Text,
  Card,
  Radio,
  RadioGroup,
  Spinner,
} from "@ui-kitten/components";
import { useSelector } from "react-redux";
import { StripeProvider, useStripe } from "@stripe/stripe-react-native";

import { Base_url } from "./../../config.json";

const Checkout = ({ navigation }) => {
  const items = useSelector((state) => state.cart.cartItems.item);
  const total = useSelector((state) => state.cart.totalPrice);
  const email = useSelector((state) => state.user.user.email);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.user.user.id);
  const total_quantity = useSelector((state) => state.cart.totalQty);
  const stripe = useStripe();

  const [selectedIndex, setSelectedIndex] = useState(0);
  // const [paymentId, setPaymentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState(null);
  console.log({token})
  useEffect(() => {
    const fetchAddress = async () => {
      try {
        setLoading(true);
        const setting = {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await fetch(
          "https://sz-commerce.herokuapp.com/api/user/all-address/"+user,
          setting
        );
        console.log(res)
        const data = await res.json();
        console.log({data})
        setAddress(data.payload);
        console.log({ data });
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchAddress();
  }, []);

  const deleteAddress = async (id) => {
    console.log({ id });
    try {
      const response = await fetch(`${Base_url}/user/delete-address/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const responseJson = await response.json();
      console.log(responseJson);
      if (responseJson.status) {
        Alert.alert("Success", "Address deleted successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const pay = async () => {
    try {
      if (total < 1) return Alert.alert("You cannot donate below 1 USD");
      if(address.length == 0) return Alert.alert("Please Add an Address.")
      const response = await fetch(Base_url + "/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          amount: total,
          email,
        }),
      });
      const data = await response.json();
      var { clientSecret } = data;
      // setPaymentId(data.clientSecret);
      console.log({ data });
      // console.log({ paymentId });
      if (!response.ok) {
        return Alert.alert(data.message);
      }
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: data.clientSecret,
      });
      if (initSheet.error) {
        console.error(initSheet.error);
        return Alert.alert(initSheet.error.message);
      }
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret: data.clientSecret,
      });
      if (presentSheet.error) {
        console.error(presentSheet.error);
        return Alert.alert(presentSheet.error.message);
      } else {
        const response = await fetch(Base_url + "/user/place-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            user,
            total_price: total,
            total_quantity,
            items,
            payment_id: clientSecret,
            address: address[selectedIndex]._id,
          }),
        });
        const data = await response.json();
        console.log({ data });
        if (data.status === "success") {
          Alert.alert("Success", "Order placed successfully");
          navigation.navigate("OrderHistory");
        }
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Payment failed!");
    }
  };
  console.log({ address });
  return (
    <StripeProvider publishableKey="pk_test_51IgSI9F4yeXQYhjtFKzew6gORD643ytYLUt9MLllmanF3ZwaKR3nsWDNJatSXcVZrJ2YRvXQ9RK0c1DxgZ0DNp4c00d0oioKkW">
      <View
        style={{
          marginTop: Constants.statusBarHeight,
          flex: 1,
        }}
      >
        <View style={{ flex: 0.9, paddingHorizontal: 12 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back-sharp" size={24} color="black" />
            </TouchableOpacity>
            <View style={{ width: "80%" }}>
              <Text category="s1"> Order Details</Text>
            </View>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ marginTop: 20 }}>
              <Text category="h6">Select Address</Text>
              {loading && (
                <View
                style={{
                  alignItems: "center"
                }}
                >
                  <Spinner size="tiny" />
                </View>
              )}

              <>
                {address && (
                  <RadioGroup
                    selectedIndex={selectedIndex}
                    onChange={(index) => setSelectedIndex(index)}
                  >
                    {address.map((data) => (
                      <Radio key={data._id}>
                        <Card>
                          <View style={{ width: 290 }}>
                        <View style={{ flexDirection: "row",justifyContent: "space-between"}}>
                          <View>
                          <Text>Street: {data.street}</Text>
                            <Text>
                             City: {data.city},State: {data.state}
                            </Text>
                            <Text>Postal Code : {data.postal_code}</Text>
                            <Text>Phone Number : {data.phone_number}</Text>
                          </View>
                          <TouchableOpacity
                              style={{
                                padding: 8,
                                borderRadius: 10,
                                width: "30%",
                                height: "30%",
                                backgroundColor: "#FF5151",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "row",
                              }}
                              onPress={() => deleteAddress(data._id)}
                            >
                              <MaterialIcons name="delete" size={24} color="#fff" />
                              <Text
                              style={{color: "#fff", marginLeft: 5}}
                              >Delete</Text>
                            </TouchableOpacity>
                        </View>
                       
                          </View>
                        </Card>
                      </Radio>
                    ))}
                  </RadioGroup>
                )}
                <Button
                  onPress={() => navigation.navigate("Address")}
                  status="warning"
                  style={{ marginVertical: 12 }}
                >
                  Add New Address
                </Button>
              </>
              <Text category="h6">Products Details</Text>

              <FlatList
                data={items}
                scrollEnabled={false}
                style={{ marginVertical: 12 }}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <Card>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 10,
                      }}
                    >
                      <Image
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 10,
                          resizeMode: "contain",
                        }}
                        source={{ uri: item.image }}
                      />
                      <View style={{ marginLeft: 20 }}>
                        <View style={{ width: "90%" }}>
                          <Text>{item.title}</Text>
                        </View>
                        <Text>Quantity {item.qty} </Text>
                        <Text>Price : $ {item.itemTotalPrice} </Text>
                      </View>
                    </View>
                  </Card>
                )}
              />
            </View>
          </ScrollView>
        </View>
        <View
          style={{
            flex: 0.1,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            marginBottom: 12,
            backgroundColor: "#F9F9F9",
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          <Text category="s1">Total Price : $ {total}</Text>
          <Button
            status="warning"
            onPress={pay}
            style={{ width: "55%", height: "60%" }}
          >
            Pay $ {total}
          </Button>
        </View>
      </View>
    </StripeProvider>
  );
};

export default Checkout;

const styles = StyleSheet.create({});
