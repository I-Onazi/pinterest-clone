import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNhostClient } from '@nhost/react';
//wanted to uset this component to fetch image outside of other screens but it made the loading look bad, so I decided against it
export default function RemoteImage({fileId}: {fileId: string}) {
    const [ratio, setRatio]=useState(1);
    const [imageUri, setImageUri]= useState("")
        const nhost=useNhostClient();
    

    const fetchImageUri=async()=>{
         const result=await nhost.storage.getPresignedUrl({
            fileId
        });
        setImageUri(result.presignedUrl?.url||"")
        console.log("Image URI:", result.presignedUrl?.url);
    }
    useEffect(()=>{
       fetchImageUri();
    },[fileId])
    useEffect(()=>{
            if(imageUri){
        Image.getSize(imageUri,(width, height)=>setRatio(width/height))
         }
        },[imageUri])
    
  return (
    <Image style={[styles.image,{aspectRatio:ratio}]} source={{uri: imageUri}}/>
    
  )
}
const styles=StyleSheet.create({
    image:{
        width:"100%",
        borderRadius:15,
    },
})