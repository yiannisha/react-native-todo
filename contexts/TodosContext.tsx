import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

import { pb } from './pb'
import { Todo, TodoState } from '../types'
import { useAuthStateContext } from './AuthContext'

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
    const { state } = useAuthStateContext()
    // const userId = pb.authStore.model?.id

    // fetch all previous user's todos
    useEffect(() => {

        const fetchTodos = async () => {
            return await pb.collection('todos').getFullList({
                sort: 'created',
            })
        }

        if (state.token) {
            fetchTodos()
            .then(resp => {
                const prevTodos: Todo[] = resp.map(todo => ({ id: todo.id, content: todo.content }))
                setTodos([
                    ...todos,
                    ...prevTodos,
                ])
            })
        }

    }, [state.token])

    // subscribe to current user's todos
    pb.collection('todos').subscribe(`*`, function (e) {
        setTodos([
            ...todos,
            {
                id: e.record.id,
                content: e.record.content,
            }
        ])
    });

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