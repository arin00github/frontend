import React from "react";
import TodoTemplate from "./TodoTemplate";
import TodoHead from "./TodoHead";
import TodoList from "./TodoList";
import TodoCreate from "./TodoCreate";
import { TodoProvider } from "./TodoContext";

export default function TodoApp() {
  return (
    <TodoProvider>
      <TodoTemplate>
        <TodoHead />
        <TodoList />
        <TodoCreate />
      </TodoTemplate>
    </TodoProvider>
  );
}
