import React, { FC } from "react";
import { ReactComponent as Logo } from 'assets/img/logo/logo_512.svg';
import { Container, Typography } from "@material-ui/core";

const Home: FC = () => {
    return (
        <Container maxWidth="md">
          <p>
            <Typography variant="h3">
              Software Development Engineer<br/>
              Web, Desktop, and Mobile Application Developer
            </Typography>
          </p>
        </Container>);
}
export default Home;