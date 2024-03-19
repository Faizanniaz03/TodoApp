import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Alert, KeyboardAvoidingView, Modal, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Feather from 'react-native-vector-icons/Feather'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Styles } from '../../utils/Styles'
import BackNav from '../../Components/BackNav'
import CustomButton from '../../Components/CustomButton'
import CustomTI from '../../Components/CustomTI'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore';
import { launchCamera } from 'react-native-image-picker';
import { launchImageLibrary } from 'react-native-image-picker';


const AddtoDO = ({ navigation }) => {
  const [title, setTitle] = useState('')
  const [selectedImage, setSelectedImage] = useState('')
  console.log("🚀 ~ AddtoDO ~ selectedImage:", selectedImage)
  const Logout = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('Login')
      })
      .then(()=>{
        AsyncStorage.clear()
      })
  }
  handleCameraLaunch = ()=>{
    const options = {
      mediaType:'photo',
      includeBase64:false,
      maxheight:2000,
      maxwidth:2000
    }
  
  launchCamera(options,response=>{
    if (response.didCancel) {
    console.log('User Cancelled this')
    }
    else if (response.error) {
      console.warn('Error importing image')
    } else{
      const imageUri = response.uri || response.assets?.[0]?.uri
      console.log("🚀 ~ App ~ response:", response)
      setSelectedImage(imageUri)
    }
  })
.then(
  console.log('first')
)
.catch(
  e =>console.warn(e)
)
}
const openImagePicker = ()=>{
  const options = {
    mediaType:"photo",
    includeBase64:false,
    maxheight:2000,
    maxwidth:2000
  }

launchImageLibrary(options,response=>{
  if (response.didCancel) {
    console.warn('User Canceled this')
  }
  else if (response.error) {
    console.warn('Error importing image')
  } else{
    const imageUri = response.uri 
    setSelectedImage(imageUri)
  }
})}
  const addData = () => {
    firestore()
      .collection('Todo')
      .doc(title)
      .set({
        task: task,
      })
      .then(() => {
        console.log('User added!');
        navigation.navigate('Dashboard')
      })
      .then(() => {
        setTitle('')
        setTask('')
      })
  }
  const [task, setTask] = useState('')
  const [filter, setFilter] = useState([])
  const [modal, setModal] = useState(false)
  const { width, height } = useWindowDimensions();
  return (
    <View style={{
      height: height
    }}>
      {modal ?
       <Modal isVisible={modal} hasBackdrop={true} backdropColor={"black"} backdropOpacity={0.35} onBackButtonPress={() => showModal(false)} animationOut={"slideOutDown"} animationIn={'slideInUp'} animationInTiming={1000} animationOutTiming={3000} onBackdropPress={() => showModal(false)} >

        <View>
          <Text style={{
            fontSize: 40,
            fontFamily: 'Outfit-Bold',
            textAlign: 'center',


          }}>
            Your task has been added Successfully
          </Text>
          <CustomButton title={'Close'} action={() => setModal(false)}/>

        </View>
      </Modal> 
      :
     <View>
       <View style={Styles.viewOne}></View>
      <View style={Styles.viewTwo}></View>
      <KeyboardAvoidingView behavior='position' enabled keyboardVerticalOffset={0}>
        <View style={{
          height: '20%',
          justifyContent: 'center'
        }}>
          <Text style={Styles.MainText}>
            Welcome Onboard!
          </Text>
        </View>
        <View style={{
          height: '25%',
          alignItems: 'center',
          marginLeft: 25,
          justifyContent: 'center'
        }}>
          <Image source={require('../../assets/images/todoList3.png')} />
        </View>
        <View style={{
          height: "8%",
          justifyContent: 'center'
        }}>
          <Text style={{
            fontFamily: 'Poppins-Medium',
            fontSize: 14,
            textAlign: 'center',
            color: '#55847A'
          }}>
            Add What your want to do later on..
          </Text>
        </View>
        <View style={{
          height: '8%',
          justifyContent: "center"
        }}>
          <CustomTI title={'Enter Title of your task'} val={title} onChange={(val) => setTitle(val)} />
        </View>
        <View style={{
          height: '8%',
          justifyContent: "center"
        }}>
          <CustomTI title={'Enter Your Task'} val={task} onChange={(val) => setTask(val)} />
        </View>
        <View style={{
          height: '6%',
          marginTop: 10,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <CustomButton title={'Add to List'} action={addData} />
        </View>
        <View style={{
          height: '6%',
          marginTop: 10,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <CustomButton title={'Show List'} action={()=>navigation.navigate('Dashboard')} />
         
        </View>
        <View style={{
          height: '6%',
          marginTop: 10,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
           <CustomButton title={'Image'} action={openImagePicker} />
        </View>
        <View style={{
          height: '6%',
          marginTop: 10,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
                     <CustomButton title={'Camera'} action={handleCameraLaunch} />
        </View>
      </KeyboardAvoidingView>
      </View>
      }
    </View>
  )
}

export default AddtoDO

const styles = StyleSheet.create({})