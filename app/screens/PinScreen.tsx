import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import pins from "@/assets/data/pins"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';



export default function PinScreen() {
  const {id} = useLocalSearchParams();
  // Find the pin object by matching the id property
  const pin = pins.find((p) => p.id === id);
  const [ratio, setRatio]=useState(1);
  const router= useRouter();
  
  useEffect(()=>{
          if(pin?.image){
      Image.getSize(pin.image,(width, height)=>setRatio(width/height))
       }
      },[pin])

      if (!pin){
        return(<Text>Pin not found</Text>)
      }
  return (
    <View style={styles.root}>
      <View style={{height:"100%", backgroundColor:"white", borderTopLeftRadius:15, borderTopRightRadius:15}}>
        <Image source={{uri:pin.image}} style={[styles.image, {aspectRatio:ratio}]}/>
      <Text style={styles.title}>{pin.title}</Text>
      </View>
      <Pressable onPress={()=>router.back()} style={styles.backBtn}>
      <Ionicons name={'chevron-back'} size={35} color={"black"} />
      </Pressable>
    </View>
    
  )
}

const styles= StyleSheet.create({
    root:{
      height:"100%",
      backgroundColor:"black",
    },
    image:{
      width:"100%",
      // borderTopLeftRadius:15,
      borderRadius:15,
      backgroundColor:"black",
    },
    title:{
      margin:10,
      fontSize:24,
      fontWeight:"600",
      textAlign:"center",
    },
    backBtn:{
      position:"absolute",
      top:5,
      left:5,
      backgroundColor:"#f0f0f0",
      borderRadius:15,
      display:"flex",
      flexDirection:"row",
      justifyContent:"center",
      padding:7,
      opacity:0.9
    }
})