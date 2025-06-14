import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

export default function Profile() {
  return (
    <View style={styles.container} >
        <Text>hey</Text>
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center",
        padding: 10
    },
    pin:{
        width:"100%",

    },
    title:{
        fontSize:20,
        fontWeight:"bold"
    },
    image:{
        width:"100%",
        height:200
    }
})