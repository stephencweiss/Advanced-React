import Link from "next/link";
import NavStyles from './styles/NavStyles'

export function Nav() {
  return (
    <NavStyles>
      <Link href="/shop">
        <a>shop</a>
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
