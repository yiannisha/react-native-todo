import React, { useState } from 'react'
import { Text } from 'react-native'
import { NativeBaseProvider, Box, Center } from 'native-base'
import { useSelector, useDispatch } from 'react-redux'

import { getAuth } from '../selectors'
import { _login, _register } from '../slices/auth'

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

export default function Login ({ navigation }: { navigation?: any }) {

    const dispatch = useDispatch()

    const [formData, setFormData] = useState<FormData>(formDataInitialValue)
    const [passConfInput, setPassConfInput] = useState<boolean>(false)

    const { error, pending, token } = useSelector(getAuth)

    const clearForm = () => setFormData(formDataInitialValue)

    const register = async ({ email, password, passwordConfirm }: FormData) => {
        
        if (!formData.passwordConfirm) {
            clearForm()
            setPassConfInput(true)
            return
        }

        // @ts-ignore
        dispatch(_register({ email: email, password: password, passwordConfirm: passwordConfirm}))
        clearForm()
        setPassConfInput(false)
    }

    const login = ({email, password}: FormData) => {
        
        if (passConfInput) {
            clearForm()
            setPassConfInput(false)
            return
        }

        // @ts-ignore
        dispatch(_login({ email: email, password: password }))
        clearForm()

    }

    const formOnChange = (key: string) => (value: string) => setFormData({ ...formData, [key]: value })
    
    if (token) navigation?.navigate('Todos')

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
                        // @ts-ignore
                        <Text style={{ color: 'red' }}>{ error }</Text>
                    }
                    <Box my={5}>
                        <LoginButton disabled={pending} text='Login' onPress={() => login(formData)} />
                        <LoginButton disabled={pending} style={{ marginTop: 5 }} text='Create Account' onPress={() => register(formData)} />
                    </Box>
                </Box>
            </Center>
        </NativeBaseProvider>
    )
}
