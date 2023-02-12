import * as React from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import FixedContent from '../../src/FixedContent';
import Copyright from '../../src/Copyright';
import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, TextField, OutlinedInput, ListItemText, Checkbox } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { useRouter } from 'next/router';
import dayjs, { Dayjs } from 'dayjs';
import Title from '../../src/Title';
import { Stack } from '@mui/system';
import api from '../../utils/api';
import AuthUserContext from '../../contexts/AuthUserContext';

export default function CreateBookings() {
    const { authUser } = React.useContext(AuthUserContext);
    const router = useRouter();
    const formRef = React.useRef<any>(null);
    const [drivers, setDrivers] = React.useState([]);
    const [vehicles, setVehicles] = React.useState([]);
    const [managers, setManagers] = React.useState([]);
    const [directors, setDirectors] = React.useState([]);
    const [driver, setDriver] = React.useState('');
    const [vehicle, setVehicle] = React.useState('');
    const [manager, setManager] = React.useState('');
    const [director, setDirector] = React.useState('');
    const [serviceDate, setServiceDate] = React.useState<Dayjs | null>(
        dayjs(new Date()),
    );
    const [operationDate, setOperationDate] = React.useState<Dayjs | null>(
        dayjs(new Date()),
    );

    const handleDriverChange = (event: SelectChangeEvent) => {
        setDriver(event.target.value as string);
    };

    const handleVehicleChange = (event: SelectChangeEvent) => {
        setVehicle(event.target.value as string);
    };

    const handleServiceDateChange = (newValue: Dayjs | null) => {
        setServiceDate(newValue);
    };

    const handleOperationDateChange = (newValue: Dayjs | null) => {
        setOperationDate(newValue);
    };

    const handleManagerChange = (event: SelectChangeEvent) => {
        setManager(event.target.value as string);
    };

    const handleDirectorChange = (event: SelectChangeEvent) => {
        setDirector(event.target.value as string);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        try {
            await api.createReports({
                user_id: authUser.id,
                driver_id: driver,
                vehicle_id: vehicle,
                service_date: dayjs(serviceDate).format('YYYY-MM-DD'),
                operation_date: dayjs(operationDate).format('YYYY-MM-DD'),
                fuel_type: data.get('fuel_type'),
                fuel_usage: data.get('fuel_usage'),
                description: data.get('description'),
                approvers: [manager, director],
            });

            formRef.current.reset();
            alert('Successfully booking a vehicle');
            router.push('/');
        } catch (err: any) {
            alert(err.message)
        }
    };

    React.useEffect(() => {
        const getDrivers = async () => {
            const resultDrivers = await api.getDrivers();
            setDrivers(resultDrivers);
        }

        const getVehicles = async () => {
            const resultVehicles = await api.getVehicles();
            setVehicles(resultVehicles);
        }

        const getApprovers = async () => {
            const resultManagers = await api.getManagers();
            const resultDirectors = await api.getDirectors();
            setManagers(resultManagers);
            setDirectors(resultDirectors);
        }

        getDrivers();
        getVehicles();
        getApprovers();
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
                    <Paper sx={{ p: 2 }}>
                        <Title>Make a Booking</Title>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }} ref={formRef}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={12} lg={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="driver-label">Driver</InputLabel>
                                        <Select
                                            labelId="driver-label"
                                            id="driver-select"
                                            value={driver}
                                            label="Driver"
                                            onChange={handleDriverChange}
                                        >
                                            {
                                                drivers.map((driver: any) => <MenuItem value={driver.id}>{driver.name}</MenuItem>)
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={12} lg={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="vehicle-label">Vehicle</InputLabel>
                                        <Select
                                            labelId="vehicle-label"
                                            id="vehicle-select"
                                            value={vehicle}
                                            label="Vehicle"
                                            onChange={handleVehicleChange}
                                        >
                                            {
                                                vehicles.map((vehicle: any) => {
                                                    if (vehicle.active === 0) {
                                                        return <MenuItem value={vehicle.id} disabled>{vehicle.name}</MenuItem>
                                                    }

                                                    return <MenuItem value={vehicle.id}>{vehicle.name}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={12} lg={6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            spacing={2}
                                        >
                                            <MobileDatePicker
                                                label="Service Date"
                                                inputFormat="YYYY-MM-DD"
                                                value={serviceDate}
                                                onChange={handleServiceDateChange}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                            <MobileDatePicker
                                                label="Operation Date"
                                                inputFormat="YYYY-MM-DD"
                                                value={operationDate}
                                                onChange={handleOperationDateChange}
                                                renderInput={(params) => <TextField {...params} />}
                                            />
                                        </Stack>
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12} md={12} lg={6}>
                                    <TextField
                                        fullWidth
                                        id="fuel_type"
                                        label="Fuel Type"
                                        name="fuel_type"
                                        autoComplete="fuel_type"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} md={12} lg={6}>
                                    <TextField
                                        fullWidth
                                        name="fuel_usage"
                                        label="Fuel Usage"
                                        type="number"
                                        id="fuel_usage"
                                        autoComplete="fuel_usage"
                                    />
                                </Grid>
                                <Grid item xs={12} md={12} lg={6}>
                                    <TextField
                                        fullWidth
                                        name="description"
                                        label="Description"
                                        id="description"
                                        autoComplete="description"
                                    />
                                </Grid>
                                <Grid item xs={12} md={12} lg={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="manager-label">Manager</InputLabel>
                                        <Select
                                            labelId="manager-label"
                                            id="manager-select"
                                            value={manager}
                                            label="Manager"
                                            onChange={handleManagerChange}
                                        >
                                            {
                                                managers.map((manager: any) => <MenuItem value={manager.id}>{manager.username}</MenuItem>)
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={12} lg={6}>
                                    <FormControl fullWidth>
                                        <InputLabel id="director-label">Director</InputLabel>
                                        <Select
                                            labelId="director-label"
                                            id="director-select"
                                            value={director}
                                            label="Director"
                                            onChange={handleDirectorChange}
                                        >
                                            {
                                                directors.map((director: any) => <MenuItem value={director.id}>{director.username}</MenuItem>)
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, color: 'white' }}
                            >
                                Book
                            </Button>
                        </Box>
                    </Paper>
                    <Copyright sx={{ pt: 4 }} />
                </Container>
            </Box>
        </Box>
    );
}