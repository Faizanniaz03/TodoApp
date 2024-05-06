import { StyleSheet, Text, View, useWindowDimensions, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { primaryColor } from '../../utils/Styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { DotIndicator } from 'react-native-indicators'
import CustomButton from '../../Components/CustomButton'
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ShowRecipe = ({navigation}) => {
    const [recipeList, setRecipeList] = useState('')
    const [loading, setLoading] = useState(true)
    const getRecipeList = async () => {
        const users = await firestore().collection('Recipes').get()
        const remindersData = users.docs.map((doc => ({
            id: doc.id,
            ...doc.data()
        })));
        setRecipeList(remindersData)
        setLoading(false)
    }
    const deleteEntry = async (itemId) => {
        await firestore().collection('Recipes').doc(itemId).delete()
        setRecipeList(newItem => newItem.filter(item => item.id !== itemId))
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
        getRecipeList()
    }, [])
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
                Recipe List
            </Text>
            <View style={[styles.secondMainView, { paddingBottom: loading ? 90 : 30 }]} >
                {loading ? <View>
                    <DotIndicator color={'white'} size={10} />
                </View> :
                    <FlatList
                    showsVerticalScrollIndicator={false}
                        data={recipeList}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{
                                    justifyContent: 'space-between',
                                    paddingRight: 20
                                }}>
                                    <Text style={styles.mainText}> {index + 1} . {item.Recipe}</Text>
                                    <View>
                                        <Text style={[styles.description, { color: '#2a423d' }]}> Description:</Text>
                                        <Text style={styles.description}> {item.Description}</Text>
                                    </View>
                                    <View>
                                        <Text style={[styles.description, { color: '#2a423d' }]}>Ingredients:</Text>
                                        <Text style={styles.description}>{item.Ingredients}</Text>
                                    </View>
                                    <CustomButton title={'Delete'} action={() => deleteEntry(item.id)} color={'#334f49'} text={'white'} />
                                </View>
                            )
                        }}
                    />
                }
                <View style={{
                    height: '25%',
                }}>
                    <CustomButton action={Logout} title={'Logout'} color={'white'} text={primaryColor} />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('RecipesList')}>
                    <AntDesign name={'pluscircleo'} size={50} color={'white'} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ShowRecipe

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
    description: {
        color: 'white',
        fontSize: 20,
        margin: 8,
        fontFamily: 'Outfit-Medium',
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