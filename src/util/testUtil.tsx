import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import { ReactElement, ReactNode } from "react";
import { render } from "@testing-library/react";
export * from "@testing-library/react";

export const customRender = (ui: ReactElement, { ...options }) => {
  //const style = useStyles();

  return render(ui, {
    wrapper: ({ children }) => <ChakraProvider>{children}</ChakraProvider>,
    ...options,
  });
};
