import React, { useState } from 'react'
import { Text } from 'react-native'
import { NativeBaseProvider, Box, Center } from 'native-base'

import { pb } from '../App'

import LoginInput from '../components/LoginInput'
import LoginButton from '../components/LoginButton'

type FormData = {
    email: string,
    password: string,
    passwordConfirm: string,
}

const formDataInitialValue: FormData = {
    email: '',
    password: '',
    passwordConfirm: '',
}

const loginWithEmail = (email: string, password: string) => pb.collection('users').authWithPassword(email, password)
const registerWithEmail = (email: string, password: string, passwordConfirm: string) => {
    return pb.collection('users').create({
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
        emailVisibility: true,
    })
}

export default function Login ({ navigation }: { navigation: any }) {

    const [formData, setFormData] = useState<FormData>(formDataInitialValue)
    const [passConfInput, setPassConfInput] = useState<boolean>(false)
    const [registerLoading, setRegisterLoading] = useState<boolean>(false)
    const [loginLoading, setLoginLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | undefined>()

    const clearForm = () => setFormData(formDataInitialValue)

    const register = async ({ email, password, passwordConfirm }: FormData) => {
        
        if (!formData.passwordConfirm) {
            clearForm()
            setError('')
            setPassConfInput(true)
            return
        }

        setRegisterLoading(true)
        try {
            await registerWithEmail(email, password, passwordConfirm)
            // account created successfully
            setRegisterLoading(false)
            clearForm()
            // clear error
            setError(undefined)
            // go to todo screen
            navigation.navigate('Todos')
        }
        catch (error: any) {
            // account creation failed
            console.error(error)
            setRegisterLoading(false)
            // show error in a nice way
            setError(error.message)
        }
    }

    const login = async ({email, password}: FormData) => {
        
        if (passConfInput) {
            clearForm()
            setError('')
            setPassConfInput(false)
            return
        }

        setLoginLoading(true)
        try {
            await loginWithEmail(email, password)
            // account created successfully
            setLoginLoading(false)
            clearForm()
            // clear error
            setError(undefined)
            // go to todo screen
            navigation.navigate('Todos')
        }
        catch (error: any) {
            // account creation failed
            console.error(error)
            setLoginLoading(false)
            // show error in a nice way
            setError(error.message)
        }
    }

    const formOnChange = (key: string) => (value: string) => setFormData({ ...formData, [key]: value })
    
    return (
        <NativeBaseProvider>
            <Center flex={1}>
                <Center flex={3} _text={{ fontSize: '50', fontWeight: 'bold', color: '#4F4F4F' }}>
                    { passConfInput ? 'Create Account' : 'Login'}
                </Center>
                <Box flex={5} px={90} py={100} justifyItems='flex-start' alignItems='center'>
                    <LoginInput
                    placeholder='Email'
                    value={formData.email}
                    onChange={formOnChange('email')}
                    />
                    <LoginInput
                    placeholder='Password'
                    password
                    value={formData.password}
                    onChange={formOnChange('password')}
                    />
                    {
                        passConfInput &&
                        <LoginInput
                        placeholder='Confirm Password'
                        password
                        value={formData.passwordConfirm}
                        onChange={formOnChange('passwordConfirm')}
                        />
                    }
                    {
                        error &&
                        <Text style={{ color: 'red' }}>{ error }</Text>
                    }
                    <Box my={5}>
                        <LoginButton text={loginLoading ? 'Loading':'Login'} onPress={() => login(formData)} />
                        <LoginButton style={{ marginTop: 5 }} text={registerLoading ? 'Loading':'Create Account'} onPress={() => register(formData)} />
                    </Box>
                </Box>
            </Center>
        </NativeBaseProvider>
    )
}
