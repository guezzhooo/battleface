<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestAPI extends Controller
{
    public function index() {
        return view('testsapi.index');
    }
}
