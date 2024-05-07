import { StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React from 'react'
import { black, primaryColor } from '../../utils/Styles'
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Option = ({ navigation }) => {
    const { height, width } = useWindowDimensions()
    const Logout = () => {
        auth()
            .signOut()
            .then(() => {
                AsyncStorage.clear()
                navigation.replace('Login')
            })
    }
    return (
        <View style={{
            height: height,
            width: width
        }}>
            <View style={styles.firstView}>
                <Text style={styles.headerTitle}>Welcome!</Text>
            </View>
            <View style={styles.screensView}>
                <TouchableOpacity style={styles.components} activeOpacity={0.8} onPress={() => navigation.navigate('Dashboard')}>
                    <View style={styles.individualComponents}>
                        <Text style={styles.componentsTitle}>
                            Todo List
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.components} activeOpacity={0.8} onPress={() => navigation.navigate('RemindersList')}>
                    <View style={styles.individualComponents}>
                        <Text style={styles.componentsTitle}>
                            Reminders
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.components} activeOpacity={0.8} onPress={() => navigation.navigate('RecipesList')}>
                    <View style={styles.individualComponents}>
                        <Text style={styles.componentsTitle}>
                            Recipes
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.LogoutView}>
                <TouchableOpacity style={styles.LogoutOpacity} activeOpacity={0.8} onPress={Logout}>
                    <View style={styles.LogoutButton}>
                        <Text style={[styles.componentsTitle, { color: primaryColor }]}>
                            Logout
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Option

const styles = StyleSheet.create({
    firstView: {
        height: '25%',
        justifyContent: "flex-end"
    },
    headerTitle: {
        fontSize: 45,
        textAlign: 'center',
        fontFamily: 'Outfit-Bold',
        color: primaryColor
    },
    LogoutView:{
        height: '60%',
        justifyContent: 'flex-start'
    },
    screensView: {
        justifyContent: 'flex-start',
        height: '60%'
    },
    components: {
        height: '10%',
        marginTop: 15
    },
    LogoutOpacity: {
        height: '8%',
        marginTop: 15,
        width: '50%',
        alignSelf: 'center'
    },
    individualComponents: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        borderColor: primaryColor,
        borderWidth: 2,
        backgroundColor: primaryColor,
        borderRadius: 30,
    },
    LogoutButton: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        borderColor: primaryColor,
        borderWidth: 2,
        backgroundColor: 'white',
        borderRadius: 30,
    },
    componentsTitle: {
        color: 'white',
        fontSize: 25,
        fontFamily: 'Outfit-Medium'
    }


})