import React, { FC } from 'react';

import { ReactComponent as Logo } from 'assets/img/logo/logo_24.svg';

import { Container, SvgIcon } from '@material-ui/core';

import styled from 'styled-components';
import BaseToolbar, { StyledNavLink } from './BaseToolbar';
import HeaderExpander from './HeaderExpander';
import DarkModeToggle from './DarkModeToggle';

// sub components
const SmallerGutterToolbar = styled(BaseToolbar)`
    padding: ${({theme})=>theme.spacing(0, 1.5)};
`;

// main component

type MobileNavBarProps = { className?: string; };

const MobileToolbar: FC<MobileNavBarProps> = () => {

    return (
        <Container maxWidth="md" component="nav" disableGutters>
            <SmallerGutterToolbar variant="dense" component="ul">
                <li>
                    <HeaderExpander />
                </li>
                
                <li>
                    <StyledNavLink to="/">
                        <SvgIcon component={Logo} fontSize="small" />
                    </StyledNavLink>
                </li>
                <li>
                    <DarkModeToggle disableTooltip />
                </li>
            </SmallerGutterToolbar>
        </Container>
    );
};

export default MobileToolbar;