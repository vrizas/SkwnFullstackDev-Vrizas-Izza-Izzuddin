<?php

namespace App\Http\Controllers\Api;

use App\Exports\VehicleReportExport;
use App\Http\Controllers\Controller;
use App\Models\Approval;
use App\Models\Vehicle;
use App\Models\VehicleReport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Facades\Excel;
use SebastianBergmann\CodeCoverage\Report\Xml\Report;

class VehicleReportController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $vehicleReports = VehicleReport::all();

        return response()->json([
            'status' => true,
            'vehicleReports' => $vehicleReports
        ]);
    }

   /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validate = Validator::make($request->all(), 
        [
            'user_id' => 'required',
            'driver_id' => 'required',
            'vehicle_id' => 'required',
            'service_date' => 'required',
            'operation_date' => 'required',
            'fuel_type' => 'required',
            'description' => 'required',
            'approvers' => 'required',
        ]);

        if($validate->fails()){
            return response()->json([
                'status' => false,
                'message' => 'Fill all required fields',
                'errors' => $validate->errors()
            ], 401);
        }

        $report = VehicleReport::create($request->all());

        foreach ($request->approvers as $approverId) {
            $approval = new Approval;
            $approval->user_id = $approverId;
            $approval->vehicle_report_id = $report->id;
            $approval->approved = 0;
            $approval->save();
        }

        return response()->json([
            'status' => true,
            'message' => "Report Created successfully!",
            'report' => $report
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\VehicleReport  $vehicleReport
     * @return \Illuminate\Http\Response
     */
    public function show(VehicleReport $vehicleReport)
    {
        return response()->json([
            'status' => true,
            'vehicleReport' => $vehicleReport
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\VehicleReport  $vehicleReport
     * @return \Illuminate\Http\Response
     */
    public function approve(Request $request, $id)
    {
        $report = VehicleReport::find($id);
        $approval = Approval::where('vehicle_report_id', '=', $id)
                    ->where('user_id', '=', $request->user_id)->first();            
        $approval->approved = 1;
        $approval->save();
                    
        $totalApproval = Approval::where('vehicle_report_id', '=', $id)
                    ->where('approved', '=', 1)->count();
        if ($totalApproval === 2) {
            $vehicle = Vehicle::find($report->vehicle_id);
            $vehicle->active = 0;
            $vehicle->save();
        }

        return response()->json([
            'status' => true,
            'message' => 'Successfully approve vehicle',
        ], 201);
    }

    public function markAsDone($id)
    {
        $report = VehicleReport::find($id);
        $approvals = Approval::where('vehicle_report_id', '=', $id)->get();  
        foreach ($approvals as $approval) {
            $approval->approved = 2;
            $approval->save();
        }
        
        $vehicle = Vehicle::find($report->vehicle_id);
        $vehicle->active = 1;
        $vehicle->save();

        return response()->json([
            'status' => true,
            'message' => 'Successfully mark as done vehicle',
        ], 200);
    }

    public function exportExcel()
    {
        return Excel::download(new VehicleReportExport, 'vehicle-bookings.xlsx');
    }
}
