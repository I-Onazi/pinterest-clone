import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';

interface PinData {
    image: string;
    title: string;
    id: string;
}

interface PinProps {
    pin: PinData;
}

export default function Pin(props: PinProps) {
    const [ratio, setRatio]=useState(1);
    const router=useRouter();
    const {id, image, title} = props.pin;
    const onLike=()=>{};
    useEffect(()=>{
        if(image){
    Image.getSize(image,(width, height)=>setRatio(width/height))
     }
    },[image])
    return (
        <Pressable onPress={()=>router.push({ pathname: "/screens/PinScreen", params: { id } })} style={styles.pin}>
            <View >
                <Image style={[styles.image,{aspectRatio:ratio}]} source={{uri: image}}/>
            <Pressable onPress={onLike} style={styles.heartBtn}>
            <AntDesign name="hearto" size={16} color="black" />
            </Pressable>
            </View>
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
        </Pressable>
    )
}
const styles=StyleSheet.create({
    pin:{
        width:"100%",
        padding:3
    },
    title:{
        fontSize:15,//he used 16
        lineHeight:22,
        fontWeight:"600",
        margin:3,//he used 5
        color:"#181818"
    },
    image:{
        width:"100%",
        borderRadius:15,
    },
    heartBtn:{
    backgroundColor:"#D3CFD4",
    position: "absolute",
    bottom: 10,
    right: 10,
    padding: 5,
    borderRadius:50
    }
})