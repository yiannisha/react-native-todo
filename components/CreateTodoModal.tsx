import React from 'react'
import  {
    View,
    Text,
    StyleSheet,
    TextInput
} from 'react-native'

import Button from './Button'

type Props = {
    active: boolean,
    toggleActive: Function,
}

export default function CreateTodoModal({ active, toggleActive }: Props) {

    if (!active) return <></>

    const CloseButton = () => <Button style={styles.closeButton} onPress={toggleActive}>&times;</Button>
    const CancelButton = () => <Button style={styles.cancelButton} onPress={toggleActive}>Cancel</Button>
    const CreateButton = () => <Button style={styles.createButton}>Create Todo</Button>

    return (
        <View style={styles.superContainer}>
            <View style={{ flex: 2 }}></View>
            <View style={styles.container}>
                <CloseButton />
                <View>
                    <Text style={styles.title}>Create Todo</Text>
                </View>
                <View style={styles.textAreaContainer}>
                    <TextInput
                        style={styles.textArea}
                        placeholder='Write your todo here.'
                        multiline
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <CancelButton />
                    <CreateButton />
                </View>
            </View>
            <View style={{ flex: 3 }}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    superContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        paddingLeft: 50,
        paddingRight: 50,

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 2,
        width: '100%',

        borderColor: '#D7D7D7',
        borderWidth: 3,
        borderStyle: 'solid',
        borderRadius: 10,

        backgroundColor: '#fff',

        padding: 20
    },
    title: {
        color: '#4F4F4F',
        fontSize: 25,
        fontWeight: 'bold'
    },
    textAreaContainer: {
        marginTop: 20,
        flex: 2,
    },
    textArea: {
        flex: 1,
        color: '#4F4F4F',
        fontSize: 15,
    },
    closeButton: {
        position: 'absolute',
        right: 5,
        top: 5,

        paddingRight: 5,
        paddingLeft: 5,

        borderRadius: 5,

        backgroundColor: '#D70040',

        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    cancelButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#D70040',

        borderRadius: 10,

        marginRight: 5,
    },
    createButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#3FC407',

        borderRadius: 10,

        marginLeft: 5,
    },
})