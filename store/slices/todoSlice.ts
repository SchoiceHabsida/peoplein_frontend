import { StateCreator } from "zustand";

export interface TodoState {
    todos: {name: string, isActive: boolean}[],
    setTodo: (todo: ITodo) => void
}

interface ITodo {name: string, isActive: boolean}

export const createTodoSlice: StateCreator<TodoState> = (set) => ({
    todos: [],
    setTodo: (todo) =>  {
        set(state => ({todos: [...state.todos, todo]}))
    }
})