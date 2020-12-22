import { Box, Grid } from "@material-ui/core";
import React, { FC, useMemo } from "react";
import styled, { keyframes, useTheme } from "styled-components";
import { range } from 'lodash';

const StyledGrid = styled(Grid)`
    margin: auto;
    position: absolute;
    height: 100%;
`;

const LoadingContainer = styled.div<{ $height: number, $width: number }>`
    height: ${({$height})=>$height}px;
    width: ${({$width})=>$width}px;
    position: relative;
`;

const boxRotation = keyframes`
    from {
        transform: translate(-50%, -50%) rotate(0);
    }
    to {
        transform: translate(-50%, -50%) rotate(90deg);
    }
`;

const BlurBox = styled(Box)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 100%;
    width: 100%;
    border-radius: 5%;

    background-color:  ${({ theme })=>theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.5)' : 'rgba(255, 255, 255, 0.5)'};
    border: 1px solid ${({ theme })=>theme.palette.type === 'light' ? 'rgba(0,0,0, 0.2)' : 'rgba(255, 255, 255, 0.2)'};
    backdrop-filter: blur(1px);

    animation-name: ${boxRotation};
    animation-timing-function: ease;
    animation-iteration-count: infinite;
    /* animation-direction: reverse; */
    animation-duration: 1s;
`;

const translationAnimation = () => {
    const n = 25;
    return range(n+1).reduce((s, i) => {
        return s + `
            ${50 + i/n*50}% {
                left: ${Math.round(5000*(1-Math.cos(i/n * Math.PI)))/100}%; top: ${Math.round(100*(100- 100*Math.sin(i/n*Math.PI)))/100}%;
            }
        `;
    }, '')
};

const translation = keyframes`
    0% {
        left: 100%; top: 100%;
    }
    ${translationAnimation()}
`;

const RectCointainer = styled.div`
    position: absolute;
    left: 100%;
    top: 100%;
    animation-name: ${translation};
    animation-timing-function: ease;
    animation-iteration-count: infinite;
    animation-duration: 2s;
    transform: translate(-50%, -50%);

    &:nth-of-type(2) {
        animation-delay: 1s;
    }
`;

const rectRotation = keyframes`
    0% {
        transform: rotate(0);
    }
    56% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(180deg);
    }
`;

const RotatingRect = styled.div<{ $rectSize: number }>`
    background-color: ${({ theme })=>theme.palette.type === 'light' ? 'rgba(0,0,0, 0.4)' : 'rgba(255, 255, 255, 0.4)'};
    border: 1px solid ${({ theme })=>theme.palette.type === 'light' ? 'rgba(0,0,0, 0.2)' : 'rgba(255, 255, 255, 0.2)'};
    backdrop-filter: blur( ${({ theme })=>theme.spacing(0.5)}px);
    border-radius: 10%;
    height: ${({ $rectSize })=> $rectSize}px;
    width: ${({ $rectSize })=> $rectSize}px;

    animation-name: ${rectRotation};
    animation-timing-function: ease;
    animation-iteration-count: infinite;
    animation-duration: 2s;

    ${RectCointainer}:nth-of-type(2) & {
        animation-delay: 1s;
    }
`;

const Loading: FC = () => {
    const theme = useTheme();

    const dimension = useMemo(() => {
        const rectSize = theme.spacing(10);
        const w = 1.5 * rectSize;
        const h = 1.5 * rectSize;

        return {
            w,
            h,

            rect: {
                size: rectSize
            },

            path: {
                rx: (w - rectSize)/2,
                ry: h - rectSize,
            }
        }
    }, [theme]);

    const { size: rectSize } = dimension.rect;

    return (
        <StyledGrid container justify="center" alignItems="center">
            <LoadingContainer $height={dimension.h} $width={dimension.w} >
                <BlurBox />
                <RectCointainer>
                    <RotatingRect $rectSize={rectSize} />
                </RectCointainer>
                <RectCointainer>
                    <RotatingRect $rectSize={rectSize} />
                </RectCointainer>
            </LoadingContainer>
        </StyledGrid>
    );
}

export default Loading;