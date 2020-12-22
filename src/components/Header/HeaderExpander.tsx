import React, { FC } from 'react';


import { SvgIcon } from '@material-ui/core';

import { connect, ConnectedProps } from 'react-redux';
import { headerExpandSelector, toggleHeaderExpand } from 'state/header';
import { RootState } from 'state/store';
import styled from 'styled-components';
import { StyledNavLink } from './BaseToolbar';
import { useTheme } from 'styled-components';

// sub components
const TranslateGroup = styled.g<{ $active: boolean }>`
    transition: ${({ $active }) => ($active ?
        'transform .1806s cubic-bezier(0.04, 0.04, 0.12, 0.96)' :
        'transform .1596s cubic-bezier(0.52, 0.16, 0.52, 0.84) .1008s')};
`;
const RotateGroup = styled.g<{ $active: boolean }>`
    transition: transform 0.1596s cubic-bezier(0.52, 0.16, 0.52, 0.84) 0.1008s;
    transition: ${({ $active }) => ($active ?
        'transform .3192s cubic-bezier(0.04, 0.04, 0.12, 0.96) .1008s' :
        'transform .1806s cubic-bezier(0.04, 0.04, 0.12, 0.96)')};
    transform-origin: 50% 0;
`;

const StlyedLine = styled.line`
    stroke: white;
    stroke-width: 1;
`;

// main component
const mapStateToProps = (state: RootState) => ({
    expand: headerExpandSelector(state)
});

const mapDispatchToProps = {
    toggleHeaderExpand
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type HeaderExpanderProps = ConnectedProps<typeof connector> & { className?: string; };

const generateDimension = (xOffset: number, yOffset: number) => ({ x1: xOffset, x2: 1 - xOffset, line1Y: yOffset, line2Y: 1 - yOffset });

const { x1, x2, line1Y, line2Y } = generateDimension(0.14, 0.35);

const HeaderExpander: FC<HeaderExpanderProps> = ({ expand, toggleHeaderExpand }) => {

    const theme = useTheme();
    const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        toggleHeaderExpand();
    }
    
    const size = theme.spacing(3);
    const backSlashY = (expand ? 0.5 : line1Y) * size;
    const forwardSlashY = (expand ? 0.5 : line2Y) * size;
    return (
        <StyledNavLink to="" onClick={onClick} exact>
            <SvgIcon fontSize="small">
                <TranslateGroup $active={expand} transform={`translate(0, ${backSlashY})`}>
                    <RotateGroup $active={expand} transform={`rotate(${expand ? 45 : 0})`}>
                        <StlyedLine x1={x1*size} x2={x2*size} y1={0} y2={0} />
                    </RotateGroup>
                </TranslateGroup>
                <TranslateGroup $active={expand} transform={`translate(0, ${forwardSlashY})`}>
                    <RotateGroup $active={expand} transform={`rotate(${expand ? -45 : 0})`}>
                        <StlyedLine x1={x1*size} x2={x2*size} y1={0} y2={0} />
                    </RotateGroup>
                </TranslateGroup>
            </SvgIcon>
        </StyledNavLink>
    );
};

export default connector(HeaderExpander);