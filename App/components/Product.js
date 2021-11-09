import React from 'react'
import {  View,Image,TouchableOpacity } from 'react-native'
import {
   
    Text,
    Card,Icon
  } from "@ui-kitten/components";
  import { useNavigation } from '@react-navigation/native';



import colors from '../config/colors';
const Product = ({item}) => {
    const navigation=useNavigation()
    const rating =Math.floor(item.item.rating.rate)
    // console.log("item",(item.item))
    return (
       
        <Card style={{marginVertical:12,marginHorizontal:12,width:"92%",shadowOpacity:0.3,shadowRadius:5}}>
<View style={{flexDirection:"row"}}>
<View style={{marginRight:12}}>
<Image style={{width:80,height:100,resizeMode:"contain",marginBottom:12}} source={{uri: item.item.image}}/>
</View>
 <View style={{width: "75%"}}>
 <Text category='c1'  >{item.item.title}</Text>
<View style={{flexDirection: "row"}}>

{
    Array(rating).fill().map((_,i)=>(
       <Icon key={i} style={{width:24,height:24,marginTop:12}}
       fill="#ffcd3c"
       name='star'
      />
    ))
}
</View>
 <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",width:"95%"}}>
 <Text status='warning'>${item.item.price}</Text>
 <TouchableOpacity
 onPress={()=>navigation.navigate("App",{screen:"ProductDetails", params: item.item })}
 style={{backgroundColor:colors.primary,width:50,height:30,justifyContent:"center",alignItems: "center",borderRadius:6}}>
 <Text style={{color: "#fff"}}>Buy</Text>
 </TouchableOpacity>
 </View>
 </View>

</View>
  
        </Card>
           
    
    )
}

export default Product


