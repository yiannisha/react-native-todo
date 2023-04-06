export type AuthState = {
    token: string | null,
    pending: boolean,
    error: string | null,
}

export type AuthStateContextType = {
    state: AuthState,
    _login(email: string, password: string): void,
    _register(email: string, password: string, passwordConfirm: string): void,
    _logout(): void,
}

export type Todo = {
    id: string,
    content: string,
}

export type TodoState = {
    todos: { [id: string]: Todo },
}

export type RootState = {
    authState: AuthState,
}