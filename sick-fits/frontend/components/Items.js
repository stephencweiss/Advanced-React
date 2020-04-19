import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Item from './Item'
import { Pagination } from "./Pagination";

export const ALL_ITEMS_QUERY = gql`
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

const Center = styled.div`
  text-align: center;
`;
const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: ${(theme) => theme.maxWidth};
  margin: 0 auto;
`;

// TODO: Update react-apollo to use useQuery instead
export const Items = (props) => {
  console.log({props})
  return (
    <Center>
      <Pagination page={props.page}/>
      <Query query={ALL_ITEMS_QUERY}>
        {({ data, error, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;
          return (
            <ItemsList>
              {data.items.map((item) => <Item key={item.id} item={item}/>)}
            </ItemsList>
          );
        }}
      </Query>
        <Pagination page={props.page}/>
    </Center>
  );
};
