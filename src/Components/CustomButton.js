import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { Button, primaryColor, regularFont } from '../utils/Styles'
// {title,action,bgColor}
const CustomButton = (props) => {
    return (
    <View>
      <View style={{
        alignItems:'center',
        marginTop:20
      }}>
      <TouchableOpacity style={{
                    borderWidth:2,
                    backgroundColor:props.color ? props.color : primaryColor,
                    borderColor:'#55847A',
                    paddingVertical:10,
                    width:240,
                    borderRadius:20
                }}
                activeOpacity={0.5}
                onPress={props.action}
                >
                    {props.loading ? 
                    <ActivityIndicator size={'large'} color={'white'}/>    
                :
                
                    <Text style={{
                        fontFamily:'Poppins-Medium',
                        color:props.text ? props.text : 'white' ,
                        textAlign:'center'
                    }}>
                        {props.title}
                    </Text>
                }
                </TouchableOpacity>
      </View>
    </View>
  )
}

export default CustomButton

const styles = StyleSheet.create({})