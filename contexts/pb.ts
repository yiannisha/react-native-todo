import eventsource from 'react-native-sse'
import PocketBase from 'pocketbase'

const serverURL = 'https://testdbforyiannis.fly.dev';

export const pb = new PocketBase(serverURL)

export const collections = {
    USERS: 'users',
    NOTES: 'notes',
}