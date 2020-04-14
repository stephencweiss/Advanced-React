import React from "react";
import { Mutation, Query } from "react-apollo";
import Router from "next/router";
import gql from "graphql-tag";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import ErrorMessage from "./ErrorMessage";

export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      title
      description
      price
      image
      largeImage
    }
  }
`;

export const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: ID!
    $title: String
    $description: String
    $price: Int
    $image: String
    $largeImage: String
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

export class UpdateItem extends React.Component {
  state = {};

  handleChange = (event) => {
    const { name, type, value } = event.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  // todo: make into a hook
  saveImageToCloudinary = async (file) => {
    console.log(`saving image --> ${file}`);
    if (!file) return;
    const data = new FormData();
    data.set("file", file);
    data.set("upload_preset", "sickfits");
    await fetch("https://api.cloudinary.com/v1_1/scweiss1/auto/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          image: data.secure_url,
          largeImage: data.eager[0].secure_url,
        });
      });
  };

  handleSubmit = async (event, updateItem) => {
    // prevent native form submission
    event.preventDefault();
    // process uploaded image

    this.state.files &&
      this.state.files[0] &&
      (await this.saveImageToCloudinary(this.state.files[0]));

    // create the item on the data base
    const res = await updateItem({
      variables: { id: this.props.id, ...this.state },
    })
    // redirect to the new item's page
    Router.push({
      pathname: "/item",
      query: { id: res.data.updateItem.id },
    });
  };

  handleImageUpload = (event) => {
    const { files } = event.target;
    const tempUrl = URL.createObjectURL(files[0]);
    this.setState({ files, tempUrl });
  };

  render() {
    if (!this.props.id) return <>Error: No ID provided!</>;
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{ id: this.props.id }}>
        {({ data, error, loading }) => {
          const { item } = data;
          if (error) return <div>Error!</div>;
          if (loading) return <div>Loading...</div>;
          if (!data.item)
            return <div>No item found for ID: {this.props.id}</div>;
          const imgSrc = this.state.tempUrl || item.image;

          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION}>
              {(updateItem, { loading, error }) => (
                <Form
                  onSubmit={(event) => this.handleSubmit(event, updateItem)}
                >
                  <ErrorMessage error={error} />
                  <fieldset disabled={loading} aria-busy={loading}>
                    <label htmlFor="file">
                      Image
                      <input
                        type="file"
                        id="file"
                        name="file"
                        placeholder="Upload an image"
                        accept={"image/*"}
                        onChange={this.handleImageUpload}
                      />
                      {imgSrc && (
                        <img src={imgSrc} width={200} alt="Upload Preview" />
                      )}
                    </label>
                    <label htmlFor="title">
                      Title
                      <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Title"
                        onChange={this.handleChange}
                        defaultValue={item.title}
                      />
                    </label>

                    <label htmlFor="price">
                      Price
                      <input
                        type="Number"
                        id="price"
                        name="price"
                        placeholder="Price"
                        onChange={this.handleChange}
                        defaultValue={item.price}
                      />
                    </label>

                    <label htmlFor="description">
                      Description
                      <textarea
                        id="description"
                        name="description"
                        placeholder="Description"
                        onChange={this.handleChange}
                        defaultValue={item.description}
                      />
                    </label>
                    <button type="submit">Save Changes</button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}
