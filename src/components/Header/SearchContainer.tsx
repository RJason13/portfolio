import React, { FC } from 'react';
import { useMediaQuery, Container } from '@material-ui/core';

import { DefaultTheme } from 'styled-components';

// sub components

// main component

type MobileNavBarProps = { className?: string; };

const SearchContainer: FC<MobileNavBarProps> = () => {

    const isDownMdScreen = useMediaQuery((theme: DefaultTheme) => theme.breakpoints.down('md'));

    return (
        <Container maxWidth="md"  hidden={!isDownMdScreen} component="nav">
            
        </Container>
    );
};

export default SearchContainer;