import React from "react";
import { Header, Meta } from '.'

export function Page(props) {
  return (
    <div>
      <Meta />
      <Header />
      {props.children}
    </div>
  );
}
