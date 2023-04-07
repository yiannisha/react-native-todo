import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { RecordAuthResponse, Record } from 'pocketbase' 
import * as SecureStore from 'expo-secure-store'

import { pb } from '../database'
import { AuthState } from '../types'

const initialState: AuthState = {
    user: null,
    token: null,
    pending: false,
    error: null,
}

const _intializeToken = createAsyncThunk(
    'auth/initializeToken',
    async (action, { rejectWithValue }) => {
        try {
            // get stored token from secureStorage if it exists
            var { token, model } = await getUserDataLocally()
            
            // try to login on pocketbase with saved auth token
            pb.authStore.save(token, model)
            
            if (!pb.authStore.isValid) {
                pb.authStore.clear()
                await saveUserDataLocally(null, null)

                return {}
            }
            
            try {
                model = await pb.collection('users').authRefresh()
                token = model.token
                await saveUserDataLocally(token, model)
            }
            catch (error: any) {
                return rejectWithValue(error.message)
            }

            return {
                token: token,
                user: getUserData(model),
            }
        }
        catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

const _login = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
        try {
            const { token } = await pb.collection('users').authWithPassword(email, password)
            const model = pb.authStore.model as Record

            await saveUserDataLocally(token, model)
            return {
                token: model.token,
                user: getUserData(model),
            }
        }
        catch (error: any) {
            return rejectWithValue(error.message)
        }

    }
)

const _register = createAsyncThunk(
    'auth/register',
    async({ email, password, passwordConfirm }: { email: string, password: string, passwordConfirm: string }, { rejectWithValue }) => {

        try {
            await pb.collection('users').create({
                            email: email,
                            password: password,
                            passwordConfirm: passwordConfirm,
                            emailVisibility: true,
                })

            const model = await pb.collection('users').authWithPassword(email, password)
            await saveUserDataLocally(model.token, model as any)
            return {
                token: model.token,
                user: getUserData(model),
            }
        }
        catch (error: any) {
            return rejectWithValue(error.message)
        }

    }
)

const _logout = createAsyncThunk(
    'auth/logout',
    async(action, { rejectWithValue }) => {
        try {
            await saveUserDataLocally(null, null)
        }
        catch (error: any) {
            return rejectWithValue(error.message)
        }

    }
)

const authSlice = createSlice({
    name: 'auth/initToken',
    initialState,
    reducers: {
        initializeToken: (state, action) => {
            state.token = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(_login.fulfilled, (state, action) => {
                if (action.payload) {
                    const { token, user } = action.payload
                    state.token = token
                    state.user = user
                    state.pending = false
                    state.error = null
                }
            })
            .addCase(_login.pending, (state) => {
                state.pending = true
            })
            .addCase(_login.rejected, (state, action) => {
                // @ts-ignore
                state.error = action.payload
                state.pending = false
            })
            .addCase(_register.fulfilled, (state, action) => {
                if (action.payload) {
                    const { token, user } = action.payload
                    state.token = token
                    state.user = user
                    state.pending = false
                    state.error = null
                }
            })
            .addCase(_register.pending, (state) => {
                state.pending = true
            })
            .addCase(_register.rejected, (state, action) => {
                // @ts-ignore
                state.error = action.payload
                state.pending = false
            })
            .addCase(_logout.fulfilled, (state, action) => {
                pb.authStore.clear()
                state.user = null
                state.token = null
            })
            .addCase(_intializeToken.fulfilled, (state, action) => {
                state.token = action.payload.token ?? null
                if (action.payload.user) state.user = action.payload.user
            })
    }
})

async function saveUserDataLocally (token: string | null, model: Record | null) {
    await SecureStore.setItemAsync('AUTH_TOKEN', token ?? '')
    await SecureStore.setItemAsync('AUTH_MODEL', JSON.stringify(model ?? ''))
}

async function getUserDataLocally () {
    const token = await SecureStore.getItemAsync('AUTH_TOKEN') ?? ''
    const model = await SecureStore.getItemAsync('AUTH_MODEL') ?? ''

    return {
        token: token,
        model: JSON.parse(model),
    }
}

const getUserData = (model: any) => (model ? { id: model.id, name: model.name, email: model.email } : null)

export const {

} = authSlice.actions

export {
    _login,
    _register,
    _logout,
    _intializeToken,
}

export default authSlice.reducer