import React from "react";
import PaginationStyles from "./styles/PaginationStyles";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import ErrorMessage from "./ErrorMessage";
import {perPage} from '../config'

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

export const Pagination = (props) => (
  <PaginationStyles>
    <Query query={PAGINATION_QUERY}>
      {({ error, loading, data }) => {
        if (error) return <ErrorMessage error={error} />;
        if (loading) return <p>Loading...</p>;
        const {count} = data.itemsConnection.aggregate;
        const pages = Math.ceil(count / perPage)
        return <p>{`You are on page ${props.page} of ${pages}`}</p>
      }}
    </Query>
  </PaginationStyles>
);
