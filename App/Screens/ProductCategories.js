import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { Text, Card, Icon } from "@ui-kitten/components";

const ProductCategories = ({navigation}) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const url = "https://fakestoreapi.com/products/categories";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        console.log(result);
       
          setData(result);
        
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={{ marginTop: Constants.statusBarHeight }}>
      <View style={{ marginHorizontal: 12 }}>
        <Card style={{ backgroundColor: "#c6c6c6", marginVertical: 12 }}>
          <TouchableOpacity
          onPress={()=>navigation.navigate("App",{screen: "ProductsByCategory", params: data[0]})}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Image
              source={require("./../assets/electronics.jpg")}
              style={{ width: "40%", height: 100, resizeMode: "contain" }}
            />
            <Text style={{ marginHorizontal: 12 }} category="h5">
              Electronics
            </Text>
          </TouchableOpacity>
        </Card>

        <Card style={{ backgroundColor: "#e9e7e8", marginVertical: 12 }}>
          <TouchableOpacity
          onPress={()=>navigation.navigate("App",{screen: "ProductsByCategory", params: data[1]})}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Text style={{ marginHorizontal: 12 }} category="h5">
              Jewelery
            </Text>
            <Image
              source={require("./../assets/earrings-ring.jpg")}
              style={{ width: "40%", height: 100, resizeMode: "contain" }}
            />
          </TouchableOpacity>
        </Card>

        <Card style={{ backgroundColor: "#fdadac", marginVertical: 12 }}>
          <TouchableOpacity
          onPress={()=>navigation.navigate("App",{screen: "ProductsByCategory", params: data[2]})}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Image
              source={require("./../assets/mensCloth.jpg")}
              style={{ width: "40%", height: 100, resizeMode: "contain" }}
            />
            <Text style={{ marginHorizontal: 12 }} category="h5">
              Men's Clothing
            </Text>
          </TouchableOpacity>
        </Card>
        <Card style={{ backgroundColor: "#e1f3f9", marginVertical: 12 }}>
          <TouchableOpacity
          onPress={()=>navigation.navigate("App",{screen: "ProductsByCategory", params: data[3]})}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
          <Text style={{ marginHorizontal: 12 }} category="h5">
          Women's Clothing
        </Text>
            <Image
              source={require("./../assets/womensCloth.jpg")}
              style={{ width: "40%", height: 100, resizeMode: "contain" }}
            />
          
          </TouchableOpacity>
        </Card>
      </View>
    </View>
  );
};

export default ProductCategories;

const styles = StyleSheet.create({});
