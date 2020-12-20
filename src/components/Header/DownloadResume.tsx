import { Tooltip, Zoom } from '@material-ui/core';
import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { Description as DescriptionIcon } from '@material-ui/icons';
import { StyledNavLink } from './BaseToolbar';

type Props = {
    disableTooltip?: boolean;
};

const DownloadResumeIcon: FC<Props> = ({ disableTooltip }) => {
    const label = 'Download Resume';

    const promptDownloadResume = () => {
        console.log('test');
    };
    const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        promptDownloadResume();
    }
    return (
        <Tooltip
            TransitionComponent={Zoom}
            title={label}
            placement="bottom"
            disableHoverListener={disableTooltip}
            disableFocusListener={disableTooltip}
            disableTouchListener={disableTooltip}
            enterDelay={500}
        >
        <StyledNavLink to="" onClick={onClick}>
            <DescriptionIcon aria-label={label} fontSize="small" />
        </StyledNavLink>
        </Tooltip>
    );
};

DownloadResumeIcon.propTypes = {
    disableTooltip: PropTypes.bool
};

export default DownloadResumeIcon;