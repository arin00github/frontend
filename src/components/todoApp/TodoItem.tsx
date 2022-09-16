import { Button, CloseButton, ListItem, UnorderedList } from "@chakra-ui/react";
import React, { useCallback } from "react";
import { ITodoProps } from "./TodoApp";

interface ITodoItem {
  todo: ITodoProps;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}

export const TodoItem = ({ todo, onRemove, onToggle }: ITodoItem) => {
  const { id, text, done } = todo;

  const handleToggle = useCallback(() => {
    onToggle(id);
  }, [id, onToggle]);

  const handleRemove = useCallback(() => {
    onRemove(id);
  }, [onRemove, id]);
  return (
    <ListItem>
      <span
        onClick={handleToggle}
        style={{ textDecoration: done ? "line-through" : "none" }}
      >
        {text}
      </span>

      <Button onClick={handleRemove}>삭제</Button>
    </ListItem>
  );
};
