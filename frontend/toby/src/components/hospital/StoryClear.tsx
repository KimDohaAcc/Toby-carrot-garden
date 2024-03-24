import React from "react";
import styled from "styled-components";

type StoryClearProps = {
  index: number;
};

const StoryClear = ({ index }: StoryClearProps) => {
  console.log("index", index);
  return (
    <div>
      {index}
      <h1>StoryClear</h1>
    </div>
  );
};

export default StoryClear;
