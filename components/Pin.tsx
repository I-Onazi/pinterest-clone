import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { useNhostClient } from '@nhost/react';

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
    const nhost=useNhostClient();
    const router=useRouter();
    const {id, image, title} = props.pin;
    const [imageUri, setImageUri]= useState("")
    const onLike=()=>{};
    
    const fetchImageUri=async()=>{
         const result=await nhost.storage.getPresignedUrl({
            fileId: image
        });
        setImageUri(result.presignedUrl?.url||"")
        console.log("Image URI:", result.presignedUrl?.url);
    }
    
    const handlePress = () => {
        console.log("Navigating with imageUri:", imageUri);
        console.log("Navigating with ratio:", ratio);
        
        // Only navigate if we have the imageUri
        if (imageUri) {
            router.push({ 
                pathname: "/screens/PinScreen", 
                params: { 
                    id,
                    imageUri: encodeURIComponent(imageUri), // Encode the URI
                    title,
                    ratio: ratio.toString()
                } 
            });
        } else {
            // Fallback to just passing the id
            router.push({ 
                pathname: "/screens/PinScreen", 
                params: { id } 
            });
        }
    };
    
    useEffect(()=>{
       fetchImageUri();
    },[image])
    
    useEffect(()=>{
        if(imageUri){
            Image.getSize(imageUri,(width, height)=>setRatio(width/height))
        }
    },[imageUri])
    
    return (
        <Pressable onPress={handlePress} style={styles.pin}>
            <View >
                <Image style={[styles.image,{aspectRatio:ratio}]} source={{uri: imageUri}}/>
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
        fontSize:15,
        lineHeight:22,
        fontWeight:"600",
        margin:3,
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