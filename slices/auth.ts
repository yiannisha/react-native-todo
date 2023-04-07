import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import { pb } from '../database'
import { AuthState } from '../types'

const initialState: AuthState = {
    token: null,
    pending: false,
    error: null,
}

const _login = createAsyncThunk(
    'auth/login',
    async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
        try {
            const { token } = await pb.collection('users').authWithPassword(email, password)
            return {
                token: token
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

            const { token } = await pb.collection('users').authWithPassword(email, password)
            return {
                token: token
            }
        }
        catch (error: any) {
            return rejectWithValue(error.message)
        }

    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        _logout: (state) => {
            pb.authStore.clear()
            state.token = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(_login.fulfilled, (state, action) => {
                if (action.payload) {
                    const { token } = action.payload
                    state.token = token
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
                    const { token } = action.payload
                    state.token = token
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

    }
})

export const {
    _logout
} = authSlice.actions

export {
    _login,
    _register
}

export default authSlice.reducer