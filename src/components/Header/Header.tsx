import React, { FC } from 'react';


import { Hidden, useMediaQuery } from '@material-ui/core';

import { AppBar } from '@material-ui/core';
import { connect, ConnectedProps } from 'react-redux';
import styled, { DefaultTheme } from 'styled-components';
import DesktopToolbar from './DesktopToolbar';
import MobileToolbar from './MobileToolbar';
import { navbarHeight } from 'utils/ui';
import { RootState } from 'state/store';
import { headerExpandSelector } from 'state/header';

// sub components
const ExpandableAppbar = styled(AppBar)<{ $expand: boolean }>`
    height: ${({theme, $expand})=> $expand ? "100%" : navbarHeight(theme)};
    background-color: ${({ $expand })=> $expand ? '#000' : 'rgba(0,0,0,0.8)' };
    overflow-y: hidden;
    backdrop-filter: saturate(180%) blur(20px);
    transition: ${({ $expand })=> $expand ? 
        'background .36s cubic-bezier(0.32, 0.08, 0.24, 1),height .56s cubic-bezier(0.52, 0.16, 0.24, 1)' :
        'background .44s .2s cubic-bezier(0.52, 0.16, 0.24, 1), height .56s cubic-bezier(0.52, 0.16, 0.24, 1)'
    };
    user-select: none;
`;

// main component

const mapStateToProps = (state: RootState) => ({
    expand: headerExpandSelector(state)
});

const connector = connect(mapStateToProps);

type HeaderProps = ConnectedProps<typeof connector> & { className?: string; };

const Header: FC<HeaderProps> = ({ className, expand }) => {
    const isSmDown = useMediaQuery((theme: DefaultTheme) => theme.breakpoints.down('sm'));

    return (
        <>
            {/* <Backdrop /> */}
            <ExpandableAppbar className={className} position="fixed" color="default" $expand={isSmDown && expand}>
                <Hidden mdUp>
                    <MobileToolbar />
                </Hidden>
                <DesktopToolbar />
                {/* <SearchContainer /> */}
            </ExpandableAppbar>
        </>
    );
};

export default connector(Header);