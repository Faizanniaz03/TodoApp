import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'

import React from 'react'

const BackNav = ({action}) => {
  return (
          <TouchableOpacity onPress={action}>
        <Feather name={'arrow-left-circle'} size={30} color={'black'}/>
        </TouchableOpacity>
  )
}

export default BackNav

const styles = StyleSheet.create({})