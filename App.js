import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUp from './src/screens/Responsive UI/SignUp';
import Login from './src/screens/Responsive UI/Login';
import AddtoDO from './src/screens/Responsive UI/AddtoDO';
import Dashboard from './src/screens/Responsive UI/Dashboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DotIndicator } from 'react-native-indicators'
import OneSignal from 'react-native-onesignal';
import { Provider } from 'react-redux';
import Option from './src/screens/Responsive UI/Option';
import RecipesList from './src/screens/Responsive UI/RecipesList';
import RemindersList from './src/screens/Responsive UI/RemindersList';
import ShowReminders from './src/screens/Responsive UI/ShowReminders';
import ShowRecipe from './src/screens/Responsive UI/ShowRecipe';

const App = () => {
  const OneSignalFunction = ()=>{
OneSignal.setAppId('bc333108-000b-4fdd-afd4-840154365607');
OneSignal.setNotificationWillShowInForegroundHandler(notificationReceivedEvent => {
  console.log("OneSignal: notification will show in foreground:", notificationReceivedEvent);
  let notification = notificationReceivedEvent.getNotification();
  console.log("notification: ", notification);
  const data = notification.additionalData
  console.log("additionalData: ", data);
  notificationReceivedEvent.complete(notification);
});
OneSignal.setNotificationOpenedHandler(notification => {
  console.log("OneSignal: notification opened:", notification);
});
  }
  useEffect(()=>{
    OneSignalFunction()
  },[])
  const [stateLogin, setStateLogin] = useState('');
  const [Loading, setLoading] = useState(true)
  const getItem = async () => {
    try {
      const LoginVal = await AsyncStorage.getItem('@Login');
      setStateLogin(LoginVal);
    } catch (error) {
      console.error("Error fetching login state from AsyncStorage:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getItem();
  }, []);
  const Stack = createNativeStackNavigator();
  if (Loading == true ) {
    return (
      <View style={styles.loadingContainer}>
        <DotIndicator color={'black'}/>
      </View>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={stateLogin ? 'Options' : 'Login'}>
        <Stack.Screen name='Options' component={Option} />
        <Stack.Screen name='SignUp' component={SignUp} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Addtodo' component={AddtoDO} />
        <Stack.Screen name='Dashboard' component={Dashboard} />
        <Stack.Screen name='RecipesList' component={RecipesList} />
        <Stack.Screen name='RemindersList' component={RemindersList} />
        <Stack.Screen name='ShowReminders' component={ShowReminders} />
        <Stack.Screen name='ShowRecipes' component={ShowRecipe} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});



// import { Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import auth from '@react-native-firebase/auth';
// import firestore from '@react-native-firebase/firestore';

// const App = () => {
//   const [email,setEmail] = useState('')
//   const [password , setPassword] = useState('')
//   const [name, setName] = useState('')
//   const [data, setData] = useState({})
//   console.log("🚀 ~ App ~ data:", data)
//   const signUp = ()=>{
//     auth()
//   .createUserWithEmailAndPassword(email, password)
//   .then(() => {
//     console.log('User account created & signed in!');
//   })
//   .then(addNewData())
//   .catch(error => {
//     if (error.code === 'auth/email-already-in-use') {
//       console.log('That email address is already in use!');
//     }

//     if (error.code === 'auth/invalid-email') {
//       console.log('That email address is invalid!');
//     }

//     console.error(error);
//   });
//   }
//   const addData = ()=>{
//     firestore()
//   .collection('Users')
//   .add({
//     email:email,
//     password: password,
//   })
//   .then(() => {
//     console.log('User added!');
//   });
//   }
//   useEffect(()=>{
//     getData()
//   },[])
//   const addNewData = ()=>{
//     firestore()
//   .collection('Users')
//   .doc(name)
//   .set({
//     name: name,
//     email:email,
//     password:password
//   })
//   .then(() => {
//     console.log('User added!');
//   });
//   }
//   const getData = async ()=>{
//     const user = await firestore().collection('Users').doc('User1').get();
//     console.log("🚀 ~ getData ~ user:", JSON.stringify(user._data))
//     setData(user._data)
    
//   }
//   const Login = ()=>{
//    auth()
//    .signInWithEmailAndPassword(email,password)
//    .then(()=>console.warn('User Successfully Logged In'))
//    .catch(error =>{
//     if (error.code==='auth/user-not-found') {
//       console.warn(
//         'user not found'
//       )
//     }
//    else if (error.code === 'auth/invalid-credential') {
//       console.warn('This passoword is invalid')
//     }
//     console.log(error)
//    } )
//   }
//   const Delete = ()=>{
//     firestore()
//   .collection('Users')
//   .doc(name)
//   .delete()
//   .then(() => {
//     console.log('User deleted!');
//   });
//   }
//   return (
//     <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
//       <View>
//         <TextInput placeholder='Enter Your Email' onChangeText={(val)=>setEmail(val)} value={email} style={{
//           borderWidth:2,
//           borderColor:'black',
//           marginTop:20
//         }}/>
//         <TextInput placeholder='Enter Your Password' onChangeText={(val)=>setPassword(val)} value={password} style={{
//           borderWidth:2,
//           borderColor:'black',
//           marginVertical:20
//         }}/>
//         <TextInput placeholder='Enter Your Name' onChangeText={(val)=>setName(val)} value={name} style={{
//           borderWidth:2,
//           borderColor:'black',
//           marginVertical:20
//         }}/>
//         <Button title='SignUp' onPress={signUp}/>
//         <Button title='Login' onPress={Login}/>
//         <Button title='Delete' onPress={Delete}/>
//         <View>
//          {data && data.name ? <Text style={{
//             fontSize:30,
//             textAlign:'center',
//             color:'black'
//           }}>
//           {data.name}
//           </Text>
//           :
//           <Text>
//             Data Not found
//           </Text>
// }
//         </View>
//       </View>


//     </SafeAreaView>
//   )
// }

// export default App

// const styles = StyleSheet.create({})



// import { StyleSheet, Text, View, Button, Image } from 'react-native'
// import React, { useState, useEffect, useCallback } from 'react'
// import Geolocation from '@react-native-community/geolocation'
// import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
// import LinearGradient from 'react-native-linear-gradient'
// import { DotIndicator } from 'react-native-indicators'
// import { launchImageLibrary } from 'react-native-image-picker';
// import { launchCamera } from 'react-native-image-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';



// const App = () => {
//   const [Loader, setLoader] = useState(true)
//   const [Location, setLocation] = useState([])
//   const [selectedImage , setSelectedImage]= useState('')
//   console.log("🚀 ~ App ~ selectedImage:", selectedImage)
//   const setNewImage =async ()=>{
// await AsyncStorage.setItem('@image',selectedImage)

//   }
//   const getNewImage = async ()=>{
//    const newImage =  await AsyncStorage.getItem('@image')
//     setSelectedImage(newImage)
//   }
//   useCallback(
//     () => {
//       setNewImage()
//     },
//     [selectedImage],
//   )
//   useEffect(() => {
//     getNewImage()
//     getCurrentLocation()
//   }, [])
  
  
//   const getCurrentLocation = ()=>{
//     Geolocation.getCurrentPosition((val)=>
//     {setLocation(val.coords)
//     setLoader(false)
//   }
//   )
//   }
//   handleCameraLaunch = ()=>{
//     const options = {
//       mediaType:'photo',
//       includeBase64:false,
//       maxheight:2000,
//       maxwidth:2000
//     }
  
//   launchCamera(options,response=>{
//     if (response.didCancel) {
//     console.log('User Cancelled this')
//     }
//     else if (response.error) {
//       console.warn('Error importing image')
//     } else{
//       const imageUri = response.uri || response.assets?.[0]?.uri
//       console.log("🚀 ~ App ~ response:", response)
//       setSelectedImage(imageUri)
//     }
//   })
// .then(
//   console.log('first')
// )
// .catch(
//   e =>console.warn(e)
// )
// }

  // const openImagePicker = ()=>{
  //   const options = {
  //     mediaType:"photo",
  //     includeBase64:false,
  //     maxheight:2000,
  //     maxwidth:2000
  //   }
  
  // launchImageLibrary(options,response=>{
  //   if (response.didCancel) {
  //     console.warn('User Canceled this')
  //   }
  //   else if (response.error) {
  //     console.warn('Error importing image')
  //   } else{
  //     const imageUri = response.uri 
  //     setSelectedImage(imageUri)
  //   }
  // })}

//   return (
//    <View>
//     { 
//     Loader ? 
//     <View style={{
//       alignItems:'center',
//       justifyContent:'center',
//       flex:1
//     }}>
//       <DotIndicator color={'white'} />
//       </View>
//   :
//   <><View style={{
//             zIndex: 9
//           }}>
//             <Image source={{ uri: selectedImage }} style={{
//               height: 200,
//               width: 200,
//               alignSelf: 'center',
//             }} />
//             <Button title='Open Camera' onPress={handleCameraLaunch} />
//             <Button title='Open Images' onPress={openImagePicker} />
//           </View>
          
//           <MapView initialRegion={{
//             latitude:Location.latitude,
//             longitude:Location.longitude,
//             longitudeDelta:0.0015,
//             latitudeDelta:0.0015
//           }} 
//           provider={PROVIDER_GOOGLE}
//           style={{
//             height:"50%",
//             width:'100%',
//             alignSelf:'center',
//             marginTop:30,

//           }}
//           >
//             <Marker coordinate={{
//               latitude:Location.latitude,
//               longitude:Location.longitude,
//               longitudeDelta:0.0015,
//               latitudeDelta:0.0015
//             }} title='Hello'
//              description='Hello this is my marker and  want to make this a little bit more clear because this is not my type'/>
//             </MapView></>
// }
//     </View>
//   )
// }

// export default App

// const styles = StyleSheet.create({})



























// // import { StyleSheet, Text, View, Button, Image } from 'react-native'
// // import React, { useState, useEffect } from 'react'
// // import Geolocation from '@react-native-community/geolocation'
// // import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
// // import LinearGradient from 'react-native-linear-gradient'
// // import { DotIndicator } from 'react-native-indicators'
// // import { launchImageLibrary } from 'react-native-image-picker';
// // import { launchCamera } from 'react-native-image-picker';
// // import AsyncStorage from '@react-native-async-storage/async-storage';



// // const App = () => {
// //   const [Loader, setLoader] = useState(true)
// //   const [Location, setLocation] = useState([])
// //   const [selectedImage , setSelectedImage]= useState('')
// //   console.log("🚀 ~ App ~ selectedImage:", selectedImage)

// //   const getCurrentLocation = ()=>{
// //     Geolocation.getCurrentPosition((val)=>
// //     {setLocation(val)
// //     setLoader(false)
// //   }
// //   )
// //   }

// //   handleCameraLaunch = ()=>{
// //     const options = {
// //       mediaType:'photo',
// //       includeBase64:false,
// //       maxheight:2000,
// //       maxwidth:2000
// //     }
  
// //   launchCamera(options,response=>{
// //     if (response.didCancel) {
// //       console.warn('User Canceled this')
// //     }
// //     else if (response.error) {
// //       console.warn('Error importing image')
// //     } else{
// //       const imageUri = response.uri || response.assets?.[0]?.uri
// //       setSelectedImage(imageUri)
// //     }
// //   })}

// //   const openImagePicker = ()=>{
// //     const options = {
// //       mediaType:"photo",
// //       includeBase64:false,
// //       maxheight:2000,
// //       maxwidth:2000
// //     }
  
// //   launchImageLibrary(options,response=>{
// //     if (response.didCancel) {
// //       console.warn('User Canceled this')
// //     }
// //     else if (response.error) {
// //       console.warn('Error importing image')
// //     } else{
// //       const imageUri = response.uri || response.assets?.[0]?.uri
// //       setSelectedImage(imageUri)
// //     }
// //   })}





// // //   const currentLocation = () => {
// // //     Geolocation.getCurrentPosition((val) => {
// // //       setLocation(val.coords)
// // //       setLoader(false)
    
// // //     })
// // //   }
// // //   const setNewImage = async ()=>{
// // //     const uploadImage = await AsyncStorage.setItem('@image',selectedImage )
// // // }
// // // const getNewImage = async ()=>{
// // //   const getUploaded = await AsyncStorage.getItem('@image')
// // //   setSelectedImage(getUploaded)
// // // }
// // //   handleCameraLaunch = () => {
// // //     const options = {
// // //       mediaType: 'photo',
// // //       includeBase64: false,
// // //       maxHeight: 2000,
// // //       maxWidth: 2000,
// // //     };

// // //    launchCamera(options, response => {
// // //       if (response.didCancel) {
// // //         console.log('User cancelled camera');
// // //       } else if (response.error) {
// // //         console.log('Camera Error: ', response.error);
// // //       } else {
// // //         let imageUri = response.uri || response.assets?.[0]?.uri;
// // //         setSelectedImage(imageUri);
// // //         console.log(imageUri);
// // //       }
// // //     });
// // //   }
// // //   const openImagePicker = () => {
// // //     const options = {
// // //       mediaType: 'photo',
// // //       includeBase64: false,
// // //       maxHeight: 2000,
// // //       maxWidth: 2000,
// // //     };

// // //     launchImageLibrary(options, (response) => {
// // //       if (response.didCancel) {
// // //         console.log('User cancelled image picker');
// // //       } else if (response.error) {
// // //         console.log('Image picker error: ', response.error);
// // //       } else {
// // //         let imageUri = response.uri || response.assets?.[0]?.uri;
// // //         setSelectedImage(imageUri);
// // //       }
// // //     });
// // //   };
// //   useEffect(() => {
// //     // currentLocation()
// //     // getNewImage()
// //   }, [])
// //   return (
// //     // <View>
// //       {/* {
// //         Loader ?
// //           <View style={{
// //             justifyContent: 'center',
// //             height: '100%'
// //           }}>

// //             <DotIndicator color={'#4f4747'} />

// //           </View>
// //           : */}
// //           <View>
// //             <Button title='Get Image' onPress={openImagePicker}/>
// //             <Button title='Camera Image' onPress={handleCameraLaunch}/>
// //           </View>
// // {/* } */}




// //     {/* //       <View>
// //     //         <View style={{ zIndex: 9 }}>
// //     //           <Image style={{height:200,width:100}} source={{uri:selectedImage}}/>
// //     //           <Button title='save Image' onPress={setNewImage}/>
// //     //           <Button title="Choose from Device" onPress={openImagePicker} />
// //     //           <Button title="Open Camera" onPress={handleCameraLaunch} />
// //     //         </View> */}
// //     //         {/* <MapView
// //     //           style={{ width: '100%', height: '100%' }}
// //     //           provider={PROVIDER_GOOGLE}
// //     //           initialRegion={{
// //     //             latitude: Location.latitude,
// //     //             longitude: Location.longitude,
// //     //             latitudeDelta: 0.0030,
// //     //             longitudeDelta: 0.0030,
// //     //           }}
// //     //         >
// //     //           <Marker coordinate={{
// //     //             latitude: 30.157457,
// //     //             longitude: 71.524918,
// //     //             latitudeDelta: 0.0015,
// //     //             longitudeDelta: 0.0015
// //     //           }}
// //     //             title='Current Location'
// //     //             description='This is Current Location'
// //     //           />
// //     //         </MapView> */}
// //     //       </View>
// //     //   }
// //     // </View>
// //   )
// // }

// // export default App

// // const styles = StyleSheet.create({})