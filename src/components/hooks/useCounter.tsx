import { useState } from "react";
import { UseCounterProps } from "./useCounter.type";

export const useCounter = ({ initialCount = 0 }: UseCounterProps = {}) => {
  const [count, setCount] = useState(initialCount);
//   console.log("count",count);
//   console.log("initialCount",initialCount);
    
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  
  return { count, increment, decrement };
};
