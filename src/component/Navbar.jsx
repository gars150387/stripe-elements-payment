import { useStytchSession } from "@stytch/stytch-react";
import { NavLink } from "react-router-dom";

export const Navbar = ({ handleLogout }) => {
    const session = useStytchSession()
    // console.log({...session.authentication_factors[0].email_factor})
  return (
    <nav style={{ display: "flex"}}>
      <NavLink to="/">Home</NavLink>
      {!session && <NavLink to="/login">Login</NavLink>}
      {session && <NavLink to="/account">Account</NavLink>}
      {session && <button onClick={ handleLogout } className="btn-danger" >Logout</button>}
    </nav>
  );
};
