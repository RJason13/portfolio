import React, { FC } from "react";
import { Box, Container, Typography } from "@material-ui/core";

const Home: FC = () => {
    return (
        <Container maxWidth="md">
          <Box component={"section"} py={5}>
            <Box py={5} textAlign="center">
              <Typography variant="h2">
                Richard Jason
              </Typography>
              <Typography variant="h3">
                Software Development Engineer
              </Typography>
              <Typography variant="h4">
                Web - Desktop - Mobile
              </Typography>
              <Typography variant="h4">
                Application Development
              </Typography>
            </Box>
          </Box>
        </Container>);
}
export default Home;