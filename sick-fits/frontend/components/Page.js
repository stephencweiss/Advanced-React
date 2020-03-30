import React from "react";

export function Page(props) {
  return (
    <div>
      <p>Hey! I'm the page component</p>
      {props.children}
    </div>
  );
}
