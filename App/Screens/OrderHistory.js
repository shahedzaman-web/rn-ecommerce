import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import Constants from "expo-constants";
import { Button, Text, Card,Spinner } from "@ui-kitten/components";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { FlatList } from "react-native-gesture-handler";

const OrderHistory = ({ navigation }) => {
  const user = useSelector((state) => state.user.user.id);
  const token = useSelector((state) => state.auth.token);
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchOrder = async () => {
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
          "https://sz-commerce.herokuapp.com/api/user/all-order/" + user,
          setting
        );
        console.log({ res });
        const data = await res.json();
        console.log({ data });
        setOrder(data.order);
        console.log({ data });
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchOrder();
  }, []);

  return (
    <View style={{ marginTop: Constants.statusBarHeight, flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>

        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Order History</Text>

        <View />
      </View>
      <View style={{ flex: 1 }}>

        {(order.length === 0 && !loading )&& (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>No Order History</Text>
          </View>
        )} 
        
        {loading ? 
        <View style={{ flexDirection: "row",justifyContent: "center"}}>
 <Spinner />
        </View>
        :
        (
          <FlatList
            data={order}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => (
              <Card>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                    <View style={{ flex: 0.1 }}>
                  <Text>{index + 1}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text>{item.order_date}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text>{item.order_status}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text> Quantity: {item.total_quantity}</Text>
                  </View>
                
                  <View style={{ flex: 1 }}>
                    <Text>$ {item.total_price}</Text>
                  </View>
                </View>

              </Card>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default OrderHistory;

const styles = StyleSheet.create({});
