import { StyleSheet } from "react-native";

export const mainStyles = StyleSheet.create({
    // debug
    debugBorder: {
        borderColor: 'green',
        borderStyle: 'solid',
        borderWidth: 2,
    },
  
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 50,
    },
    titleContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    title: {
        color: '#4F4F4F',
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: 30,
        marginLeft: 50,
    }
})