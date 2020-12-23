import React, { FC } from 'react';

import { ReactComponent as Logo } from 'assets/img/logo/logo_24.svg';

import { Container, Fade, SvgIcon } from '@material-ui/core';

import styled from 'styled-components';
import BaseToolbar, { StyledNavLink } from './BaseToolbar';
import HeaderExpander from './HeaderExpander';
import DarkModeToggle from './DarkModeToggle';
import { connect, ConnectedProps } from 'react-redux';
import { headerExpandSelector, toggleHeaderExpand } from 'state/header';
import { RootState } from 'state/store';

// sub components
const SmallerGutterToolbar = styled(BaseToolbar)`
    padding: ${({theme})=>theme.spacing(0, 1.5)};
    overflow-y: hidden;
`;

// main component
const mapStateToProps = (state: RootState) => ({
    headerExpand: headerExpandSelector(state)
});

const mapDispatchToProps = {
    toggleHeaderExpand
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type MobileNavBarProps = ConnectedProps<typeof connector> & { className?: string; };

const MobileToolbar: FC<MobileNavBarProps> = ({ headerExpand, toggleHeaderExpand }) => {

    return (
        <Container maxWidth="md" component="nav" disableGutters>
            <SmallerGutterToolbar variant="dense" component="ul">
                <li>
                    <HeaderExpander />
                </li>
                
                <li>
                    <StyledNavLink to="/" exact onClick={() => toggleHeaderExpand(false)}>
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

export default connector(MobileToolbar);