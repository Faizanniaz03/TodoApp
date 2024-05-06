import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { black } from '../utils/Styles'

const RecipesTI = ({onChange,val,title}) => {
    const [inputHeight,setInputHeight] = useState()
    const changeSize = (event)=> {
        const contentHeight = event.nativeEvent.contentSize.height;
        setInputHeight(contentHeight);
      }
  return (
    <View>
      <TextInput placeholder={title} style={{
                borderRadius:10,
                backgroundColor:'white',
                marginHorizontal:20,
                paddingLeft:20,
                marginTop:10,
                fontFamily:'Poppins-Medium',
                height:inputHeight
                
            }} placeholderTextColor={'grey'}
            onChangeText={onChange}
            value={val}
            onContentSizeChange={changeSize}
            />
    </View>
  )
}

export default RecipesTI

const styles = StyleSheet.create({})