import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { black, primaryColor } from '../../utils/Styles'

const Option = ({navigation}) => {
    const { height, width } = useWindowDimensions()
    return (
        <View style={{
            height: height,
        }}>
            <TouchableOpacity style={{
                height:'30%',
                
            }} activeOpacity={0.8} onPress={()=>navigation.navigate('Dashboard')}>
            <View style={{
                height:'100%',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 20,
                borderColor:primaryColor,
                borderWidth:2,
                backgroundColor:primaryColor,
                borderRadius:30,

            }}>
                <Text style={{
                    color:'white',
                    fontSize:35,
                    fontFamily:'Outfit-Medium'
                }}>
                    Todo List
                </Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity style={{
                height:'30%',
                marginTop:15
                
            }} activeOpacity={0.8} onPress={()=>navigation.navigate('RemindersList')}>
            <View style={{
                height:'100%',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 20,
                borderColor:primaryColor,
                borderWidth:2,
                backgroundColor:primaryColor,
                borderRadius:30,

            }}>
                <Text style={{
                    color:'white',
                    fontSize:35,
                    fontFamily:'Outfit-Medium'
                }}>
                    Reminders
                </Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity style={{
                height:'30%',
                marginTop:15
            }} activeOpacity={0.8} onPress={()=>navigation.navigate('RecipesList')}>
            <View style={{
                height:'100%',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 20,
                borderColor:primaryColor,
                borderWidth:2,
                backgroundColor:primaryColor,
                borderRadius:30,

            }}>
                <Text style={{
                    color:'white',
                    fontSize:35,
                    fontFamily:'Outfit-Medium'
                }}>
                    Recipes
                </Text>
            </View>
            </TouchableOpacity>
        </View>
    )
}

export default Option

const styles = StyleSheet.create({})