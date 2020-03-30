import { Container } from "next/app";
import { Page } from "../components";

function App(props) {
  const { Component } = props;
  return (
    <Container>
      <Page>
        <Component />
      </Page>
    </Container>
  );
}

export default App;
