import React from 'react'
import { StyleSheet, View,Image, TouchableOpacity} from 'react-native'
import {
    Text,Card
  } from "@ui-kitten/components";
  import { useDispatch } from 'react-redux';
  import { Feather } from '@expo/vector-icons'; 


  import {addCartItems,removeCartItems} from './../../Store/cartSlice'

const CartItem = ({item}) => {
    const dispatch = useDispatch()

    console.log("cart item",item.item)


    return (
        <View style={{margin:8}}>
        <Card>
        <View style={{flexDirection:"row",width:"100%"}}>
        <Image style={{width:80,height:80,resizeMode:"contain"}} source={{uri: item.item.image}}/>
        <View style={{marginHorizontal:12}}>
      <View style={{width: "98%"}}>
      <Text category="s1" style={{marginBottom:8}}>{item.item.title}</Text>
      </View>
        <Text category="p1">${item.item.itemTotalPrice}</Text>
 <View style={{flexDirection:"row",alignItems: "center"}}>
        <Text category="p1">Quantity:  </Text>
        <TouchableOpacity  
        onPress={()=>dispatch(addCartItems(item.item))}
        style={{paddingHorizontal:2,alignItems: "center",justifyContent: "center"}}>
        <Feather name="plus-circle" size={16} color="#222222" />
      </TouchableOpacity>
        <Text appearance='hint'>{item.item.qty}</Text>
        <TouchableOpacity  
        onPress={()=>dispatch(removeCartItems(item.item))}
        style={{paddingHorizontal:2,alignItems: "center",justifyContent: "center"}}>
        <Feather name="minus-circle" size={16} color="#222222" />
      </TouchableOpacity>
      
 </View>
        
        </View>
        </View>
    </Card>
        </View>
  
    )
}

export default CartItem

const styles = StyleSheet.create({})
