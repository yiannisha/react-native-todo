import React from 'react'
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import { StyleProp, ViewStyle } from 'react-native/types'

import { mainStyles } from '../styles/main'

export default function CreateTodoButton({ style, onPress }: { style?: StyleProp<ViewStyle>, onPress?: Function }) {
  return (
    // @ts-ignore
    <TouchableOpacity style={{...buttonStyles.container, ...style}} onPress={() => {if (onPress) onPress()}}>
        <Text style={{...buttonStyles.text}}>+</Text>
    </TouchableOpacity>
  )
}

const buttonStyles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
    
        borderColor: '#D7D7D7',
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: 5,
        
    },
    text: {
        color: '#A3A3A3',
        fontSize: 30,
        textAlign: 'center',
    }
})