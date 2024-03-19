import { StyleSheet, Text, View,TextInput } from 'react-native'
import React from 'react'
import { black } from '../utils/Styles'

const CustomTI = ({onChange,val,title}) => {
  return (
    <View>
         
            <TextInput placeholder={title} style={{
                borderRadius:10,
                backgroundColor:'white',
                marginHorizontal:15,
                paddingLeft:20,
                fontFamily:'Poppins-Medium'
            }} placeholderTextColor={black}
            onChangeText={onChange}
            value={val}
            />
    </View>
  )
}

export default CustomTI

const styles = StyleSheet.create({})