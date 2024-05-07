import { StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { primaryColor } from '../utils/Styles'

const Splash = () => {
    const { height, width } = useWindowDimensions()
    return (
        <View style={[styles.masterView, {
            height: height,
            width: width
        }]}>
            <Text style={styles.title}>
                DishSync
            </Text>
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    title: {
        fontSize: 60,
        color: 'white',
        fontFamily: "Outfit-Bold",
        textAlign: 'center'
    },
    masterView: {
        justifyContent: 'center',
        backgroundColor: primaryColor
    }
})