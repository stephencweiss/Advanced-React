import App, { Container } from "next/app";

function MyApp(props) {
  const { Component } = props;
  return (
    <Container>
      <p>Hey! I'm on every page</p>
      <Component />
    </Container>
  );
}

export default MyApp;
