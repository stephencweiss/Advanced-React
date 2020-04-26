import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import User from "./User";
export function Nav() {
  return (
    <NavStyles>
      <User>
        {({ data: {identity} }) => {
          console.log(identity);
          return <p>{identity.name}</p>;
        }}
      </User>
      <Link href="/items">
        <a>Shop</a>
      </Link>
      <Link href="/sell">
        <a>Sell</a>
      </Link>
      <Link href="/signup">
        <a>Signup</a>
      </Link>
      <Link href="/orders">
        <a>Orders</a>
      </Link>
      <Link href="/me">
        <a>Account</a>
      </Link>
    </NavStyles>
  );
}
