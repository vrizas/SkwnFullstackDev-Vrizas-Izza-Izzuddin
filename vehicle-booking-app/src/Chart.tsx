import * as React from 'react';
import dynamic from 'next/dynamic';
import Title from './Title';

type Props = {
    approvals: any,
    reports: any
}

const ChartContent = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function Chart({ approvals, reports }: Props) {
    const [options, setOptions] = React.useState({
        chart: {
            id: 'apexchart-example'
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        }
    });

    const [series, setSeries] = React.useState<any>([]);

    React.useEffect(() => {
        if (reports && approvals) {
            setSeries(() => {
                const months = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
                const approvedBookings = {
                    name: 'Approved Bookings',
                    data: [] as Array<number>
                };
                const fuelUsage = {
                    name: 'Fuel Usage (liter)',
                    data: [] as Array<number>
                };

                months.forEach((month: number) => {
                    const filteredApprovals = approvals.filter((approval: any) => new Date(approval.updated_at || '2023-01-01').getMonth() === month && new Date(approval.updated_at || '2023-01-01').getFullYear() === new Date().getFullYear());
                    approvedBookings.data.push(filteredApprovals.length);
                });

                months.forEach((month: number) => {
                    const filteredReports = reports.filter((report: any) => new Date(report.operation_date).getMonth() === month && new Date(report.operation_date).getFullYear() === new Date().getFullYear());
                    let totalFuelUsage = 0 as number;
                    filteredReports.forEach((report: any) => totalFuelUsage += report.fuel_usage);
                    fuelUsage.data.push(totalFuelUsage);
                });

                return [
                    approvedBookings,
                    fuelUsage
                ]
            })
        }
    }, [reports, approvals])

    return (
        <React.Fragment>
            <Title>This Year</Title>
            <div>
                <ChartContent
                    options={options}
                    series={series}
                    type="bar"
                    width={'100%'}
                    height={'100%'}
                />
            </div>
        </React.Fragment>
    );
}
