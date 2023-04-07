import { Record } from "pocketbase"

export type UserState = {
    id: string,
    name: string,
    email: string,
}

export type AuthState = {
    token: string | null,
    user: UserState | null,
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
    _create(content: string): void,
    _update(id: string, content: string): void,
    _delete(id: string): void,
    pending: boolean,
    error: string | null,
}

export type RootState = {
    authState: AuthState,
}