import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { Text, Button } from "@ui-kitten/components";
import { useSelector } from "react-redux";
import Constants from "expo-constants";
import { FontAwesome5 } from "@expo/vector-icons";
import IconBadge from "react-native-icon-badge";
import CartItem from "../components/CartItem";

const Cart = ({ navigation }) => {
  const items = useSelector((state) => state.cart.cartItems.item);
  const totalQty = useSelector((state) => state.cart.totalQty);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  console.log({ items });

  return (
    <View style={{ marginTop: Constants.statusBarHeight, flex: 1 }}>
      <View style={{ flex: 0.9 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: 12,
            marginBottom: 8,
          }}
        >
          <Text category="h5"> Cart</Text>
          <View>
            <IconBadge
              MainElement={
                <FontAwesome5 name="shopping-cart" size={24} color="#222222" />
              }
              BadgeElement={<Text style={{ color: "#FFF" }}>{totalQty}</Text>}
              IconBadgeStyle={{
                width: 16,
                height: 16,
                top: -6,
                right: -6,
                backgroundColor: "#ff4c3b",
              }}
              Hidden={totalQty == 0}
            />
          </View>
        </View>
        <View>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id.toString()}
            renderItem={(item) => <CartItem item={item} />}
          />
        </View>
      </View>
{(items.length > 0) &&      <View
        style={{
          flex: 0.1,
          backgroundColor: "#EDEFF9",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View>
          <Text>Total: $ {totalPrice}</Text>
        </View>
        <Button
          status="warning"
          style={{ width: "55%" }}
          onPress={() => navigation.navigate("App", { screen: "Checkout" })}
        >
          Place Order
        </Button>
      </View>}
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({});
