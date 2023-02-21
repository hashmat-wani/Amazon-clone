import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { loginWithGoogle, logoutWithGoogle } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { user } = useSelector((state) => state.authReducer);

  const dispatch = useDispatch();
  const nav = useNavigate();
  const logIn = () => {
    dispatch(loginWithGoogle(nav));
  };

  const logOut = () => {
    dispatch(logoutWithGoogle());
  };
  const handleAuth = (val) => (val === "Sign Out" ? logOut() : logIn());

  return (
    <Container>
      <Content>
        <AmazonLogo src="http://media.corporate-ir.net/media_files/IROL/17/176060/Oct18/Amazon%20logo.PNG" />
        <LoginBtn onClick={(e) => handleAuth(e.target.innerText)}>
          {user ? "Sign Out" : "Sign in with Google"}
        </LoginBtn>
      </Content>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f8f8f8;
  display: grid;
  place-items: center;
`;

const Content = styled.div`
  padding: 70px;
  background: white;
  border-radius: 5px;
  box-shadow: 0 1px 3px gray;
  text-align: center;
  display: grid;
  place-items: center;

  @media (max-width: 767px) {
    height: 100vh;
    width: 100%;
  }
`;

const AmazonLogo = styled.img`
  height: 100px;
  margin-bottom: 30px;
`;

const LoginBtn = styled.button`
  margin-top: 30px;
  background-color: #f0c14b;
  border: 2px solid #a88734;
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;
`;
