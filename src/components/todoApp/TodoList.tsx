import { UnorderedList } from "@chakra-ui/react";
import React from "react";
import { ITodoProps } from "./TodoApp";
import { TodoItem } from "./TodoItem";

interface ITodoList {
  todos: ITodoProps[];
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}

export const TodoList = ({ todos, onRemove, onToggle }: ITodoList) => {
  return (
    <UnorderedList data-testid="TodoList">
      {todos.map((todo, idx) => (
        <TodoItem
          key={`key_${idx}_${todo.text}`}
          todo={todo}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      ))}
    </UnorderedList>
  );
};
