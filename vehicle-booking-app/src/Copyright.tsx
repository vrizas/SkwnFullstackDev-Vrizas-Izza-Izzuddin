import * as React from 'react';
import Typography from '@mui/material/Typography';
import MuiLink from '@mui/material/Link';

export default function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <MuiLink color="inherit" href="/">
                PT. Tambang Nikel
            </MuiLink>{' '}
            {new Date().getFullYear()}.
        </Typography>
    );
}
