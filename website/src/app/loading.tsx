import React from "react";
import { Spinner } from "@nextui-org/spinner";

function Loading() {
  return (
    <div className="flex justify-center items-center w-full h-dvh">
      <Spinner />
    </div>
  );
}

export default Loading;
