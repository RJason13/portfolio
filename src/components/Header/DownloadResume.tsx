import { Button, Dialog, DialogActions, DialogTitle, Tooltip, Zoom } from '@material-ui/core';
import React, { FC, useState } from 'react';
import PropTypes from 'prop-types';
import { Description as DescriptionIcon } from '@material-ui/icons';
import { StyledNavLink } from './BaseToolbar';

type Props = {
    disableTooltip?: boolean;
};

const DownloadResumeIcon: FC<Props> = ({ disableTooltip }) => {

    const [dialogOpen, setDialogOpen] = useState(false);
    const label = 'Download Resume';

    const promptDownloadResume = () => {
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
    };

    const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        promptDownloadResume();
    }

    return (
        <>
            <Tooltip
                TransitionComponent={Zoom}
                title={label}
                placement="bottom"
                disableHoverListener={disableTooltip}
                disableFocusListener={disableTooltip}
                disableTouchListener={disableTooltip}
                enterDelay={500}
            >
            <StyledNavLink to="" onClick={onClick} exact>
                <DescriptionIcon aria-label={label} fontSize="small" />
            </StyledNavLink>
            </Tooltip>
            <Dialog open={dialogOpen} onClose={handleClose}>
                <DialogTitle>Download My Resume?</DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleClose} component="a" href={process.env.PUBLIC_URL + '/files/resume-richard-jason_2020-12-20.pdf'} download>
                        Download
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

DownloadResumeIcon.propTypes = {
    disableTooltip: PropTypes.bool
};

export default DownloadResumeIcon;