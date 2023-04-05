import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { useTodoState } from '../contexts/TodosContext'
import CreateTodoButton from '../components/CreateTodoButton'
import CreateTodoModal from '../components/CreateTodoModal'

import { mainStyles } from '../styles/main'

export default function Todos() {
    
    const [modalActive, setModalActive] = useState(false)
    const { todos } = useTodoState()

    const todoElems = todos.map(todo => <Text key={todo.id}>{todo.content}</Text>)

    return (
        <View style={mainStyles.container}>
            <View style={mainStyles.titleContainer}>
                <Text style={mainStyles.title}>Todo List</Text>
            </View>
            <View style={style.buttonContainer}>
                <CreateTodoButton onPress={() => setModalActive(true)} />
            </View>
            <View style={style.todoContainer}>
                { todoElems }
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