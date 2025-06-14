import { View, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import Pin from '@/components/Pin'
// import pins from '@/assets/data/pins'

// type PinType = {
//   id: string;
//   image: string;
//     title: string;
//   // add other properties of a pin as needed
// };
//
// interface MasonryListProps {
//   pins: PinType[];
//}

interface MasonryListProps {
  pins: {
    id: string;
    image: string;
    title: string;
  }[];
}

export default function MasonryList({ pins }: MasonryListProps) {
  return (
    <ScrollView>
           <View style={styles.container} > 
            <View style={styles.column}>
            {pins.filter((_, index)=>index%2===0).map((pin)=>(<Pin pin={pin} key={pin.id}/>))}
            {pins.filter((_, index)=>index%2!==0).map((pin)=>(<Pin pin={pin} key={pin.id}/>))}

            </View>
            <View style={styles.column}>
            {pins.filter((_, index)=>index%2!==0).map((pin)=>(<Pin pin={pin} key={pin.id}/>))}
            {pins.filter((_, index)=>index%2===0).map((pin)=>(<Pin pin={pin} key={pin.id}/>))}

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