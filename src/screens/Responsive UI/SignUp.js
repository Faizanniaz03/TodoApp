import { Button, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground, KeyboardAvoidingView, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import { Styles } from '../../utils/Styles'
import BackNav from '../../Components/BackNav'
import CustomTI from '../../Components/CustomTI'
import CustomButton from '../../Components/CustomButton'
import CustomTO from '../../Components/CustomTO'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';



const SignUp = ({ navigation }) => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const Login = () => {
        if (name == '') {
            Alert.alert('Please Enter name')
        }
        else if (!email.includes('@gmail.com')) {
            Alert.alert('Email Not Valid')
        }
        else if (password.length < 9) {
            Alert.alert('Password cant be less then 9')
        }
        else {
            navigation.navigate('SignIn')
        }
    }
    const signUp =async () => {
        auth()
.createUserWithEmailAndPassword(email, password)
    await auth().currentUser.sendEmailVerification({
    handleCodeInApp: true,
    url: 'app/email-verification',
   })
            .then(() => {
                navigation.navigate('Addtodo')
            })
            .then(() => {
                setEmail('')
                setName('')
                setConfirmPassword('')
                setPassword('')
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.warn('That email address is already in use!');
                    setEmail('')
                    setName('')
                    setConfirmPassword('')
                    setPassword('')
                }

                if (error.code === 'auth/invalid-email') {
                    console.warn('That email address is invalid!');
                    setEmail('')
                    setName('')
                    setConfirmPassword('')
                    setPassword('')
                }

            });
            
    }
    const { width, height } = useWindowDimensions()
    return (

        <View style={{
            height: height
        }}>
            <KeyboardAvoidingView behavior='position' enabled keyboardVerticalOffset={-50}>
                <View style={Styles.viewOne}></View>
                <View style={Styles.viewTwo}></View>
                <View style={{
                    marginLeft: 20,
                    position: 'absolute',
                    top: 30,
                    left: 10,

                    justifyContent: 'center'
                }}>
                    <BackNav action={() => navigation.goBack()} />
                </View>

                <View style={{
                    justifyContent: 'flex-end',
                    height: '27%'
                    // flex:0.4
                }}>
                    <Text style={Styles.mainTitle}>
                        Welcome Onboard!
                    </Text>
                </View>
                <View style={{
                    // flex:0.25,
                    justifyContent: 'flex-start',
                    marginVertical: 20
                }}>
                    <Text style={Styles.purpose}>
                        Let’s help you meet up your task
                    </Text>
                </View>
                <View style={{
                    height: '9%',
                    justifyContent: "center"
                }}>
                    <CustomTI val={name} onChange={(val) => setName(val)} title={'Enter Your Name'} />
                </View>
                <View style={{
                    // flex:0.2,
                    height: '9%',
                    justifyContent: "center"
                }}>
                    <CustomTI val={email} onChange={(val) => setEmail(val)} title={'Enter Your Email'} />
                </View>
                <View style={{
                    // flex:0.2,
                    height: '9%',
                    justifyContent: "center"
                }}>
                    <CustomTI val={password} onChange={(val) => setPassword(val)} title={'Enter Your Password'} />
                </View>
                <View style={{
                    // flex:0.2,
                    height: '9%',
                    justifyContent: "center"
                }}>
                    <CustomTI val={confirmPassword} onChange={(val) => setConfirmPassword(val)} title={'Confirm Password'} />
                </View>

                <View style={{
                    // flex:0.4,
                    height: '10%',
                    alignItems: 'center',
                    justifyContent: 'flex-end'
                }}>
                    <CustomButton title={'Sign Up'} action={signUp} />
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    height: '15%',
                    marginVertical: 20
                }}>
                    <CustomTO details={'Already Have an Account?'} title={'SignIn'} action={() => navigation.navigate('Login')} />
                </View>
            </KeyboardAvoidingView>
        </View>

    )
}
export default SignUp

const styles = StyleSheet.create({})