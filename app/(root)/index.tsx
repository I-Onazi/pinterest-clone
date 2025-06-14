import { View, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import Pin from '@/components/Pin'
import pins from '@/assets/data/pins'


export default function Index() {
  return (
    <ScrollView>
       <View style={styles.container} > 
        <View style={styles.column}>
         {pins.filter((_, index)=>index%2===0).map((pin)=>(<Pin pin={pin} key={pin.id}/>))}
        </View>
        <View style={styles.column}>
        {pins.filter((_, index)=>index%2!==0).map((pin)=>(<Pin pin={pin} key={pin.id}/>))}
        </View>
    </View>
    </ScrollView> 
   
  )
}

const styles=StyleSheet.create({
    container:{
        // flex:1,
        // alignItems:"center",
        // justifyContent:"center",
        padding: 10,
        flexDirection:"row",
    },
    column:{
      flex:1,
    }
})