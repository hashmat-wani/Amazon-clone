import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import styled from "styled-components";
import { Link } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const dashboard = [
  "Amazon Pay",
  "Today's Deals",
  "Buy Again",
  "Sell",
  "Gift Cards",
  "Baby",
];

const ResponsiveAppBar = () => {
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

  return (
    <header>
      <NavTop>
        <NavLineOne>
          <NavLeftOptions>
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
                    <Typography className="link text-xs">
                      <OptionLineOne>Hello, Hashmat</OptionLineOne>
                      <OptionLineTwo>Account & Lists</OptionLineTwo>
                    </Typography>
                  </Link>
                </MenuItem>

                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography className="link text-xs">
                    <OptionLineOne>Returns</OptionLineOne>
                    <OptionLineTwo>& Orders</OptionLineTwo>
                  </Typography>
                </MenuItem>
              </Menu>
            </BurgerIcon>

            <Link to="/">
              <NavLogo>
                <img alt="brand-logo" src="https://i.imgur.com/7I9Was5.png" />
              </NavLogo>
            </Link>
          </NavLeftOptions>

          <NavRightOptions className="text-xs">
            <NavOptionAddress>
              <LocationOnIcon />
              <NavOption className="link">
                <OptionLineOne>Hello</OptionLineOne>
                <OptionLineTwo>Select Your Address</OptionLineTwo>
              </NavOption>
            </NavOptionAddress>

            <NavSearch className="hidden md:flex">
              <NavSearchInput placeholder="Search Amazon.in" type="text" />
              <NavSearchIcon>
                <SearchIcon />
              </NavSearchIcon>
            </NavSearch>

            <NavItems className="hidden md:flex">
              <NavOption className="link">
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <OptionLineOne>Hello, Hashmat</OptionLineOne>
                  <OptionLineTwo>Account & Lists</OptionLineTwo>
                </Link>
              </NavOption>

              <NavOption className="link">
                <OptionLineOne>Returns</OptionLineOne>
                <OptionLineTwo>& Orders</OptionLineTwo>
              </NavOption>
            </NavItems>

            <UserAvatar className="flex md:hidden">
              <div
                className="link"
                style={{
                  verticalAlign: "baseline",
                }}
              >
                <b>Hashmat</b>
                <KeyboardArrowRightIcon fontSize="small" />
              </div>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
              <Menu
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </UserAvatar>

            <Link to="/cart">
              <NavOptionCart>
                <span className="absolute top-0 right-0 md:right-11 h-4 w-4 bg-yellow-400 text-black font-bold rounded-full text-center">
                  5
                </span>
                <ShoppingCartOutlinedIcon fontSize="large" />
                <p className="hidden md:inline text-xs font-extrabold link mt-1">
                  Basket
                </p>
              </NavOptionCart>
            </Link>
          </NavRightOptions>
        </NavLineOne>

        <NavLineTwo>
          <NavSearch>
            <NavSearchInput placeholder="Search Amazon.in" type="text" />

            <NavSearchIcon>
              <SearchIcon />
            </NavSearchIcon>
          </NavSearch>
        </NavLineTwo>
      </NavTop>

      <NavBottom className=" text-white xs-font text-xs p-2 text-gray ">
        <div className="items-center space-x-3 hidden md:flex">
          <p className="flex items-center space-x-2">
            <MenuIcon fontSize="small" />
            All
          </p>
          {dashboard.map((el) => (
            <p className="link">{el}</p>
          ))}
        </div>
        <p className="flex md:hidden">
          <LocationOnIcon />
          {true
            ? "Deliver to Hashmat - Baramula 193101"
            : "Select a location to see product availability"}
        </p>
      </NavBottom>
    </header>
  );
};
export default ResponsiveAppBar;

const NavTop = styled.div`
  position: sticky;
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

const NavRightOptions = styled.div`
  display: flex;
  flex-grow: 1;
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

const NavLineTwo = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
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

const OptionLineOne = styled.div``;

const OptionLineTwo = styled.div`
  font-weight: 900;
  text-decoration: none;
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

const NavBottom = styled.div`
  background-color: #232f3e;
`;
