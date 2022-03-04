import React from "react";
import { Button, Text } from "@chakra-ui/react";

type CounterProps = {
  number: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

function Counter({ number, onIncrease, onDecrease }: CounterProps) {
  return (
    <div>
      <Text fontSize={60}>{number}</Text>
      <Button onClick={onIncrease}>+1</Button>
      <Button onClick={onDecrease}>-1</Button>
    </div>
  );
}

export default Counter;
