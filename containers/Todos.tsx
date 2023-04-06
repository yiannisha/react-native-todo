import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSignOut } from '@fortawesome/free-solid-svg-icons/faSignOut'

import { _logout } from '../slices/auth'
import { getAuth } from '../selectors'
import { useTodoState } from '../contexts/TodosContext'
import CreateTodoButton from '../components/CreateTodoButton'
import CreateTodoModal from '../components/CreateTodoModal'

import { mainStyles } from '../styles/main'

export default function Todos({ navigation }: { navigation: any }) {
    
    // dispatch
    const dispatch = useDispatch()
    const logout = () => dispatch(_logout())

    // selectors
    const { token } = useSelector(getAuth)
    
    // context
    const { todos } = useTodoState()
    
    // state
    const [modalActive, setModalActive] = useState(false)

    // redirect on logout
    if (!token) navigation.navigate('Login')

    const todoElems = todos.map(todo => <Text key={todo.id}>{todo.content}</Text>)

    console.log(token)
    return (
        <View style={mainStyles.container}>
            <View style={mainStyles.titleContainer}>
                <Text style={mainStyles.title}>Todo List</Text>
                <View style={styles.logoutButtonContainer}>
                    <TouchableHighlight style={styles.logoutButton} onPress={() => logout()}>
                        <FontAwesomeIcon icon={ faSignOut } color='#fff' />
                    </TouchableHighlight>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <CreateTodoButton onPress={() => setModalActive(true)} />
            </View>
            <View style={styles.todoContainer}>
                { todoElems }
            </View>
            <CreateTodoModal active={modalActive} toggleActive={() => setModalActive(false)}/>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        paddingRight: 20,
    },
    todoContainer: {
        flex: 8,
    },
    logoutButton: { 
        borderRadius: 10,
        padding: 8,
        backgroundColor: '#D70040'
    },
    logoutButtonContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
})