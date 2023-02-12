import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from '../src/Chart';
import BookingsTable from '../src/BookingsTable';
import Copyright from '../src/Copyright';
import FixedContent from '../src/FixedContent';
import Expenses from '../src/Expenses';
import api from '../utils/api';

export default function Home() {
    const [reports, setReports] = React.useState(null);
    const [approvals, setApprovals] = React.useState(null);

    React.useEffect(() => {
        const getReports = async () => {
            const resultReports = await api.getVehicleReports();
            setReports(resultReports);
        }

        const getApprovals = async () => {
            const resultApprovals = await api.getApprovals();
            setApprovals(resultApprovals);
        }

        getReports();
        getApprovals();
    }, []);

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <FixedContent />
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Grid container spacing={3}>
                        {/* Chart */}
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 240,
                                }}
                            >
                                <Chart approvals={approvals} reports={reports} />
                            </Paper>
                        </Grid>
                        {/* Recent Expenses */}
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 240,
                                }}
                            >
                                <Expenses reports={reports} approvals={approvals} />
                            </Paper>
                        </Grid>
                        {/* Recent Bookings */}
                        <Grid item xs={12}>
                            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                <BookingsTable approvals={approvals} reports={reports} setApprovals={setApprovals} />
                            </Paper>
                        </Grid>
                    </Grid>
                    <Copyright sx={{ pt: 4 }} />
                </Container>
            </Box>
        </Box>
    );
}