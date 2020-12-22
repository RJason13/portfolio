import React, { FC } from 'react';

import { ReactComponent as Logo } from 'assets/img/logo/logo_24.svg';

import { Container, Fade, SvgIcon } from '@material-ui/core';

import styled from 'styled-components';
import BaseToolbar, { StyledNavLink } from './BaseToolbar';
import HeaderExpander from './HeaderExpander';
import DarkModeToggle from './DarkModeToggle';
import { useSelector } from 'react-redux';
import { headerExpandSelector } from 'state/header';

// sub components
const SmallerGutterToolbar = styled(BaseToolbar)`
    padding: ${({theme})=>theme.spacing(0, 1.5)};
    overflow-y: hidden;
`;

// main component

type MobileNavBarProps = { className?: string; };

const MobileToolbar: FC<MobileNavBarProps> = () => {

    const headerExpand = useSelector(headerExpandSelector);

    return (
        <Container maxWidth="md" component="nav" disableGutters>
            <SmallerGutterToolbar variant="dense" component="ul">
                <li>
                    <HeaderExpander />
                </li>
                
                <li>
                    <StyledNavLink to="/" exact>
                        <SvgIcon component={Logo} fontSize="small" />
                    </StyledNavLink>
                </li>
                <Fade in={!headerExpand}>
                    <li>
                        <DarkModeToggle disableTooltip />
                    </li>
                </Fade>
            </SmallerGutterToolbar>
        </Container>
    );
};

export default MobileToolbar;