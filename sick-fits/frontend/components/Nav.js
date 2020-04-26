import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import User from "./User";
export function Nav() {
  return (
    <User>
      {({ data: { identity } }) => (
        <NavStyles>
          <Link href="/items">
            <a>Shop</a>
          </Link>
          {identity && (
            <>
              <Link href="/sell">
                <a>Sell</a>
              </Link>
              <Link href="/orders">
                <a>Orders</a>
              </Link>
              <Link href="/me">
                <a>Account</a>
              </Link>
            </>
          )}
          {!identity && (
            <Link href="/signup">
              <a>Sign In</a>
            </Link>
          )}
        </NavStyles>
      )}
    </User>
  );
}
