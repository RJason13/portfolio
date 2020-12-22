import { Grid, Typography } from "@material-ui/core";
import React, { FC } from "react";
import styled, { css, keyframes } from "styled-components";
import { Settings as SettingsIcon } from "@material-ui/icons";

const StyledGrid = styled(Grid)`
    position: absolute;
    width: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-shadow: 2px 2px 4px ${({ theme })=>theme.palette.type === 'light' ? '#000' : '#fff'};
`;

const shadow = css`
    filter: drop-shadow(0 0 4px ${({ theme })=>theme.palette.type === 'light' ? '#000' : '#fff'});
`;

const rotation = keyframes`
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
`;

const StyledSettingsIcon = styled(SettingsIcon)`
    border-radius: 10%;

    animation-name: ${rotation};
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-duration: 4s;

    ${shadow}
`;

const ComingSoon: FC = () => {

    return (
        <StyledGrid container justify="center" alignItems="center">
            <StyledSettingsIcon className="MuiTypography-h1" /><Typography variant="h1">Coming Soon!</Typography>
        </StyledGrid>
    );
}

export default ComingSoon;