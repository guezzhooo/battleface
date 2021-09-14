<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class CurrencyId implements Rule
{
    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return in_array($value, ['USD','GBP','EUR']);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'Currency ID must be USD, GBP, or EUR';
    }
}
