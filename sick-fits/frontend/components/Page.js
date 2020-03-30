import React from "react";
import { Header } from '.'

export function Page(props) {
  return (
    <div>
      <Header />
      {props.children}
    </div>
  );
}
