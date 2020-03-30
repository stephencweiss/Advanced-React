import { Nav } from ".";
import Link from "next/link";
import styled from "styled-components";

const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  transform: skew(-11deg);

  a {
    padding: 0.5rem 1rem;
    background: ${({ theme }) => theme.red};
    color: white;
    text-transfrom: upper;
    text-decoration: none;
  }

  @media( max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;


export function Header() {
  return (
    <div>
      <div className="bar">
        <Logo>
          <Link href="/">
            <a>Sick Fits</a>
          </Link>
        </Logo>
        <Nav />
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
      <div>Cart</div>
    </div>
  );
}
