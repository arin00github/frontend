import React from "react";
import { fireEvent } from "@testing-library/react";
import { TodoItem } from "../components/todoApp/TodoItem";
import { customRender } from "../util/testUtil";
import { UnorderedList } from "@chakra-ui/react";
interface ITodoProps {
  id: number;
  text: string;
  done: boolean;
}

describe("<TodoItem/>", () => {
  const sampleTodo = {
    id: 1,
    text: "jest 강의듣기",
    done: false,
  };

  const setup = (setupProps: { todo: ITodoProps }) => {
    const onRemove = jest.fn();
    const onToggle = jest.fn();

    const todo = setupProps.todo || sampleTodo;

    const utils = customRender(
      <UnorderedList>
        <TodoItem
          todo={setupProps.todo}
          onRemove={onRemove}
          onToggle={onToggle}
        />
      </UnorderedList>,
      {}
    );

    const { getByText } = utils;

    const span = getByText(todo.text);
    const button = getByText("삭제");
    return { ...utils, span, button, onRemove, onToggle };
  };

  it("show line-through on span when done is true", () => {
    const { span } = setup({ todo: { ...sampleTodo, done: true } });
    expect(span).toHaveStyle("textDecoration: line-through");
  });

  it("does not show line-through on span when done is false", () => {
    const { span } = setup({ todo: { ...sampleTodo, done: false } });
    expect(span).not.toHaveStyle("textDecoration: line-through");
  });

  it("calls onToggle", () => {
    const { onToggle, span } = setup({
      todo: { ...sampleTodo },
    });

    fireEvent.click(span);
    expect(onToggle).toBeCalledWith(sampleTodo.id);
  });

  it("call onRemove", () => {
    const { onRemove, button } = setup({
      todo: { ...sampleTodo },
    });

    fireEvent.click(button);
    expect(onRemove).toBeCalledWith(sampleTodo.id);
  });
});
