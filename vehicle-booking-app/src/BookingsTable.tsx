import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useRouter } from 'next/router';
import { Button, Stack, TableContainer } from '@mui/material';
import api from '../utils/api';
import AuthUserContext from '../contexts/AuthUserContext';

type Props = {
    approvals: any,
    reports: any,
    setApprovals: any,
}

// Generate Order Data
function createData(
    id: number,
    date: string,
    vehicle: string,
    driver: string,
    serviceDate: string,
    fuelUsage: number,
    fuelType: string,
    description: string,
    approved: number,
) {
    return { id, date, vehicle, driver, serviceDate, fuelUsage, fuelType, description, approved };
}

export default function BookingsTable({ approvals, reports, setApprovals }: Props) {
    const drivers: any = {
        1: 'Budi',
        2: 'Roni',
        3: 'Malik',
    };
    const vehicles: any = {
        1: 'Hino',
        2: 'Mitsubishi',
        3: 'Isuzu',
    };
    const [rows, setRows] = React.useState<any>([]);
    const { authUser } = React.useContext(AuthUserContext);
    const router = useRouter();

    function moreHandler(event: React.MouseEvent) {
        event.preventDefault();
        router.push('/bookings');
    }

    async function approveHandler(id: number) {
        try {
            const approve = await api.approveReport({ user_id: authUser.id }, id);
            const resultApprovals = await api.getApprovals();
            setApprovals(resultApprovals);
            alert(approve.message);
        } catch (err: any) {
            alert(err.message);
        }
    }

    async function markAsDoneHandler(id: number) {
        try {
            const approve = await api.markAsDoneReport(id);
            const resultApprovals = await api.getApprovals();
            setApprovals(resultApprovals);
            alert(approve.message);
        } catch (err: any) {
            alert(err.message);
        }
    }

    React.useEffect(() => {
        if (reports && approvals) {
            let data = [] as Array<Object>;

            if (router.asPath === '/') {
                for (let i = reports.length - 1; i > reports.length - 4; i--) {
                    let approved = 0;
                    let filteredApprovals = approvals.filter((approval: any) => approval.vehicle_report_id === reports[i].id);
                    if (authUser.role.name !== 'admin') filteredApprovals = filteredApprovals.filter((approval: any) => approval.user_id === authUser.id);
                    const totalApprovedApprovals = filteredApprovals.filter((approval: any) => approval.approved === 1).length;
                    const totalDoneApprovals = filteredApprovals.filter((approval: any) => approval.approved === 2).length;
                    if (totalApprovedApprovals === 2 || (authUser.role.name !== 'admin' && totalApprovedApprovals > 0)) {
                        approved = 1;
                    } else if (totalDoneApprovals > 0) {
                        approved = 2;
                    }

                    data.push(
                        createData(
                            reports[i].id,
                            new Date(reports[i].operation_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
                            vehicles[reports[i].vehicle_id],
                            drivers[reports[i].driver_id],
                            new Date(reports[i].service_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
                            reports[i].fuel_usage,
                            reports[i].fuel_type,
                            reports[i].description,
                            approved
                        )
                    );
                }
            } else {
                data = reports.map((report: any) => {
                    let approved = 0;
                    let filteredApprovals = approvals.filter((approval: any) => approval.vehicle_report_id === report.id);
                    if (authUser.role.name !== 'admin') filteredApprovals = filteredApprovals.filter((approval: any) => approval.user_id === authUser.id);
                    const totalApprovedApprovals = filteredApprovals.filter((approval: any) => approval.approved === 1).length;
                    const totalDoneApprovals = filteredApprovals.filter((approval: any) => approval.approved === 2).length;
                    if (totalApprovedApprovals === 2 || (authUser.role.name !== 'admin' && totalApprovedApprovals > 0)) {
                        approved = 1;
                    } else if (totalDoneApprovals > 0) {
                        approved = 2;
                    }

                    return createData(
                        report.id,
                        new Date(report.operation_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
                        vehicles[report.vehicle_id],
                        drivers[report.driver_id],
                        new Date(report.service_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
                        report.fuel_usage,
                        report.fuel_type,
                        report.description,
                        approved,
                    )
                });

                data.reverse();
            }

            setRows(data);
        }
    }, [reports, approvals]);

    return (
        <React.Fragment>

            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems="center"
                spacing={2}
            >
                <Title>Recent Bookings</Title>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    alignItems="center"
                    spacing={1}
                >
                    <Button onClick={() => api.exportExcelReports()}>Download</Button>
                    <Button onClick={() => router.push('/bookings/create')}>Make a Booking</Button>
                </Stack>
            </Stack>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Vehicle</TableCell>
                            <TableCell>Driver</TableCell>
                            <TableCell>Service Date</TableCell>
                            <TableCell>Fuel Usage</TableCell>
                            <TableCell>Fuel Type</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell align="right">Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            (rows.length > 0) ?
                                rows.map((row: any) => (
                                    <TableRow key={row.id} >
                                        <TableCell>{row.date}</TableCell>
                                        <TableCell>{row.vehicle}</TableCell>
                                        <TableCell>{row.driver}</TableCell>
                                        <TableCell>{row.serviceDate}</TableCell>
                                        <TableCell>{row.fuelUsage}</TableCell>
                                        <TableCell>{row.fuelType}</TableCell>
                                        <TableCell>{row.description}</TableCell>
                                        <TableCell align="right">{row.approved === 2 ? <Button disabled>Done</Button> : authUser.role.name === 'admin' ? (row.approved === 1 ? <Button onClick={() => markAsDoneHandler(row.id)}>Mark as done</Button> : <Button disabled>Process</Button>) : (row.approved === 1 ? <Button disabled>Approved</Button> : <Button onClick={() => approveHandler(row.id)}>Approve</Button>)}</TableCell>
                                    </TableRow>
                                )) :
                                <TableRow>
                                    <TableCell>loading...</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {
                (router.asPath === '/') &&
                <Link color="primary" href="#" onClick={moreHandler} sx={{ mt: 3 }}>
                    See more bookings
                </Link>
            }
        </React.Fragment >
    );
}
