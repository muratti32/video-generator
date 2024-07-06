import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Main = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white" >
      <Text className="text-4xl font-pextrabold" >Main</Text>
      <Link href='(tabs)/home'>Home</Link>
    </View>
  )
}

export default Main

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})