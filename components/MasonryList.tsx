import { View, ScrollView, StyleSheet, useWindowDimensions, RefreshControl } from 'react-native'
import React, { useState } from 'react'
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
  onRefresh?: () => void;
  refreshing?: boolean;
}

export default function MasonryList({ pins,onRefresh, refreshing = false }: MasonryListProps) {

  const width=useWindowDimensions().width;
  const numCol=width<500?2:4;
  // const numCol=Math.floor(width/150) (another method. but personally the above is better)
  console.log(width);
  return (
    <ScrollView refreshControl={<RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#9Bd35A', '#689F38']} // Android
          tintColor="#689F38" // iOS
        />}  showsVerticalScrollIndicator={false}>
           <View style={styles.container} > 
            {Array.from(Array(numCol)).map((_, colIndex)=>(
          <View key={colIndex} style={styles.column}>
          {pins.filter((_, index)=>index%numCol===colIndex).map((pin)=>(<Pin pin={pin} key={pin.id}/>))}
          </View>
            ))}
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