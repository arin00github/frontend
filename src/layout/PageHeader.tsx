import { Box, Heading } from "@chakra-ui/react";
import React, { ReactNode } from "react";

type PageHeaderProps = {
  children: ReactNode;
};

export function PageHeader({ children }: PageHeaderProps) {
  return (
    <Box mt={8} mb={6}>
      <Heading fontSize={48}>{children}</Heading>
    </Box>
  );
}
