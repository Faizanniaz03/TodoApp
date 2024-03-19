import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Button, primaryColor, regularFont } from '../utils/Styles'
// {title,action,bgColor}
const CustomButton = (props) => {
    return (
    <View>
      <TouchableOpacity style={{
                    borderWidth:2,
                    backgroundColor:primaryColor,
                    borderColor:'#55847A',
                    paddingVertical:10,
                    width:240,
                    borderRadius:20
                }}
                activeOpacity={0.5}
                onPress={props.action}
                >
                    <Text style={{
                        fontFamily:'Poppins-Medium',
                        color:'white',
                        textAlign:'center'
                    }}>
                        {props.title}
                    </Text>
                </TouchableOpacity>
    </View>
  )
}

export default CustomButton

const styles = StyleSheet.create({})