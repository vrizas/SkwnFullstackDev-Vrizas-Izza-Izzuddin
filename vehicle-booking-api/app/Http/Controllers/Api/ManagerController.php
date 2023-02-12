<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class ManagerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $roleId = DB::table('roles')->where('name', '=', 'manager')->pluck('id');
        $managers = User::where('role_id', $roleId)->get();

        return response()->json([
            'status' => true,
            'managers' => $managers
        ]);
    }
}
