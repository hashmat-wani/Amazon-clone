import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import { useDispatch, useSelector } from "react-redux";
import { loginWithGoogle, logoutWithGoogle } from "../redux/authSlice";

const dashboard = [
  "Amazon Pay",
  "Today's Deals",
  "Buy Again",
  "Sell",
  "Gift Cards",
  "Baby",
];

const Header = () => {
  const { user } = useSelector((state) => state.authReducer);

  const { cartItems } = useSelector((state) => state.cartReducer);

  // cart count
  const getCartCount = () => cartItems.reduce((ac, el) => ac + el.qty, 0);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const dispatch = useDispatch();
  const nav = useNavigate();
  const logIn = () => {
    dispatch(loginWithGoogle(nav));
  };

  const logOut = () => {
    dispatch(logoutWithGoogle());
  };
  const handleAuth = (val) => (val === "Sign Out" ? logOut() : logIn());

  const { pathname } = useLocation();

  if (pathname === "/addproduct") return null;

  return (
    <header className="sticky top-0 z-10">
      <Nav>
        <NavLineOne className="text-xs">
          <NavLeftOptions>
            {/* mobile design */}
            <BurgerIcon className="flex md:hidden">
              <IconButton
                sx={{ p: 0 }}
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon fontSize="large" />
              </IconButton>

              <Menu
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link to="/login">
                    <Typography className="link">
                      <OptionLineOne>
                        Hello,{user ? user.name.split(" ")[0] : "sign in"}
                      </OptionLineOne>
                      <OptionLineTwo>Account & Lists</OptionLineTwo>
                    </Typography>
                  </Link>
                </MenuItem>

                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography className="link">
                    <OptionLineOne>Returns</OptionLineOne>
                    <OptionLineTwo>& Orders</OptionLineTwo>
                  </Typography>
                </MenuItem>
              </Menu>
            </BurgerIcon>
            {/* desktop design */}
            <Link to="/">
              <NavLogo>
                <img alt="brand-logo" src="https://i.imgur.com/7I9Was5.png" />
              </NavLogo>
            </Link>

            <NavOptionAddress>
              <LocationOnIcon />
              <NavOption className="link">
                <OptionLineOne>Hello</OptionLineOne>
                <OptionLineTwo>Select Your Address</OptionLineTwo>
              </NavOption>
            </NavOptionAddress>
          </NavLeftOptions>

          <NavSearch className="hidden md:flex">
            <NavSearchInput placeholder="Search Amazon.in" type="text" />
            <NavSearchIcon>
              <SearchIcon />
            </NavSearchIcon>
          </NavSearch>

          <NavRightOptions>
            {/* desktop view */}
            <NavItems className="hidden md:flex">
              <NavOption className="link">
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <OptionLineOne>
                    Hello, {user ? user.name.split(" ")[0] : "sign in"}
                  </OptionLineOne>
                  <OptionLineTwo>Account & Lists</OptionLineTwo>
                </Link>
              </NavOption>

              <NavOption className="link">
                <OptionLineOne>Returns</OptionLineOne>
                <OptionLineTwo>& Orders</OptionLineTwo>
              </NavOption>
            </NavItems>

            {/* mobile view */}
            <UserAvatar className="flex md:hidden">
              <IconButton
                style={{
                  padding: 0,
                }}
                onClick={handleOpenUserMenu}
              >
                <p className="text-white font-bold text-xs flex">
                  {user ? user.name.split(" ")[0] : "Sign in"}
                  <KeyboardArrowRightIcon
                    sx={{ width: 18, height: 18 }}
                    style={{ padding: 0, color: "white" }}
                    fontSize="small"
                  />
                </p>

                <Avatar
                  sx={{ width: 35, height: 35 }}
                  alt="Remy Sharp"
                  src={user ? user.avatar : ""}
                >
                  {!user && <Person2OutlinedIcon style={{ color: "white" }} />}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    onClick={(e) => handleAuth(e.target.innerText)}
                    textAlign="center"
                  >
                    {user ? "Sign Out" : "Sign in with Google"}
                  </Typography>
                </MenuItem>
              </Menu>
            </UserAvatar>

            {/* cart */}
            <Link to="/cart">
              <NavOptionCart>
                <span className="absolute top-0 right-0 md:right-11 h-4 w-4 bg-yellow-400 text-black font-bold rounded-full text-center">
                  {getCartCount()}
                </span>
                <ShoppingCartOutlinedIcon fontSize="large" />
                <p className="hidden md:inline text-xs font-extrabold link mt-1">
                  Basket
                </p>
              </NavOptionCart>
            </Link>
          </NavRightOptions>
        </NavLineOne>

        {/* Mobile view search */}
        <NavSearch className="flex md:hidden">
          <NavSearchInput placeholder="Search Amazon.in" type="text" />
          <NavSearchIcon>
            <SearchIcon />
          </NavSearchIcon>
        </NavSearch>
      </Nav>

      {/* Dashboard */}
      <Dashboard className=" text-white xs-font text-xs p-2 text-gray flex justify-between">
        <div className="items-center space-x-3 hidden md:flex">
          <p className="flex items-center space-x-2">
            <MenuIcon fontSize="small" />
            All
          </p>
          {dashboard.map((el, i) => (
            <p key={i} className="link">
              {el}
            </p>
          ))}
        </div>
        <p className="flex md:hidden items-center">
          <LocationOnIcon />
          {user
            ? "Deliver to Hashmat - Baramula 193101"
            : "Select a location to see product availability"}
        </p>

        <AddProduct onClick={() => nav("/addproduct")}>
          Add New Product
        </AddProduct>
      </Dashboard>
    </header>
  );
};
export default Header;

const Nav = styled.div`
  z-index: 1;
  top: 0;
  background-color: #131921;
  display: flex;
  flex-direction: column;
  color: white;
  gap: 10px;
  padding: 10px;
`;

const NavLineOne = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
`;

const BurgerIcon = styled.div``;

const NavLeftOptions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const NavLogo = styled.div`
  img {
    width: 100px;
  }
`;

const NavSearch = styled.div`
  flex-grow: 1;
  height: 40px;
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
  :focus-within {
    box-shadow: 0 0 0 3px #f90;
  }
`;

const NavSearchInput = styled.input`
  flex-grow: 1;
  padding: 10px;
  :focus {
    outline: none;
  }
`;

const NavSearchIcon = styled.div`
  background-color: #febd69;
  width: 45px;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NavRightOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 20px;
`;

const UserAvatar = styled.div``;

const NavOptionAddress = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  @media (max-width: 767px) {
    display: none;
  }
`;

const OptionLineOne = styled.div`
  font-size: 12px;
`;

const OptionLineTwo = styled.div`
  font-weight: 900;
  text-decoration: none;
  font-size: 12px;
`;

const NavItems = styled.div`
  gap: 20px;
`;

const NavOption = styled.div``;

const NavOptionCart = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  gap: 4px;
  color: white;
`;

const Dashboard = styled.div`
  background-color: #232f3e;
`;

const AddProduct = styled.button`
  background-color: #f0c14b;
  border: 2px solid #a88734;
  font-size: 14px;
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;
`;
