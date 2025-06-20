import { View, Text, StyleSheet, Image, Pressable, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useNhostClient } from '@nhost/react';

interface Pin {
  id: string;
  image: string;
  title: string;
  created_at: string;
  user_id: string;
  user: {
    id: string;
    displayName: string;
    avatarUrl: string;
  };
}

export default function PinScreen() {
  const {id} = useLocalSearchParams();
  const nhost = useNhostClient();
  const [ratio, setRatio] = useState(1);
  const [pin, setPin] = useState<Pin|null>(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const router = useRouter();
  
  const FetchPin = async(id: string|string[]) => {
    setLoading(true); // Set loading to true when starting fetch
    const response = await nhost.graphql.request(`
      query MyQuery {
        pins_by_pk(id: "${id}") {
          created_at
          id
          image
          title
          user {
            avatarUrl
            displayName
            id
          }
          user_id
        }
      }`);
    
    if(response.error){
      Alert.alert("Error fetching pin")
      setPin(null);
    } else{
      setPin(response.data.pins_by_pk)
    }
    setLoading(false); // Set loading to false when fetch completes
  }
  
  useEffect(() => {
    FetchPin(id)
  }, [id])
  
  useEffect(() => {
    if(pin?.image){
      Image.getSize(pin.image, (width, height) => setRatio(width/height))
    }
  }, [pin])

  // Show loading spinner while fetching
  if (loading) {
    return (
      <View style={[{backgroundColor:"white", height:"100%"}, styles.centerContent]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    )
  }

  // Show not found only after loading is complete and pin is null
  if (!pin) {
    return (
      <View style={[styles.root, styles.centerContent]}>
        <Text style={styles.notFoundText}>Pin not found</Text>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name={'chevron-back'} size={35} color={"black"} />
        </Pressable>
      </View>
    )
  }

  return (
    <View style={styles.root}>
      <View style={{height:"100%", backgroundColor:"white", borderTopLeftRadius:15, borderTopRightRadius:15}}>
        <Image source={{uri:pin.image}} style={[styles.image, {aspectRatio:ratio}]}/>
        <Text style={styles.title}>{pin.title}</Text>
      </View>
      <Pressable onPress={() => router.back()} style={styles.backBtn}>
        <Ionicons name={'chevron-back'} size={35} color={"black"} />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    height: "100%",
    backgroundColor: "black",
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    borderRadius: 15,
    backgroundColor: "black",
  },
  title: {
    margin: 10,
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
  },
  backBtn: {
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    padding: 7,
    opacity: 0.9
  },
  loadingText: {
    color: "white",
    marginTop: 10,
    fontSize: 16,
  },
  notFoundText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  }
})