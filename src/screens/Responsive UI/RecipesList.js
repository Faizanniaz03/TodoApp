import { KeyboardAvoidingView, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import CustomTI from '../../Components/CustomTI'
import RecipesTI from '../../Components/RecipesTI'
import { primaryColor } from '../../utils/Styles'
import CustomButton from '../../Components/CustomButton'
import firestore from '@react-native-firebase/firestore'


const RecipesList = ({navigation}) => {
  const [Recipe, setRecipe] = useState('')
  const [description,setDescription] = useState('')
  const [ingredients,setIngredients] = useState('')
  const {height,width} = useWindowDimensions()
  
    const addRecipe = ()=>{
      if (Recipe === '') {
       console.warn('Recipe cannot be empty');
      }
      else if (description === '') {
        console.warn('Description Cannot be Empty');
      }
      else if (ingredients === '') {
        console.warn('Please Enter ingredients');
      }
      else{
       firestore()
       .collection('Recipes')
       .add({
         Recipe:Recipe,
         Description:description,
         Ingredients:ingredients
       })
       .then(() => {
         navigation.navigate('ShowRecipes')
         setDescription('')
         setIngredients('')
         setRecipe('')
       });
      }
     }
  
  return (
    <View style={{
        height:height,
        width:width,
        backgroundColor:'#D0D0D0',
    }}>
     <View style={styles.firstView}>
     <Text style={styles.header}>
        Your Recipes Will be safe here
      </Text>
     </View>
      <KeyboardAvoidingView behavior='padding' style={styles.componentsView} keyboardVerticalOffset={30}>
      <CustomTI onChange={(val)=>setRecipe(val)} title={'Enter Recipe Name'} val={Recipe}/>
      <RecipesTI onChange={(val)=>setDescription(val)} title={'Enter Description of your Recipe'} val={description}/>
      <RecipesTI onChange={(val)=>setIngredients(val)} title={'Enter Ingredients of your Recipe'} val={ingredients}/>
      <CustomButton title={'Save Recipe'} action={addRecipe}/>
        <CustomButton title={'Show Recipes'} action={()=>navigation.navigate('ShowRecipes')}/>
      </KeyboardAvoidingView>
    </View>
  )
}

export default RecipesList

const styles = StyleSheet.create({
  firstView:{
    alignItems:'center',
    justifyContent:'flex-end',
    height:'15%'
   },
   header:{
    fontSize:20,
    textAlign:'center',
    color:primaryColor,
    fontFamily:'Outfit-Bold',
  },
  componentsView:{
    justifyContent:'flex-end',
    height:'55%'
  }

})