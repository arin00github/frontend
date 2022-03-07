import React from "react";
import {} from "@chakra-ui/react";
import Counter from "./Counter";
import { useDispatch, useSelector } from "react-redux";
import { increase, decrease } from "Redux/modules/counter";
import { RootState } from "Redux/store";

function CounterContainer() {
  const number = useSelector((state: RootState) => state.counter);
  const dispatch = useDispatch();

  const onIncrease = () => {
    dispatch(increase());
  };
  const onDecrease = () => {
    dispatch(decrease());
  };

  return (
    <Counter onDecrease={onDecrease} onIncrease={onIncrease} number={number} />
  );
}

export default CounterContainer;
