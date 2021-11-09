import React, { useEffect, useState } from "react";
import { FlatList, View, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { Text,Spinner } from "@ui-kitten/components";
import { FontAwesome5 } from "@expo/vector-icons";
import IconBadge from "react-native-icon-badge";
import { useSelector } from "react-redux";

import Product from "../components/Product";

const Products = ({ navigation }) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch("https://fakestoreapi.com/products/");
        const json = await res.json();
        setData(json);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  const total = useSelector((state) => state.cart.totalQty);
  // console.log("data",data)
  // console.log({total})
  return (
    <View style={{ marginTop: Constants.statusBarHeight }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 12,
          marginBottom: 8,
        }}
      >
        <Text category="h5">All Products</Text>

        <View>
          <IconBadge
            MainElement={
              <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                <FontAwesome5 name="shopping-cart" size={24} color="#222222" />
              </TouchableOpacity>
            }
            BadgeElement={<Text style={{ color: "#FFF" }}>{total}</Text>}
            IconBadgeStyle={{
              width: 16,
              height: 16,
              top: -6,
              right: -6,
              backgroundColor: "#ff4c3b",
            }}
            Hidden={total == 0}
          />
        </View>
      </View>
      {isLoading ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 12,
          }}
        >
          <Spinner status="primary" />
        </View>
      ) : (
        <FlatList
          stye={{ flex: 1 }}
          data={data}
          showsVerticalScrollIndicator={false}
          renderItem={(item) => <Product item={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

export default Products;
