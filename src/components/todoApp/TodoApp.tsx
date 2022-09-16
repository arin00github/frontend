import React, { useCallback, useRef, useState } from "react";
import { TodoList } from "./TodoList";
import { TodoForm } from "./TodoForm";

export interface ITodoProps {
  id: number;
  text: string;
  done: boolean;
}

const TodoApp = () => {
  const initialValue = [
    { id: 1, text: "TDD 배우기", done: true },
    { id: 2, text: "React배우기", done: true },
  ];
  const [todos, setTodos] = useState<ITodoProps[]>(initialValue);

  const nextId = useRef(3);
  const onInsert = useCallback(
    (text: string) => {
      setTodos(todos.concat({ id: nextId.current, text, done: false }));
    },
    [todos]
  );
  const onToggle = useCallback(
    (id: number) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, done: !todo.done } : todo
        )
      );
    },
    [todos]
  );

  const onRemove = useCallback(
    (id: number) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    },
    [todos]
  );

  return (
    <>
      <TodoForm onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </>
  );
};

export default TodoApp;
