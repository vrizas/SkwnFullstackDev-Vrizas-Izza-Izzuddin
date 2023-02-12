<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class DirectorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $roleId = DB::table('roles')->where('name', '=', 'director')->pluck('id');
        $directors = User::where('role_id', $roleId)->get();

        return response()->json([
            'status' => true,
            'directors' => $directors
        ]);
    }
}
