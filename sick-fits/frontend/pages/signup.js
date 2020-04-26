import { SignUp } from "../components";
import styled from "styled-components";

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 20px;
`;
const SignupPage = (props) => (
  <Columns>
    <SignUp {...props} />
    <SignUp {...props} />
    <SignUp {...props} />
  </Columns>
);
export default SignupPage;
