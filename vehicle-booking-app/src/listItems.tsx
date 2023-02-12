import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useRouter } from 'next/router';
import api from '../utils/api';
import AuthUserContext from '../contexts/AuthUserContext';

export function mainListItems() {
    const router = useRouter();

    return (
        <React.Fragment>
            <ListItemButton onClick={() => router.push('/')}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton onClick={() => router.push('/bookings')}>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Bookings" />
            </ListItemButton>
            <ListItemButton onClick={() => router.push('/bookings/create')}>
                <ListItemIcon>
                    <AddBoxIcon />
                </ListItemIcon>
                <ListItemText primary="Make a Booking" />
            </ListItemButton>
        </React.Fragment>
    );
}


export function secondaryListItems() {
    const { setAuthUser } = React.useContext(AuthUserContext);

    const signOutHandler = () => {
        api.putAccessToken('');
        setAuthUser(null);
        window.location.reload();
    }

    return (
        <React.Fragment>
            <ListItemButton onClick={signOutHandler}>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Sign out" />
            </ListItemButton>
        </React.Fragment>
    )
};
