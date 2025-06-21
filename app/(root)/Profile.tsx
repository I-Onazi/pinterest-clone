import { View, Text, StyleSheet, Image, ScrollView, Pressable, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import MasonryList from '@/components/MasonryList'
import pins from '@/assets/data/pins'
import {Entypo, Feather} from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { useNhostClient, useUserId } from '@nhost/react';

interface UserData {
  id: string;
  avatarUrl: string;
  displayName: string;
  pins: {
    id: string;
    image: string;
    title: string;
  }[];
}

const GET_USER_QUERY = `
query MyQuery($id: uuid!) {
  user(id: $id) {
    id
    avatarUrl
    displayName
    pins {
      id
      image
      title
    }
  }
}`   
export default function Profile() {
   const { signOut, user, isAuthenticated } = useAuth();
   const [userI, setUserI]=useState<UserData|null>();
   const [refreshing, setRefreshing] = useState(false);
   const userId = useUserId();
   const nhost= useNhostClient();

   const fetchUserData=async()=>{
        const result = await nhost.graphql.request(GET_USER_QUERY,{id:userId})
        console.log(result)
        if(result.error){
            Alert.alert("Error fetching the user");
        }else{
            setUserI(result.data.user);
        }
   }
   
   useEffect(()=>{
    if(userId && isAuthenticated){
        fetchUserData();
    }
   },[userId, isAuthenticated])
   if(!userI){
    return <ActivityIndicator/>
   }


    console.log('Profile - User:', user?.email, 'IsAuth:', isAuthenticated);

    const handleSignOut = async () => {
        console.log('Before sign out - IsAuth:', isAuthenticated);
        try {
            await signOut();
            
            console.log('After sign out - should redirect automatically');
        } catch (error) {
            console.error('Sign out failed:', error);
        }
    };
  return (
    <ScrollView style={styles.container} >
       <View style={styles.header}>
        <View style={styles.icons}>
        <Pressable onPress={handleSignOut}>
            <Feather name="share" size={24} color="black" style={styles.icon} />
        </Pressable>
        <Entypo name="dots-three-horizontal" size={24} color="black" style={styles.icon}/>
        </View>
         <Image source={{uri:userI?.avatarUrl}} style={styles.image}/>
        <Text style={styles.title}>{userI?.displayName}</Text>
        <Text style={styles.subtitle}>123 Followers | 534 Followings</Text>
       </View>
    <MasonryList pins={userI?.pins} onRefresh={fetchUserData} refreshing={refreshing}/>
    </ScrollView>
  )
}

const styles=StyleSheet.create({
    container:{
        // flex:1,
        width:"100%",
    },
    pin:{
        width:"100%",

    },
    title:{
        fontSize:20,
        fontWeight:"bold",
        margin:10
    },
    image:{
        width:200,
        aspectRatio:1,
        borderRadius:200,
        marginVertical:10
    },
    subtitle:{
        color:"#181818",
        fontWeight:"600",
        margin:10
    },
    header:{
        alignItems:"center",
    },
    icons:{
        flexDirection: "row",
        alignSelf:"flex-end",
        padding:10
    },
    icon:{
        paddingHorizontal:10
    }
})