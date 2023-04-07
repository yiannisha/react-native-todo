import eventsource from 'react-native-sse'
import PocketBase from 'pocketbase'

// pocketbase subscriptions need this to work
// @ts-ignore
global.EventSource = eventsource

const serverURL = 'https://testdbforyiannis.fly.dev';

export const pb = new PocketBase(serverURL)