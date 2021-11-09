import React from 'react'
import {  View,Image,TouchableOpacity } from 'react-native'
import {
    Button,
    Text,
Icon
  } from "@ui-kitten/components";
  import { Ionicons, FontAwesome5 } from '@expo/vector-icons'; 
import Constants from 'expo-constants';
import { useDispatch,useSelector} from 'react-redux'
import {addCartItems} from "./../../Store/cartSlice"
import  IconBadge  from 'react-native-icon-badge';


const ProductDetails = ({route,navigation}) => {
    const total =useSelector((state)=> state.cart.totalQty)
  
    
    const data=route.params 
    const rating = Math.floor(data.rating.rate)
    

     const dispatch =useDispatch()

    return (
        <View style={{marginTop:Constants.statusBarHeight,flex:1}}>
        <View style={{flexDirection:"row",alignItems: "center",marginBottom:12,width: "96%",justifyContent: "space-between"}}>
      <View style={{flexDirection:"row",alignItems: "center",}}>
      <TouchableOpacity onPress={()=>navigation.goBack()}>
      <Ionicons name="arrow-back-sharp" size={24} color="black" />
      </TouchableOpacity>
      <View style={{width:"80%"}}>
      <Text category="s1">{data.title} </Text>
      </View>
      </View>
        <View>
        <IconBadge
    MainElement={
      <TouchableOpacity
      onPress={()=>navigation.navigate("Tab",{screen:"Cart"})}
      >
      <FontAwesome5 name="shopping-cart" size={24} color="#222222" />
      </TouchableOpacity>
    }
    BadgeElement={
      <Text style={{color:'#FFF'}}>{total}</Text>
    }
    IconBadgeStyle={
      {width:16,
      height:16,
      top:-6,
  right:-6,
      backgroundColor: '#ff4c3b'}
    }
    Hidden={total==0}
    />
        </View>
        </View>
        

        <View style={{width:"100%",flex:0.5}}>
        <Image source={{uri: data.image}}  style={{width:"100%",height: "100%",resizeMode: "contain"}}/>
        </View>
        <View style={{marginHorizontal:12,paddingTop:24,flex:0.2}}>

        <Text category="h6">{data.title}</Text>
        <Text category="c1" appearance='hint' style={{marginVertical:12}}>{data.description}</Text>
        <View style={{flexDirection:"row",alignItems: "center"}}>
        {
        Array(rating).fill().map((_,i)=>(
         <Icon key={i} style={{width:24,height:24,alignItems: "center"}}
         fill="#ffcd3c"
         name='star'
        />
        ))
        }
        <Text category="c1" appearance='hint' >(rating{data.rating.count})</Text>
        
        </View>
        <Text style={{marginVertical:12}} category="h5" >${data.price}</Text>
        <Button
        onPress={()=>dispatch(addCartItems(data))}
        accessoryLeft={<Icon name="shopping-cart-outline"/>} >Add to Cart</Button>
        </View>
        </View>
    )
}

export default ProductDetails


