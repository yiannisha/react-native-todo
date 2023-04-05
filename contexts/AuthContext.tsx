import React, { ReactNode, createContext, useContext, useState } from 'react'

import { pb } from './pb'
import { AuthState, AuthStateContextType } from '../types'

const stateInitialValue: AuthState = {
    token: null,
    pending: false,
    error: null,
}

const contextInitialValue: AuthStateContextType = {
    state: stateInitialValue,
    _login: (email: string, password: string) => undefined,
    _register: (email, password, passwordConfirm) => undefined,
}

const AuthStateContext = createContext<AuthStateContextType>(contextInitialValue)

const useAuthStateContext = () => {
    const context = useContext(AuthStateContext)

    if (!context) {
        throw new Error('useAuthStateContext must be used within an AuthStateContext.')
    }

    return context
}

const AuthStateContextProvider = ({ children }: { children: ReactNode}) => {
    const [authState, setAuthState] = useState<AuthState>(stateInitialValue)
    
    // cool way to get all setters, doesn't lose any type checking because of the type checks in the function
    // const getSetter = (key: string) => (value: any) => setAuthState({ ...authState, [key]: value })
    
    // safer way to do it
    const setPending = (value: boolean) => setAuthState({ ...authState, pending: value })
    const setError = (value: Error | null) => setAuthState({ ...authState, error: value })
    const setToken = (value: string | null) => setAuthState({ ...authState, token: value })

    const value: AuthStateContextType = {
        state: authState,
        _login: (email: string, password: string) => _login( email, password, setPending, setError, setToken),
        _register: (email: string, password: string, passwordConfirm: string) => _register(email, password, passwordConfirm, setPending, setError, setToken)
    }

    return (
        <AuthStateContext.Provider value={ value }>
            { children }
        </AuthStateContext.Provider>
    )
}

/**
 * Logs in using the pocketbase API.
 * 
 * @param email 
 * @param password 
 * @param setPending function to set the pending state of the request to login.
 * @param setError function to set the error state of the request to login.
 */
async function _login(
        email: string,
        password: string,
        setPending: (loading: boolean) => void,
        setError: (error: Error | null) => void,
        setToken: (token: string | null) => void,
    ): Promise<void> {
    
    setPending(true)
    try {

        const { token } = await pb.collection('users').authWithPassword(email, password)
        
        // account created successfully
        setToken(token)
        setPending(false)
        // clear error
        setError(null)
    }
    catch (error: any) {
        // account creation failed
        console.error(error)
        setPending(false)
        // show error in a nice way
        setError(error.message)
    }
}

async function _register(
        email: string,
        password: string,
        passwordConfirm: string,
        setPending: (loading: boolean) => void,
        setError: (error: Error | null) => void,
        setToken: (token: string | null) => void,
    ): Promise<void> {

    setPending(true)
    try {

        // create user
        await pb.collection('users').create({
                            email: email,
                            password: password,
                            passwordConfirm: passwordConfirm,
                            emailVisibility: true,
                        })

        // login as new user
        const { token } = await pb.collection('users').authWithPassword(email, password)

        // account created successfully
        setPending(false)
        setToken(token)
        // clear error
        setError(null)
    }
    catch (error: any) {
        // account creation failed
        console.error(error)
        setPending(false)
        // show error in a nice way
        setError(error.message)
    }

}

export {
    useAuthStateContext,
    AuthStateContextProvider
}