import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import styled from "styled-components";

const TodoTemplateBlock = styled.div`
  width: 512px;
  height: 660px;

  position: relative; /* 추후 박스 하단에 추가 버튼을 위치시키기 위한 설정 */
  background: white;
  border-radius: 16px;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.04);

  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */

  margin-top: 30px;
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
`;

type TemplateProps = {
  children: ReactNode;
};

function TodoTemplate({ children }: TemplateProps) {
  return (
    <Box bg="gray.100">
      <TodoTemplateBlock>{children}</TodoTemplateBlock>
    </Box>
  );
}

export default TodoTemplate;
