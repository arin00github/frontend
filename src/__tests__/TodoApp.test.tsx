import React from "react";
import { fireEvent } from "@testing-library/react";
import TodoApp from "../components/todoApp/TodoApp";
import { customRender } from "../testUtil";

describe("<TodoApp/>", () => {
  it("renders TodoForm and TodoList", () => {
    const utils = customRender(<TodoApp />, {});

    utils.getByTestId("TodoList");
    utils.getByText("등록");
  });

  it("renders default todo lists", () => {
    const utils = customRender(<TodoApp />, {});
    utils.getByText("TDD 배우기");
  });

  it("creates new todo", () => {
    const utils = customRender(<TodoApp />, {});
    fireEvent.change(utils.getByPlaceholderText("할 일을 입력하세요"), {
      target: {
        value: "새 항목 추가하기",
      },
    });
    fireEvent.click(utils.getByText("등록"));
    utils.getByText("새 항목 추가하기");
  });
});
