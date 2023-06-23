import { create } from 'zustand'
import { TodoState, createTodoSlice } from './slices/todoSlice'

export const useStore = create<TodoState>()((...a) =>({
    ...createTodoSlice(...a)
}))
