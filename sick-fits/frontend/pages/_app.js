import { Container } from "next/app";
import { Page } from "../components";
import { ApolloProvider } from "react-apollo";
import withData from "../lib/withData";

function App(props) {
  const { apollo, Component, pageProps } = props;
  return (
    <Container>
      <ApolloProvider client={apollo}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ApolloProvider>
    </Container>
  );
}

App.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  // expose the query to the user
  pageProps.query = ctx.query;
  return { pageProps };
};

export default withData(App);
