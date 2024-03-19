
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomButton from '../../Components/CustomButton'
import { Styles } from '../../utils/Styles'


const Home = ({ navigation }) => {

    return (
        <View style={{
            flex: 1,
        }}>
            <View style={Styles.viewOne}></View>
            <View style={Styles.viewTwo}></View>
            <View style={Styles.mainImage}>
                <Image source={require('../../assets/images/todoList1.png')} />
            </View>
            <View style={{
                flex: 0.15,
                marginTop: 20
            }}>
                <Text style={Styles.mainTitle}>
                    Get things done with TODo
                </Text>
            </View>
            <View style={{
                flex: 0.35,
                alignItems: 'center'
            }}>
                <View style={{
                    width: 240
                }}>
                    <Text style={Styles.subTitle}>
                        Lorem ipsum dolor sit amet,
                        consectetur adipisicing. Maxime,
                        tempore! Animi nemo aut atque,
                        deleniti nihil dolorem repellendus.
                    </Text>
                </View>
            </View>
            <View style={{
                flex: 0.3,
                alignItems: 'center'
            }}>
                <CustomButton title={'Get Started'} action={() => navigation.navigate('SignUp')} />
            </View>

        </View>
    )
}

export default Home

const styles = StyleSheet.create({})