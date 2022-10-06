import React from "react";
import styled from "styled-components";
import { auth, provider } from "../db/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = ({ user, setUser }) => {
  const nav = useNavigate();

  const handleAuth = (val) => (val === "Sign Out" ? logOut() : logIn());

  const logIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        const newUser = {
          name: user.displayName,
          email: user.email,
          phone: user.phoneNumber,
          avatar: user.photoURL,
        };
        localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
        nav("/");
      })
      .catch((err) => alert(err.message));
  };

  const logOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.removeItem("user");
        setUser(null);
      })
      .catch((err) => console.log(err.message));
  };

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
