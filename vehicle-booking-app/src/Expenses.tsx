import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

type Props = {
    approvals: any,
    reports: any
}

export default function Expenses({ approvals, reports }: Props) {
    const [totalFuelUsage, setTotalFuelUsage] = React.useState(0);
    const [date, setDate] = React.useState('loading...');

    function preventDefault(event: React.MouseEvent) {
        event.preventDefault();
    }

    React.useEffect(() => {
        if (reports && approvals) {
            let recentDate = '';
            for (let i = reports.length - 1; i >= 0; i--) {
                const filteredApprovals = approvals.filter((approval: any) => approval.vehicle_report_id === reports[i].id);
                const totalApprovals = filteredApprovals.filter((approval: any) => approval.approved !== 0).length;
                if (totalApprovals === 2) {
                    recentDate = reports[i].operation_date;
                    break;
                }
            }
            const filteredReports = reports.filter((report: any) => report.operation_date === recentDate);
            let totalFuelUsage = 0;
            filteredReports.forEach((report: any) => setTotalFuelUsage(() => report.fuel_usage + totalFuelUsage));
            setDate(new Date(recentDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }));
        }
    }, [reports, approvals]);

    return (
        <React.Fragment>
            <Title>Recent Fuel Usages</Title>
            <Typography component="p" variant="h4">
                {totalFuelUsage} Liter
            </Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                on {date}
            </Typography>
            <div>
                <Link color="primary" href="#" onClick={preventDefault}>
                    View details
                </Link>
            </div>
        </React.Fragment>
    );
}
