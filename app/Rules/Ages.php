<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class Ages implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        // No characters other than digits and commas
        if(preg_replace('/[0-9\,]*/','', $value) !== '') {
            return false;
        }

        $ages = explode(',', $value);

        // First age must be 18+
        if($ages[0] < 18 || min($ages) < 1) {
            return false;
        }

        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Ages must be comma-separated integers; first age must be 18+';
    }
}
