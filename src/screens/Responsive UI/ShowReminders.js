import { FlatList, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { Styles, primaryColor } from '../../utils/Styles';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { DotIndicator } from 'react-native-indicators'
import CustomButton from '../../Components/CustomButton';

const ShowReminders = ({ navigation }) => {
    const [remindersList, setRemindersList] = useState('')
    const [loading, setLoading] = useState(true)
    const getRemindersList = async () => {
        const users = await firestore().collection('Reminders').get()
        // console.log("🚀 ~ getRemindersList ~ users:", users)
        const remindersData = users.docs.map((doc => ({
            id: doc.id,
            ...doc.data()
        })));
        setRemindersList(remindersData)
        setLoading(false)
    }
    const Logout = () => {
        auth()
            .signOut()
            .then(() => {
                navigation.replace('Login')
            })
            .then(() => {
                AsyncStorage.clear()
            })
    }
    useEffect(() => {
        getRemindersList()
    }, [])
    const deleteEntry = async (itemId) => {
        await firestore().collection('Reminders').doc(itemId).delete()
        setRemindersList(newItem => newItem.filter(item => item.id !== itemId))
    }
    const { height, width } = useWindowDimensions()
    return (
        <View style={{
            height: height,
            width: width,
            justifyContent: "center"
        }}>
            <View style={{
                position: 'absolute',
                top: 30,
                left: 20
            }}>
                <TouchableOpacity onPress={() => navigation.navigate('Options')}>
                    <AntDesign name={'left'} size={30} color={primaryColor} />
                </TouchableOpacity>
            </View>
            <Text style={styles.title}>
                Reminder List
            </Text>
            <View style={[styles.secondMainView, { paddingBottom: loading ? 90 : 30 }]} >
                {loading ? <View>
                    <DotIndicator color={'white'} size={10}/>
                </View> :
                    <FlatList
                        data={remindersList}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    paddingRight: 20
                                }}>
                                    <Text style={styles.mainText}> {index + 1} . {item.Reminders}</Text>
                                    <TouchableOpacity onPress={() => deleteEntry(item.id)}>
                                        <AntDesign name={'delete'} size={30} />
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                }
                <View style={{
                    height: '25%',
                }}>
                    <CustomButton action={Logout} title={'Logout'} color={'white'} text={primaryColor}/>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('RemindersList')}>
                    <AntDesign name={'pluscircleo'} size={50} color={'white'}  />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ShowReminders

const styles = StyleSheet.create({
    secondMainView: {
        height: '60%',
        backgroundColor: primaryColor,
        borderRadius: 30,
        marginHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
    },
    mainText: {
        color: 'white',
        fontSize: 30,
        margin: 8,
        fontFamily: 'Outfit-Medium',
    },
    title: {
        color: primaryColor,
        fontFamily: 'Outfit-Bold',
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 30
    }
})