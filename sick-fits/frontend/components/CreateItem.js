import React from "react";
import { Mutation } from "react-apollo";
import Router from "next/router";
import gql from "graphql-tag";
import Form from "./styles/Form";
import formatMoney from "../lib/formatMoney";
import ErrorMessage from "./ErrorMessage";

export const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
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

export class CreateItem extends React.Component {
  state = {
    title: "",
    description: "",
    image: "",
    largeImage: "",
    price: 1050,
  };

  handleChange = (event) => {
    const { name, type, value } = event.target;
    const val = type === "number" ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  // todo: make into a hook
  saveImageToCloudinary = async () => {
    const data = new FormData();
    data.set("file", this.state.files[0]);
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

  handleSubmit = async (event, createItem) => {
    // prevent native form submission
    event.preventDefault();
    // process uploaded image
    await this.saveImageToCloudinary();

    // create the item on the data base
    const res = await createItem();
    // redirect to the new item's page
    Router.push({
      pathname: "/item",
      query: { id: res.data.createItem.id },
    });
  };

  handleImageUpload = (event) => {
    const { files } = event.target;
    const tempUrl = URL.createObjectURL(files[0]);
    this.setState({ files, tempUrl });
  };

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
          <Form onSubmit={() => this.handleSubmit(event, createItem)}>
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
                  required
                  onChange={this.handleImageUpload}
                />
                {this.state.tempUrl && (
                  <img
                    src={this.state.tempUrl}
                    width={200}
                    alt="Upload Preview"
                  />
                )}
              </label>

              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Title"
                  required
                  onChange={this.handleChange}
                  value={this.state.title}
                />
              </label>

              <label htmlFor="price">
                Price
                <input
                  type="Number"
                  id="price"
                  name="price"
                  placeholder="Price"
                  required
                  onChange={this.handleChange}
                  value={this.state.price}
                />
              </label>

              <label htmlFor="description">
                Description
                <textarea
                  id="description"
                  name="description"
                  placeholder="Description"
                  required
                  onChange={this.handleChange}
                  value={this.state.description}
                />
              </label>
              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    );
  }
}
