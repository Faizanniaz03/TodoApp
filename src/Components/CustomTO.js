import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { primaryColor } from '../utils/Styles'

const CustomTO = ({title,action,details}) => {
  return (
    <View>
        
                <Text style={{
                    fontFamily:'Poppins-Medium',
                    color:'black',
                }}>
                  {details} 
                <TouchableOpacity activeOpacity={0.4} onPress={action} style={{
                }}>
                <Text style={{
                    color:primaryColor,
                    fontFamily:'Poppins-Medium',
                }}>
                  {title}
                </Text>
            </TouchableOpacity>
            </Text>
                
    </View>
  )
}

export default CustomTO

const styles = StyleSheet.create({})