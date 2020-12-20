import { SvgIcon, Tooltip, Zoom } from '@material-ui/core';
import { createSelector } from '@reduxjs/toolkit';
import React, { FC, useEffect, useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { RootState } from 'state/store';
import { darkModeSelector, toggleDarkMode } from 'state/theme';
import { Brightness4, Brightness7, BrightnessAuto } from '@material-ui/icons';
import { StyledNavLink } from './BaseToolbar';

// sub component
const StyledSvgIcon = styled(SvgIcon)<{ $previous?: boolean, $current?: boolean, component: typeof SvgIcon }>`
    position: absolute;
    transform: translateY(-50%);
    transition: top ${({ $previous, $current })=>($current || $previous ? '0.5s' : null)};
    top: ${({ $previous, $current })=> ($previous ? '150%' : $current ? '50%' : '-100%') };
`;

// main component
const darkModeRecords = {
    'auto': {
        label: "Browser Default",
        component: BrightnessAuto
    },
    'dark': {
        label: "Dark Mode",
        component: Brightness4
    },
    'light': {
        label: "Light Mode",
        component: Brightness7
    }
}

type LabelKey = keyof typeof darkModeRecords;

const darkModeKeySelector = createSelector([darkModeSelector], darkMode => (darkMode === null ? 'auto' : darkMode ? 'dark' : 'light'));

const mapStateToProps = (state: RootState) => ({
    darkModeKey: darkModeKeySelector(state)
});

const mapDispatchToProps = { toggleDarkMode };

const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector> & {
    disableTooltip?: boolean;
};
const DarkModeToggle: FC<Props> = ({ disableTooltip, darkModeKey, toggleDarkMode }) => {

    const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        toggleDarkMode();
    }

    const previousDarkModeKey = useRef<null | string>(null);

    useEffect(() => {
        previousDarkModeKey.current = darkModeKey;
    }, [darkModeKey])

    return (
        <Tooltip
            TransitionComponent={Zoom}
            title={`Theme - ${darkModeRecords[darkModeKey as LabelKey].label}`}
            placement="bottom"
            disableHoverListener={disableTooltip}
            disableFocusListener={disableTooltip}
            disableTouchListener={disableTooltip}
            enterDelay={500}
        >
            <StyledNavLink to="" onClick={onClick}>
                <SvgIcon fontSize="small" visibility="hidden" />
                {Object.entries(darkModeRecords).map(([key, record]) => {
                    return <StyledSvgIcon $previous={previousDarkModeKey.current === key} $current={darkModeKey === key} aria-label={record.label} component={record.component} fontSize="small" />
                })}
            </StyledNavLink>
        </Tooltip>
    );
};

DarkModeToggle.propTypes = {
    disableTooltip: PropTypes.bool,
    darkModeKey: PropTypes.oneOf(['auto', 'dark', 'light']).isRequired,
    toggleDarkMode: PropTypes.func.isRequired
};

export default connector(DarkModeToggle);
