import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import CreateTodoButton from '../components/CreateTodoButton'
import CreateTodoModal from '../components/CreateTodoModal'

import { mainStyles } from '../styles/main'

export default function Todos() {
    
    const [modalActive, setModalActive] = useState(false)
    
    return (
        <View style={mainStyles.container}>
            <View style={mainStyles.titleContainer}>
                <Text style={mainStyles.title}>Todo List</Text>
            </View>
            <View style={style.buttonContainer}>
                <CreateTodoButton onPress={() => setModalActive(true)} />
            </View>
            <View style={style.todoContainer}>
                {/* Todos */}
            </View>
            <CreateTodoModal active={modalActive} toggleActive={() => setModalActive(false)}/>
        </View>
    )
}

const style = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingRight: 20,
    },
    todoContainer: {
        flex: 8,
    }
})