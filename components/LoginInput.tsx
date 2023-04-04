import React from 'react'
import { Input } from 'native-base'

export default function LoginInput ({ placeholder, password = false, onChange, value }: { placeholder: string, password?: boolean, onChange?: Function, value: string }) {
    
    return (
        <Input
            w='70%'
            my={1.5}
            borderRadius={15}
            borderColor='#979797'
            backgroundColor='#F0F0F0'
            placeholder={ placeholder }
            size='lg'
            type={ password ? 'password' : 'text' }
            value={ value }
            onChangeText={text => onChange && onChange(text)}
        />
    )
}
