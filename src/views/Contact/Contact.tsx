import React, { FC } from "react";
import { ReactComponent as Logo } from 'assets/img/logo/logo_512.svg';
import { Container } from "@material-ui/core";

// TODO: use markdown for contacts
const Contact: FC = () => {
    return (
        <Container maxWidth="md">
        <Logo />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        </Container>);
}
export default Contact;