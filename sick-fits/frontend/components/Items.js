import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;


// TODO: Update react-apollo to use useQuery instead
export const Items = (props) => {
  return (
    <div>
      <h1>Items!</h1>
      <Query query={ALL_ITEMS_QUERY}>
        {({data, error, loading}) => {
          if(loading) return <p>Loading...</p>
          if(error) return <p>Error: {error.message}</p>
          return <p>I found {data.items.length} items!</p>;
        }}
      </Query>
    </div>
  );
};
