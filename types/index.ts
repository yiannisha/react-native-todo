export type AuthState = {
    token: string | null,
    pending: boolean,
    error: Error | null,
}

export type AuthStateContextType = {
    state: AuthState,
    _login(email: string, password: string): void,
    _register(email: string, password: string, passwordConfirm: string): void,
    // _logout: Function,
}