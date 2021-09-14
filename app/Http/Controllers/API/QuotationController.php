<?php

namespace App\Http\Controllers\API;

use App\Rules\Ages;
use App\Rules\CurrencyId;
use Illuminate\Http\Request;
use \App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;


class QuotationController extends BaseController
{
    public function index(Request $request) {
        $validator = Validator::make($request->all(), [
            'age' => ['required', new Ages],
            'currency_id' => ['required', new CurrencyId],
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ]);

        if($validator->fails()){
            return $this->handleError($validator->errors());
        }

        $input = $request->all();
        $result = ['test' => 1, 'result' => 2];
        dd($result);
    }
}
