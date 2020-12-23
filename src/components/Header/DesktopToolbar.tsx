import React, { FC } from 'react';

import { ReactComponent as Logo } from 'assets/img/logo/logo_24.svg';

import { Container, SvgIcon, useMediaQuery } from '@material-ui/core';

import styled, { DefaultTheme } from 'styled-components';
import BaseToolbar, { StyledNavLink } from './BaseToolbar';
import DarkModeToggle from './DarkModeToggle';
import DownloadResumeIcon from './DownloadResume';
import { connect, ConnectedProps } from 'react-redux';
import { toggleHeaderExpand } from 'state/header';

// sub components

const StyledContainer = styled(Container)<{ component: keyof HTMLElementTagNameMap }>`
    ${({theme}) => theme.breakpoints.down('xs')} {
        &:before {
            content: '';
            display: block;
            width: 100%;
            height: 1px;
            background: #424245;
        }
    }
`;

const MorphingToolbar = styled(BaseToolbar)`
    ${({theme}) => theme.breakpoints.down('xs')} {
        flex-direction: column;
        align-items: stretch;
        padding-left: ${({theme}) => theme.spacing(5)}px;
        padding-right: ${({theme}) => theme.spacing(5)}px;
    }
`;

const StyledLi = styled.li`
    ${({theme}) => theme.breakpoints.down('xs')} {
        &:nth-child(n + 3):before {
            content: '';
            display: block;
            width: 100%;
            height: 1px;
            background: #424245;
        }
    }
`;

const MorphingNavLink = styled(StyledNavLink)`
`;

// main component

const mapDispatchToProps = {
    toggleHeaderExpand
}

const connector = connect(null, mapDispatchToProps);

type DesktopToolbarProps = ConnectedProps<typeof connector> & { className?: string; };

const DesktopToolbar: FC<DesktopToolbarProps> = ({ toggleHeaderExpand }) => {

    const isXsDown = useMediaQuery((theme: DefaultTheme) => theme.breakpoints.down('xs'));

    return (
            <StyledContainer maxWidth="md" component="nav" disableGutters>
                <MorphingToolbar variant="dense" component="ul" onClick={()=>toggleHeaderExpand(false)}>
                    <StyledLi hidden={isXsDown}>
                        <MorphingNavLink to="/" exact>
                            <SvgIcon component={Logo} fontSize="small" />
                        </MorphingNavLink>
                    </StyledLi>
                    <StyledLi>
                        <MorphingNavLink to="/projects" >Projects</MorphingNavLink>
                    </StyledLi>
                    <StyledLi>
                        <MorphingNavLink to="/about" >About</MorphingNavLink>
                    </StyledLi>
                    <StyledLi>
                        <MorphingNavLink to="/contact" >Contact</MorphingNavLink>
                    </StyledLi>
                    {/* <StyledLi hidden={isSmDown}>
                        <MorphingNavLink to="" onClick={(e)=>e.preventDefault()}>
                            <SearchIcon fontSize="small" onClick={expandSearchBar} />
                        </MorphingNavLink>
                    </StyledLi> */}
                    <StyledLi>
                        <DownloadResumeIcon />
                    </StyledLi>
                    <StyledLi hidden={isXsDown}>
                        <DarkModeToggle />
                    </StyledLi>
                </MorphingToolbar>
            </StyledContainer>
    );
};

export default connector(DesktopToolbar);