import React, { FC } from "react";
import { Container, Box, Typography, Button, Grid, SvgIcon } from "@material-ui/core";
import { Email } from "@material-ui/icons";
import { ReactComponent as LinkedInLogo } from 'assets/img/third-party/linkedIn-logo.svg';

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
                  <Button variant="outlined" size="large" href="mailto: s.richard.jason@gmail.com" startIcon={<Email />}>
                    Email
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" size="large" href="https://www.linkedin.com/in/s-richard-jason" target="_blank" startIcon={<SvgIcon viewBox="0 0 34 34" component={LinkedInLogo} />}>
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