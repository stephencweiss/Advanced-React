import React from "react";
import PaginationStyles from "./styles/PaginationStyles";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Head from "next/head";
import Link from "next/link";
import ErrorMessage from "./ErrorMessage";
import { perPage } from "../config";

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
  <Query query={PAGINATION_QUERY}>
    {({ error, loading, data }) => {
      if (error) return <ErrorMessage error={error} />;
      if (loading) return <p>Loading...</p>;
      const { count } = data.itemsConnection.aggregate;
      const pages = Math.ceil(count / perPage);
      const page = parseInt(props.page);
      return (
        <PaginationStyles>
          <Head>
            <title>
              Sick Fits! | Page {page} of {pages}
            </title>
          </Head>
          <Link
            prefetch
            href={{ pathname: "items", query: { page: page - 1 } }}
          >
            <a aria-disabled={page <= 1} className={"prev"}>&larr; Previous</a>
          </Link>
          <p>{`You are on page ${page} of ${pages}`}</p>
          <p>{count} Items Total</p>
          <Link
            prefetch
            href={{ pathname: "items", query: { page: page + 1 } }}
          >
            <a aria-disabled={pages <= page} className={"prev"}>Next &rarr; </a>
          </Link>
        </PaginationStyles>
      );
    }}
  </Query>
);
