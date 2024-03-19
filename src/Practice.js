import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomButton from './Components/CustomButton'

const Practice = () => {
    const handlePress = () =>{
        console.log('Pressed')
    }
  return (
    <View>
        <CustomButton action={handlePress}  bgColor={'green'}title={'SignUp'}/>
        <CustomButton title={'login'}/>
        <CustomButton title={'next'}/>
        <CustomButton title={'skip'}/>

    </View>
  )
}

export default Practice

const styles = StyleSheet.create({})