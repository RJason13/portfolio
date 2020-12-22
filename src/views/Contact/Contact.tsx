import React, { FC } from "react";
import { Container, Box, Typography, Button, Grid } from "@material-ui/core";
import { Email } from "@material-ui/icons";
import { ReactComponent as LinkedInLogo } from 'assets/img/third-party/linkedIn-logo.svg';
import styled, { css } from "styled-components";

// sub component

const LogoMixin = css`
    vertical-align: text-bottom;
    height: ${({theme})=>theme.spacing(2.5)}px;
    width: ${({theme})=>theme.spacing(2.5)}px;

    transition: fill 0.2s, background 0.2s;
    fill:rgb(139, 148, 158);
`;

const StyledLinkedInLogo = styled(LinkedInLogo)`
  ${LogoMixin}
`;

// main component
// TODO: use markdown for contacts
const Contact: FC = () => {
    return (
      <Container maxWidth="md">
        <Box component={"section"} py={5}>
          <Box py={5} textAlign="center">
            <Typography variant="h4">
              Feel free to contact me via:
            </Typography>
            <Box py={2}>
              <Grid container justify="center" spacing={2}>
                <Grid item>
                  <Button variant="outlined" size="large" href="mailto: s.richard.jason@gmail.com" startIcon={<Email fontSize="large" />}>
                    Email
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" size="large" href="https://www.linkedin.com/in/s-richard-jason" target="_blank" startIcon={<StyledLinkedInLogo />}>
                    LinkedIn
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>);
}
export default Contact;