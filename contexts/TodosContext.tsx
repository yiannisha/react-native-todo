import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useSelector } from 'react-redux'

import { getAuth } from '../selectors'
import { pb } from '../database'
import { Todo, TodoState } from '../types'

const initialValue: TodoState = {
    todos: [],
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
    const [todos, setTodos] = useState<Todo[]>(initialValue.todos)
    const { token } = useSelector(getAuth)
    
    // fetch all previous user's todos
    useEffect(() => {
        
        const fetchTodos = async () => {
            return await pb.collection('todos').getFullList({
                sort: 'created',
            })
        }
        
        if (!token) {
            setTodos([])

            // debug
            // console.log('clearing todos')
        }

        if (token) {
            fetchTodos()
            .then(resp => {
                const prevTodos: Todo[] = resp.map(todo => ({ id: todo.id, content: todo.content }))
                setTodos([
                    ...todos,
                    ...prevTodos,
                ])

                // debug
                // console.log('todos fetched!')
            })
        }

    }, [token])

    // subscribe to current user's todos
    pb.collection('todos').subscribe(`*`, function (e) {
        console.log(e.record)
        setTodos([
            ...todos,
            {
                id: e.record.id,
                content: e.record.content,
            }
        ])
    });

    console.log(todos)
    const value: TodoState = {
        todos
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