import React, { FC } from 'react';

import { ReactComponent as Logo } from 'assets/img/logo/logo_24.svg';

import { Container, SvgIcon, useMediaQuery } from '@material-ui/core';

import styled, { DefaultTheme } from 'styled-components';
import BaseToolbar, { StyledNavLink } from './BaseToolbar';
import DarkModeToggle from './DarkModeToggle';
import DownloadResumeIcon from './DownloadResume';

// sub components

const MorphingToolbar = styled(BaseToolbar)`
    ${({theme}) => theme.breakpoints.down('xs')} {
        flex-direction: column;
        align-items: stretch;
        padding-left: ${({theme}) => theme.spacing(5)}px;
        padding-right: ${({theme}) => theme.spacing(5)}px;
    }
`;

const MorphingNavLink = styled(StyledNavLink)`
    ${({theme}) => theme.breakpoints.down('xs')} {
        border-bottom: 1px solid white;
    }
`;

// main component

const DesktopToolbar: FC<{ className?: string}> = () => {

    const isXsDown = useMediaQuery((theme: DefaultTheme) => theme.breakpoints.down('xs'));

    return (
            <Container maxWidth="md" component="nav" disableGutters>
                <MorphingToolbar variant="dense" component="ul">
                    <li hidden={isXsDown}>
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
                    <li hidden={isXsDown}>
                        <DownloadResumeIcon />
                    </li>
                    <li hidden={isXsDown}>
                        <DarkModeToggle />
                    </li>
                </MorphingToolbar>
            </Container>
    );
};

export default DesktopToolbar;