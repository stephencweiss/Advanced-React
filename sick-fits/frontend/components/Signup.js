import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import Form from "./styles/Form";
import ErrorMessage from "./ErrorMessage";

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $name: String!
    $password: String!
  ) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

export class Signup extends React.Component {
  state = {};

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (event, signup) => {
    event.preventDefault();
    console.log(event.target);
    await signup();
    // TODO: Update styled-components: Until then, need to manually reset state as styled-components ^3.4.9 cannot forwardRefs appropriately. If we update, we can simply pass along a ref and use this.formRef.current.reset()
    this.setState({ email: "", name: "", password: "" });
  };
  render() {
    return (
      <Mutation mutation={SIGNUP_MUTATION} variables={this.state}>
        {(signup, { error, loading }) => (
          <Form
            method="POST" // protects against url encoding
            onSubmit={(event) => this.handleSubmit(event, signup)}
          >
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign up for an account!</h2>
              <ErrorMessage error={error} />
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="name">
                Name
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Enter your name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </label>
              <label htmlFor="password">
                Password
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={this.handleChange}
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
