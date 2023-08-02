import React, { useState } from "react";

const TotalSum = () => {
  const [showAddData, setShowAddDate] = useState<any>(0);
  const a = 10;
  const b = 15;
  const sum = () => {
    setShowAddDate(a + b);
    return a + b;
  };

  // const sum = () => {
  //   const num1: any = window.prompt("Enter value of a");
  //   const num2: any = window.prompt("Enter value of b");

  //   let a = parseInt(num1);
  //   let b = parseInt(num2);
  //   setShowAddDate(a + b);
  //   return a + b;
  // };

  return (
    <div>
      <h1>Total sum</h1>
      <button onClick={() => sum()}>Find Sum</button>
      <p>{showAddData}</p>
    </div>
  );
};

export default TotalSum;
