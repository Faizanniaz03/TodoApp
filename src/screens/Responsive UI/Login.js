import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, KeyboardAvoidingView, ScrollView, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import Modal from "react-native-modal"
import { Styles } from '../../utils/Styles'
import CustomTI from '../../Components/CustomTI'
import CustomButton from '../../Components/CustomButton'
import CustomTO from '../../Components/CustomTO'
import auth from '@react-native-firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Login = ({ navigation }) => {
  const [modal, showModal] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [NewStateLogin, setNewStateLogin] = useState('true')
  const Login = () => {
    // console.log('Hello')
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User has been loged in')
        navigation.replace('Options')
        AsyncStorage.setItem('@Login', NewStateLogin)
      })

      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          console.warn(
            'user not found'
          )
        }
        else if (error.code === 'auth/invalid-credential') {
          console.warn('Email or Password is invalid')
          setEmail('')
          setPassword('')
        }
        console.log(error)
      })
  }
  const { width, height } = useWindowDimensions();
  return (

    <ScrollView contentContainerStyle={{
      height: height
    }}>
      <Modal isVisible={modal} hasBackdrop={true} backdropColor={"black"} backdropOpacity={0.35} onBackButtonPress={() => showModal(false)} animationOut={"slideOutDown"} animationIn={'slideInUp'} animationInTiming={1000} animationOutTiming={3000} onBackdropPress={() => showModal(false)} >

        <View style={{
          backgroundColor: 'grey',
          height: '50%',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 50,
        }}>
          <View style={Styles.TI}>
            <CustomTI title={'New Password'} />
          </View>
          <View style={Styles.TI}>
            <CustomTI title={'Confirm New password'} />
          </View>
          <CustomButton title={'Close'} action={() => showModal(false)} />

        </View>
      </Modal>
      <View style={Styles.viewOne}></View>
      <View style={Styles.viewTwo}></View>
      <KeyboardAvoidingView behavior='position' enabled keyboardVerticalOffset={-40}>
        <View style={{
          justifyContent: 'flex-end',
          height: '18%'
        }}>
          <Text style={Styles.MainText}>
            Welcome Back!
          </Text>
        </View>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '35%'
        }}>
          <Image source={require('../../assets/images/todoList2.png')} style={{ height: 250, width: 200 }} />
        </View>
        <View style={{
          height: '10%',
          justifyContent: "center"
        }}>
          <CustomTI val={email} onChange={(val) => setEmail(val)} title={'Enter Email Address'} />
        </View>
        <View style={{
          height: '8%',
          justifyContent: "center"
        }}>
          <CustomTI val={password} onChange={(val) => setPassword(val)} title={'Enter Password'} />
        </View>
        <View style={{
          height: '10%',
          justifyContent: 'center'
        }}>
          <TouchableOpacity onPress={() => showModal(true)}>
            <Text style={Styles.forgot}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{
          height: '8%',
          alignItems: 'center',
          justifyContent: 'flex-start'
        }}>
          <CustomButton title={'Login'} action={Login} />
        </View>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '3%'
        }}>
          <CustomTO details={'Dont have an account?'} title={'Sign Up'} action={() => navigation.navigate('SignUp')} />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default Login

const styles = StyleSheet.create({})