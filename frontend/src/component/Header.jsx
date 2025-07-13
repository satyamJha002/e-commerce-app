import { FaShoppingCart, FaUser } from "react-icons/fa";

const Header = () => {
  return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-base-100 shadow-sm flex justify-between items-center px-8 py-4">
        <a className="btn btn-ghost text-xl flex items-center gap-2" href="/">
          <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              className="fill-current"
          >
            <path d="..."></path>
          </svg>
          EliteMart
        </a>
        <div className="flex items-center gap-4">
          <a href="/cart" className="btn btn-ghost flex items-center gap-2">
            <FaShoppingCart />
            Cart
          </a>
          <a href="/orders" className="btn btn-ghost flex items-center gap-2">
            Orders
          </a>
          <details className="dropdown dropdown-hover">
            <summary className="btn flex items-center gap-2">
              <FaUser />
              Account
            </summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-10 w-40 p-2 shadow-lg right-0">
              <li><a href="/login">Login</a></li>
              <li><a href="/register">Register</a></li>
              <li><a href="/profile">Profile</a></li>
              <li><a href="/admin/dashboard">Admin</a></li>
            </ul>
          </details>
        </div>
      </nav>
  );
};

export default Header;
