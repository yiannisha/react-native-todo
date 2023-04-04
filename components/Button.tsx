import React, { ReactNode } from 'react'
import {
    TouchableHighlight,
    Text,
    StyleProp,
    ViewStyle,
} from 'react-native'

type ButtonProps = {
    children: ReactNode,
    style: StyleProp<ViewStyle>,
    onPress?: Function,
}

export default function Button ({ children, style, onPress }: ButtonProps) {
    return (
        <TouchableHighlight style={style} onPress={() => onPress && onPress()}>
            <Text style={{ fontSize: 20, color: '#fff' }}>
                { children }
            </Text>
        </TouchableHighlight>
    )
}