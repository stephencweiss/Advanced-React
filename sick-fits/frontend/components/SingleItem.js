import gql from "graphql-tag";
import { Query } from "react-apollo";
import ErrorMessage from "./ErrorMessage";
import styled from "styled-components";
import Head from "next/head";

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${({ theme }) => theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
      width: 100%;
        height: 100%;
        object-fit: contain;
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      largeImage
    }
  }
`;

export const SingleItem = (props) => {

  return (
    <Query query={SINGLE_ITEM_QUERY} variables={{ id: props.id }}>
      {({ error, loading, data }) => {
        if (error) return <ErrorMessage error={error} />;
        if (loading) return <p> Loading... </p>;
        if (!data.item)
          return (
            <ErrorMessage
              error={{ message: `No item found for ${props.id}` }}
            />
          );
        const { id, title, description, largeImage } = data.item;
        return (
             <SingleItemStyles>
              <Head>
                <title>Sick Fits | {title} </title>
              </Head>
              <img src={largeImage} alt={title} />
              <div className="details">
                  <h2>Viewing: {title}</h2>
                  <p>{description}</p>
              </div>
            </SingleItemStyles>
        );
      }}
    </Query>
  );
};
