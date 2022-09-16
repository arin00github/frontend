import React from "react";
import { Box, Text } from "@chakra-ui/react";
import { PageHeader } from "Layout/PageHeader";
import { PageBody } from "Layout/PageBody";
import TodoApp from "Components/todoApp/TodoApp";

export default function IndexMenu02() {
  return (
    <>
      <PageHeader>React Test Library</PageHeader>
      <PageBody>
        <Text>
          <TodoApp />
        </Text>
      </PageBody>
    </>
  );
}
