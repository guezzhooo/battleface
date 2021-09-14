<?php

namespace App\Http\Controllers\API;

use App\Models\Quote;
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
        $input['user_id'] = $request->user()->id;
        try {
            $quote = new Quote($input);
        } catch(\Exception $e) {
            return $this->handleError($e->getMessage());
        }

        $quote->save();

        $response = [
            'total' => number_format($quote->price, 2),
            'currency_id' => $quote->currency_id,
            'quotation_id' => $quote->id
        ];
        return response()->json($response);
    }
}
