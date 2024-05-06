import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import {React,useState } from 'react'
import CustomTI from '../../Components/CustomTI'
import CustomTO from '../../Components/CustomTO'
import CustomButton from '../../Components/CustomButton'
import firestore from '@react-native-firebase/firestore';


const RemindersList = ({navigation}) => {
  const [reminder, setReminder] = useState('')
  const addReminder = ()=>{
   if (reminder === '') {
    console.warn('Reminder cannot be empty');
   }
   else{
    firestore()
    .collection('Reminders')
    .add({
      Reminders: reminder
    })
    .then(() => {
      navigation.navigate('ShowReminders')
      setReminder('')
    });
   }
  }
 const {height,width} = useWindowDimensions()
  return (
    <View style={{
      height:height,
      width:width,
      backgroundColor:'#D0D0D0'
    }}>
     <KeyboardAvoidingView behavior='height'>
     <View style={styles.textInput}>
      <CustomTI title={'Enter Your Reminder'} onChange={(val)=>setReminder(val)} val={reminder}/>
        <CustomButton title={'Save Reminder'} action={addReminder}/>
        <CustomButton title={'Show Reminders'} action={()=>navigation.navigate('ShowReminders')}/>
      </View>
     </KeyboardAvoidingView>
    </View>
  )
}

export default RemindersList

const styles = StyleSheet.create({
 textInput:{
  height:"100%",
  justifyContent:'center',
 }
})