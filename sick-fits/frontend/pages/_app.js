import { Container } from "next/app";
import { Page } from "../components";
import { ApolloProvider } from "react-apollo";
import withData from "../lib/withData";

function App(props) {
  const { apollo, Component } = props;
  return (
    <Container>
      <ApolloProvider client={apollo}>
        <Page>
          <Component />
        </Page>
      </ApolloProvider>
    </Container>
  );
}

export default withData(App);
