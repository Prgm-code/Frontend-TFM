import { useState } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { Link ,useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/usersStore";

export default function Navbar() {
  const [activeItem, setActiveItem] = useState("home");
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
   
    logout();
    navigate("/");
  };

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  
  return (
    <Menu inverted>
      <Menu.Item
        as={Link}
        to="/"
        name="Login"
        active={activeItem === "Login"}
        onClick={handleItemClick}
      />
      <Menu.Item
        as={Link}
        to="/register"
        name="Register"
        active={activeItem === "Register"}
        onClick={handleItemClick}
      />
      <Menu.Item
        as={Link}
        to="/users"
        name="Users"
        active={activeItem === "Users"}
        onClick={handleItemClick}
      />
      <Menu.Item position="right">
        <Button 
        onClick={handleLogout}
        >
          Log out
        </Button>
      </Menu.Item>

    </Menu>
  );
}
