import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from ".";

const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    signout
  }
`;

export function SignOut (){
    return (
        <Mutation mutation={SIGNOUT_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
            {(signout, {error, loading}) => (
                <button onClick={signout}>Sign Out</button>
            )}
        </Mutation>
    )
}