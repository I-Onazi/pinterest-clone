import React, { useEffect, useState } from 'react'
// import pins from '@/assets/data/pins'
import MasonryList from '@/components/MasonryList'
import { useNhostClient } from '@nhost/react'
import { Alert } from 'react-native';



export default function Index() {

  const nhost=useNhostClient();
  const [pins, setPins] = useState([]);
  const FetchPins=async()=>{
    const response = await nhost.graphql.request(`
      query MyQuery {
  pins {
    created_at
    id
    image
    title
    user_id
  }
}`

    );
    if(response.error){
      Alert.alert("error fetching pins")
    }else{
      setPins(response.data.pins)
    }
    console.log(response)
  }

  useEffect(()=>{
    FetchPins();
  },[])
  return (
    <MasonryList pins={pins}/>
  )
}

