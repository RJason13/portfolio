import React, { FC } from 'react';

import { ReactComponent as Logo } from 'assets/img/logo/logo_24.svg';

import { Container, SvgIcon, useMediaQuery } from '@material-ui/core';

import styled, { DefaultTheme } from 'styled-components';
import BaseToolbar, { StyledNavLink } from './BaseToolbar';
import DarkModeToggle from './DarkModeToggle';
import DownloadResumeIcon from './DownloadResume';

// sub components

const MorphingToolbar = styled(BaseToolbar)`
    ${({theme}) => theme.breakpoints.down('sm')} {
        flex-direction: column;
    }
`;

const MorphingNavLink = styled(StyledNavLink)`
`;

// main component

const DesktopToolbar: FC<{ className?: string}> = () => {

    const isSmDown = useMediaQuery((theme: DefaultTheme) => theme.breakpoints.down('sm'));

    return (
            <Container maxWidth="md" component="nav" disableGutters>
                <MorphingToolbar variant="dense" component="ul">
                    <li hidden={isSmDown}>
                        <MorphingNavLink to="/">
                            <SvgIcon component={Logo} fontSize="small" />
                        </MorphingNavLink>
                    </li>
                    <li>
                        <MorphingNavLink to="projects" >Projects</MorphingNavLink>
                    </li>
                    <li>
                        <MorphingNavLink to="about" >About</MorphingNavLink>
                    </li>
                    <li>
                        <MorphingNavLink to="contact" >Contact</MorphingNavLink>
                    </li>
                    {/* <li hidden={isSmDown}>
                        <MorphingNavLink to="" onClick={(e)=>e.preventDefault()}>
                            <SearchIcon fontSize="small" onClick={expandSearchBar} />
                        </MorphingNavLink>
                    </li> */}
                    <li hidden={isSmDown}>
                        <DownloadResumeIcon />
                    </li>
                    <li hidden={isSmDown}>
                        <DarkModeToggle />
                    </li>
                </MorphingToolbar>
            </Container>
    );
};

export default DesktopToolbar;