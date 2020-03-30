import { Nav } from ".";
export function Header() {
  return (
    <div>
      <div className="bar">
        <a href="">Sick Fits</a>
        <Nav />
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
      <div>Cart</div>
    </div>
  );
}
