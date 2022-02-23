import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";

type PageBodyProps = {
  children: ReactNode;
};

export function PageBody({ children }: PageBodyProps) {
  return <Box>{children}</Box>;
}
