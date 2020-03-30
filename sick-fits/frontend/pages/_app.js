import App, { Container } from "next/app";
import { Page } from "../components";

function MyApp(props) {
  const { Component } = props;
  return (
    <Container>
      <Page />
      <Component />
    </Container>
  );
}

export default MyApp;
