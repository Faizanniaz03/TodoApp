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
  const [newImage, setNewImage] = useState('')
  const [check, setcheck] = useState({})
  const [selectedImage, setSelectedImage] = useState('')
  const [Loader, setLoader] = useState(true)
  const [NewLoader, setNewLoader] = useState(true)
  const showImage = async () => {
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
      .then(() => {
        AsyncStorage.clear()
      })
  }
  const deleteEntry = async (itemId) => {
    await firestore().collection('Todo').doc(itemId).delete()
    setData(newItem => newItem.filter(item => item.id !== itemId))
  }
  const toggle = (itemId) => {
    setcheck(
      {
        ...check,
        [itemId]: !check[itemId]
      }
    );
  }
  useFocusEffect(
    useCallback(() => {
      showData();
      showImage()
    }, []))
  const { height, width } = useWindowDimensions()

  return (
    <View style={{
      flex: 1
    }}>
      {Loader ?
        <DotIndicator size={30} color='black' />
        :
        <View style={{
          flex: 1
        }}>
          <View style={Styles.viewOne}></View>
          <View style={Styles.viewTwo}></View>
          <View style={styles.StylingView}></View>
          <View style={Styles.pentagon}></View>
          <View style={styles.imageView}>
            <Image source={{ uri: newImage.img }} style={{ height: 180, width: 180 }} />
          </View>
          <View style={styles.welcomeView}>
            <Text style={styles.welcomeText}>Welcome Fisayomi</Text>
          </View>
          <View style={styles.girlImage}>
            <Image source={require('../../assets/images/todoList5.png')} />
          </View>
          <View style={styles.contentBox}>
            <View style={styles.contentView}>
              <Text style={styles.subMainText}>
                Dairy tasks
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Addtodo')}>
                <Ionicons name="add-circle" size={35} color={'black'} />
              </TouchableOpacity>
            </View>
            {!NewLoader ?
              <FlatList data={newData}
                keyExtractor={(item) => item.id}
                renderItem={({ item, index }) => {
                  return (
                    <View style={styles.flatListView}>
                     <View>
                     <Text style={styles.tasksView}>
                        {item.task}
                      </Text>
                     </View>
                      <View style={styles.iconsView}>
                      <TouchableOpacity onPress={() => deleteEntry(item.id)}>
                        <AntDesign name={'delete'} size={28} color={check[item.id] ? 'red' : 'black'} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => toggle(item.id)}>
                        {check[item.id] ?
                          <MaterialCommunityIcons name={'checkbox-outline'} size={30} />
                          :
                          <MaterialCommunityIcons name={'checkbox-blank-outline'} size={30} />
                        }
                      </TouchableOpacity>
                     </View>
                    </View>
                  )
                }} />
              :
              <View style={styles.LoaderView}>
                <DotIndicator size={18} color={primaryColor} />
                <Text style={styles.LoaderText}> Wait....</Text>
              </View>
            }
          </View>
          <View style={styles.LogoutButton}>
            <CustomButton action={Logout} title={'Logout'} />
          </View>
        </View>
      }
    </View>
  )
}
export default Dashboard

const styles = StyleSheet.create({
  StylingView: {
    width: 500,
    position: 'absolute',
    height: 250,
    backgroundColor: '#55847A',
    opacity: 0.9
  },
  imageView: {
    height: '20%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 30
  },
  welcomeView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcomeText: {
    color: 'black',
    fontSize: 22,
    fontFamily: 'Poppins-Medium',
    marginTop: 15
  },
  girlImage: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '30%'
  },
  contentBox: {
    backgroundColor: 'white',
    marginHorizontal: 30,
    height: '28%',
    borderRadius: 40,
    elevation: 2,
    paddingHorizontal: 20,
    paddingTop: 10
  },
  contentView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10
  },
  subMainText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    marginVertical: 10,
  },
  flatListView: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems:'center',
    marginVertical: 5,
    marginHorizontal: 10
  },
  iconsView: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between',
    margin: 5
  },
  tasksView: {
    fontSize: 22,
    fontFamily: 'Outfit-Medium',
    marginTop: 5,
    color: 'black'
  },
  LoaderView: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '55%'
  },
  LoaderText: {
    fontFamily: 'Outfit-Bold',
    fontSize: 30,
    color: primaryColor,
    textAlign: 'center'
  },
  LogoutButton: {
    height: '10%',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30
  }

})