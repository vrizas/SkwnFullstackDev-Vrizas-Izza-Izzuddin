<?php

namespace App\Exports;

use App\Models\Approval;
use App\Models\Driver;
use App\Models\Vehicle;
use App\Models\VehicleReport;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Color;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class VehicleReportExport implements FromArray, WithHeadings, WithStyles
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function styles(Worksheet $sheet)
    {
        return [
            1    => [
                'font' => ['bold' => true],
            ],
        ];
    }

    public function headings():array
    {
        return [
            'Date',
            'Vehicle',
            'Driver',
            'Service Date',
            'Fuel Usage',
            'Fuel Type',
            'Description',
            'Status',
        ];
    } 

    public function array(): array
    {
        $reports = VehicleReport::get()->toArray();
        $reports = VehicleReport::get()->toArray();
        $approvals = Approval::get()->toArray();
        $data = array(); 
        foreach($reports as $report) {
            $filteredApprovals = array();
            foreach($approvals as $approval) {
                if ($approval['vehicle_report_id'] == $report['id']) {
                    array_push($filteredApprovals, $approval);
                }
            };
            $totalApprovedApprovals = count(array_filter($filteredApprovals, function($approval) {
                return $approval['approved'] == 1;
            }));
            $totalDoneApprovals = count(array_filter($filteredApprovals, function($approval) {
                return $approval['approved'] == 2;
            }));

            $vehicle = Vehicle::find($report['vehicle_id']);
            $driver = Driver::find($report['driver_id']);
            $approved = 'Process';

            if ($totalApprovedApprovals == 2) {
                $approved = 'Approved';
            } else if ($totalDoneApprovals > 0 ) {
                $approved = 'Done';
            }

            array_push($data, [
                date("M j, Y", strtotime($report['operation_date'])),
                $vehicle->name,
                $driver->name,
                date("M j, Y", strtotime($report['service_date'])),
                $report['fuel_usage'],
                $report['fuel_type'],
                $report['description'],
                $approved,
            ]);
        };

        return array_reverse($data);
    }
}
