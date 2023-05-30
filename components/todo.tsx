'use client';
import { FC, useEffect } from "react";
import { useStore } from "@/store/useStore";

export const ToDo: FC = () => {
    const setTodo = useStore((state) => state.setTodo);
  const todos = useStore(state => state.todos);
  useEffect(() => {
    console.log('home');
  }, []);

  return <div>
    <h1>Todos</h1>
    <button onClick={() => setTodo({name: 'todo', isActive: false})}>add todo</button>
      {todos.map((todo, index) => <div key={index}>{todo.name}</div>)}
  </div>
}