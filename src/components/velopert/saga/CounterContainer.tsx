import React from "react";
import {} from "@chakra-ui/react";
import Counter from "./Counter";
import { useDispatch, useSelector } from "react-redux";
import { increase, decrease } from "../../../redux/modules/counter";
import { RootState } from "../../../redux/store";

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
    <Counter onDecrease={decrease} onIncrease={increase} number={number} />
  );
}

export default CounterContainer;
