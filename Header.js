import { View, Text } from 'react-native'
import React from 'react'

const Header = (props) => {
  return (
    <View style={{margin:15}}>
      <Text style={{fontSize:30,fontWeight:'bold',color:'white'}}>{props.name}</Text>
    </View>
  )
}

export default Header