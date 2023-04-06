import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useSelector } from 'react-redux'

import { getAuth } from '../selectors'
import { pb } from '../database'
import { Todo, TodoState } from '../types'

const initialValue: TodoState = {
    todos: {},
}

const TodoStateContext = createContext<TodoState>(initialValue)

const useTodoState = () => {
    const context = useContext(TodoStateContext)

    if (!context) {
        throw new Error('useTodoState must be used within an TodoStateContext.')
    }

    return context
}

const TodoStateContextProvider = ({ children }: { children: ReactNode }) => {
    const [todos, setTodos] = useState<{ [id: string]: Todo }>(initialValue.todos)
    const { token } = useSelector(getAuth)
    
    // fetch all previous user's todos
    useEffect(() => {
        
        const fetchTodos = async () => {
            return await pb.collection('todos').getFullList({
                sort: 'created',
            })
        }
        
        if (!token) {
            setTodos({})

            // debug
            // console.log('clearing todos')
        }

        if (token) {
            fetchTodos()
            .then(resp => {
                const prevTodos: { [id: string]: Todo } = {}
                resp.forEach(todo => prevTodos[todo.id] = todo.content)
                setTodos({
                    ...todos,
                    ...prevTodos
                })

                // debug
                // console.log('todos fetched!')
            })
        }

    }, [token])

    // subscribe to current user's todos
    pb.collection('todos').subscribe(`*`, function (e) {
        const { action } = e
        const { id } = e.record

        // switch block to determine action
        switch (action) {
            case 'create':
            case 'update':
                let data = e.record.content
                setTodos({
                    ...todos,
                    [id]: data,
                })
                break
            
            // case 'delete':
            default:
                const { [id]: value, ...newTodo } = todos
                setTodos(newTodo)
        }
        
    });

    const value: TodoState = {
        todos: todos
    }

    return (
        <TodoStateContext.Provider value={ value }>
            { children }
        </TodoStateContext.Provider>
    )
}

export {
    useTodoState,
    TodoStateContextProvider,
}