import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ALL_ITEMS_QUERY } from "./Items";

export const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

export class DeleteItem extends React.Component {
  handleClick = (_, deleteItem) => {
    confirm(`Are you sure you'd like to delete this item?`) && deleteItem();
  };

  update = (cache, payload) => {
    const { items } = cache.readQuery({ query: ALL_ITEMS_QUERY });
    const { id: deletedId } = payload.data.deleteItem;
    const filteredItems = items.filter((item) => item.id !== deletedId);
    cache.writeQuery({
      query: ALL_ITEMS_QUERY,
      data: { items: filteredItems },
    });
  };
  render() {
    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteItem, { error }) => (
          <button onClick={(event) => this.handleClick(event, deleteItem)}>
            {this.props.children}
          </button>
        )}
      </Mutation>
    );
  }
}
