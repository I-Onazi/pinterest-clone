import React from 'react'
import pins from '@/assets/data/pins'
import MasonryList from '@/components/MasonryList'


export default function Index() {
  return (
    <MasonryList pins={pins}/>
  )
}

