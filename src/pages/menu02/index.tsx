import React from "react";
import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { PageHeader } from "Layout/PageHeader";
import { PageBody } from "Layout/PageBody";
import { App } from "Components/velopert/react/App";
import TodoApp from "Components/velopert/todoList/TodoApp";

export default function IndexMenu02() {
  return (
    <>
      <PageHeader>Context API</PageHeader>
      <PageBody>
        <Tabs>
          <TabList>
            <Tab>velopert</Tab>
            <Tab>velopert</Tab>
            <Tab>velopert</Tab>
          </TabList>
          <TabPanels>
            <TabPanel p={0}>
              <TodoApp />
            </TabPanel>
            <TabPanel p={0}>
              <App />
            </TabPanel>
            <TabPanel p={0}>tab03</TabPanel>
          </TabPanels>
        </Tabs>
      </PageBody>
    </>
  );
}
