import React from 'react'
import { StyleProp, ViewStyle, Text, TouchableHighlight } from 'react-native'

export default function LoginButton ({ style, text, onPress }: { style?: StyleProp<ViewStyle>, text: string, onPress?: Function }) {
        
    var buttonStyle: StyleProp<ViewStyle> = {
        width: 140,
        marginTop: 1.5,
        marginBottom: 1.5,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 15,
        backgroundColor: '#A9DBFF',
        justifyContent: 'center',
        alignItems: 'center',
    }

    // @ts-ignore
    if (style) buttonStyle = { ...buttonStyle, ...style }

    return (
        <TouchableHighlight
        onPress={() => onPress && onPress()}
        style={buttonStyle}
        underlayColor='#8DCFFF'
        >
            <Text style={{ color: '#2C6188', fontSize: 15 }}>{ text }</Text>
        </TouchableHighlight>
    )
}