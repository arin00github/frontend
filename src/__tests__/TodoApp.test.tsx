import React from "react";
import { fireEvent, render } from "@testing-library/react";
import TodoApp from "../components/todoApp/TodoApp";

describe("<TodoApp/>", () => {
  it("renders TodoForm and TodoList", () => {
    const { getByText, getByTestId } = render(<TodoApp />);
    getByTestId("TodoList");
    getByText("등록");
  });

  it("renders default todo lists", () => {
    const { getByText } = render(<TodoApp />);
    getByText("TDD 배우기");
  });

  it("creates new todo", () => {
    const { getByPlaceholderText, getByText } = render(<TodoApp />);
    fireEvent.change(getByPlaceholderText("할 일을 입력하세요"), {
      target: {
        value: "새 항목 추가하기",
      },
    });
    fireEvent.click(getByText("등록"));
    getByText("새 항목 추가하기");
  });
});
