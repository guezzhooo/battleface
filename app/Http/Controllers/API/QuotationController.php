<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use \App\Http\Controllers\API\BaseController as BaseController;

class QuotationController extends BaseController
{
    public function index() {
        $result = ['test' => 1, 'result' => 2];
        dd($result);
    }
}
