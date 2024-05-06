import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, FlatList, Button, useWindowDimensions } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Styles, primaryColor } from '../../utils/Styles'
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import CustomButton from '../../Components/CustomButton'
import { DotIndicator } from 'react-native-indicators'
import { launchImageLibrary } from 'react-native-image-picker';
import { launchCamera } from 'react-native-image-picker';
const Dashboard = ({ navigation }) => {
  const [newData, setData] = useState('')
  const [newImage,setNewImage] = useState('')
  const [check, setcheck] = useState({})
  const [selectedImage,setSelectedImage] = useState('')
  const [Loader, setLoader] = useState(true)
  const [NewLoader, setNewLoader] = useState(true)
  const showImage =async ()=>{
    const Image = await firestore().collection('Images').doc('Image').get()
    setNewImage(Image.data())
    setLoader(false)
  }
  const showData = async () => {
    const user = await firestore().collection('Todo').get()
    const storeData = user.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setData(storeData)
    setNewLoader(false)

  }
  const Logout = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.replace('Login')
      })
      .then(()=>{
        AsyncStorage.clear()
      })}
  const deleteEntry = async (itemId) => {
    await firestore().collection('Todo').doc(itemId).delete()
    setData(newItem => newItem.filter(item => item.id !== itemId))
  }
  const toggle = (itemId) => {
    setcheck(
      { ...check, 
      [itemId]: !check[itemId] 
      }
  );
  }
  useFocusEffect(
    useCallback(() => {
      showData();
      showImage()
    }, []))
    const {height,width} = useWindowDimensions()
     
  return (
  <View style={{
    flex:1
  }}>
    {Loader ? 
    <DotIndicator size={30} color='black' />
  :
  <View style={{
    flex: 1
  }}>
    <View style={Styles.viewOne}></View>
    <View style={Styles.viewTwo}></View>
    <View style={{
      width: 500,
      position: 'absolute',
      height: 250,
      backgroundColor: '#55847A',
      opacity: 0.9
    }}>
    </View>
    <View style={Styles.pentagon}></View>
    <View style={{
      flex: 0.25,
      alignItems: 'center',
      justifyContent: 'flex-end'
    }}>
      <Image source={{uri:newImage.img}} style={{height:200,width:200}}/>
    </View>
    <View style={{
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Text style={{
        color: 'black',
        fontSize: 22,
        fontFamily: 'Poppins-Medium',
        marginTop: 15
      }}>Welcome Fisayomi</Text>
    </View>
    <View style={{
      alignItems: 'center',
      justifyContent: 'center',
      flex: 0.35
    }}>
      <Image source={require('../../assets/images/todoList5.png')} />
    </View>
    
    <View style={{
      backgroundColor: 'white',
      marginHorizontal: 30,
      flex: 0.35,
      borderRadius: 40,
      elevation: 2,
      paddingHorizontal: 20,
      paddingTop: 10
    }}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 10
      }}>
        <Text style={{
          fontFamily: 'Poppins-Medium',
          fontSize: 15,
          marginVertical: 10,
        }}>
          Dairy tasks
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Addtodo')
        }>
          <Ionicons name="add-circle" size={35} color={'black'} />
        </TouchableOpacity>
      </View>
      {!NewLoader ?
        <FlatList data={newData}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {

            return (
              <View style={{
                flexDirection: 'row',
                justifyContent: "space-between",
                margin: 10
              }}>
                <Text style={{
                  fontSize: 22,
                  fontFamily: 'Outfit-Medium',
                  marginTop: 5,
                  color: 'black'
                }}>
                  {item.task}
                </Text>
                <TouchableOpacity onPress={() => deleteEntry(item.id)}>
                  <AntDesign name={'delete'} size={30} color={check[item.id] ? 'red' : 'black'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => toggle(item.id)}>
                  {check[item.id] ?
                    <MaterialCommunityIcons name={'checkbox-outline'} size={30} />
                    :
                    <MaterialCommunityIcons name={'checkbox-blank-outline'} size={30} />
                  }
                </TouchableOpacity>
              </View>
            )
          }} />
        :
        <View style={{
          alignItems:'center',
          justifyContent:'flex-end',
          height:'55%'
        }}>
          <DotIndicator size={18} color={primaryColor} />
          <Text style={{
            fontFamily:'Outfit-Bold',
            fontSize:30,
            color:primaryColor,
            textAlign:'center'
          }}>
            Wait....
          </Text>
        </View>
      }
    </View>
    <View style={{
      height:'10%',
      justifyContent: 'center',
      alignItems:'center',
      marginLeft: 30
    }}>
      <CustomButton action={Logout} title={'Logout'}/>
    </View>
  </View>
  }
  </View>
  )
}
export default Dashboard

const styles = StyleSheet.create({})