import { Box, Button, Input, InputGroup } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";

interface ITodoForm {
  onInsert: (text: string) => void;
}

export const TodoForm = ({ onInsert }: ITodoForm) => {
  const [inputText, setInputText] = useState("");

  const handleChange = useCallback((e) => {
    setInputText(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      onInsert(inputText);
      setInputText("");
      e.preventDefault();
    },
    [inputText, onInsert]
  );
  return (
    <Box>
      <form onSubmit={onSubmit}>
        <InputGroup>
          <Input
            onChange={handleChange}
            value={inputText}
            placeholder="할 일을 입력하세요"
          />
        </InputGroup>

        <Button type="submit">등록</Button>
      </form>
    </Box>
  );
};
