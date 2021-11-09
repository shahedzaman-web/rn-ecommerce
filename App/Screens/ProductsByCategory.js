import React, { useEffect, useState } from 'react'
import {  View,FlatList,TouchableOpacity } from 'react-native'
import Constants from 'expo-constants';
import {Text,Spinner} from '@ui-kitten/components';
import { Ionicons } from '@expo/vector-icons'; 
import Product from '../components/Product'

const ProductsByCategory = ({route,navigation}) => {
    console.log("route", route.params)
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const fetchData= async() => {
            try{    
                setLoading(true)
                    const response = await fetch(`https://fakestoreapi.com/products/category/${route.params}`)
                    const json = await response.json()
                    setData(json)
                    setLoading(false)
            }
            
            catch(error){
                console.log(error)
                setLoading(false)
            }
        }
        fetchData()
    }, [route.params]);
console.log("data",data)

    return (
        <View style={{marginTop:Constants.statusBarHeight}}>
        <View style={{flexDirection: "row",alignItems: "center",justifyContent: "space-between"}}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Ionicons name="arrow-back-sharp" size={24} color="black" />
        </TouchableOpacity> 
        <Text category="h6" style={{textTransform: "uppercase",textAlign:"center"}}>{route.params}</Text>
        <View/>
        </View>
        {
            loading ? 
            <View style={{marginTop: 12 ,justifyContent: 'center',alignItems: 'center'}}>
                <Spinner  status="primary"/>
            </View>
            :
            <FlatList
            stye={{flex:1}}
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={(item)=><Product item={item}/>}
            keyExtractor={(item)=>item.id.toString()}
            />
        }
       
        </View>
    )
}


export default ProductsByCategory

