import React from "react";
import { fireEvent } from "@testing-library/react";
import { TodoForm } from "../components/todoApp/TodoForm";
import { customRender } from "../testUtil";
// jest.mock('@chakra-ui/core', () => {
//     const module = jest.requireActual('@chakra-ui/core');
//     return {
//         ...module,
//         useColorMode: jest.fn(),
//         useTheme: jest.fn(),
//     }
// })

describe("<TodoForm/>", () => {
  const setup = (props: { onInsert: (text: string) => void }) => {
    const utils = customRender(<TodoForm {...props} />, {});
    const { getByPlaceholderText, getByText } = utils;

    const input = getByPlaceholderText("할 일을 입력하세요");
    const button = getByText("등록");
    return {
      ...utils,
      input,
      button,
    };
  };

  it("has input and a button", () => {
    const onInsert = jest.fn();
    const { input, button } = setup({ onInsert });
    expect(input).toBeTruthy();
    expect(button).toBeTruthy();
  });

  it("changes input", () => {
    const onInsert = jest.fn();
    const { input } = setup({ onInsert });

    fireEvent.change(input, {
      target: {
        value: "React 배우기",
      },
    });
    expect(input).toHaveAttribute("value", "React 배우기");
  });

  it("Calls onInsert and clears input", () => {
    const onInsert = jest.fn();
    const { input, button } = setup({ onInsert });
    fireEvent.change(input, {
      target: {
        value: "React 배우기",
      },
    });
    fireEvent.click(button);
    expect(onInsert).toBeCalledWith("React 배우기");
    expect(input).toHaveAttribute("value", "");
  });
});
