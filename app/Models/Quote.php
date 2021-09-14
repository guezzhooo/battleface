<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quote extends Model
{
    protected $FIXED_RATE = 3;

    protected $fillable = [
        'user_id',
        'age',
        'currency_id',
        'start_date',
        'end_date',
        'price'
    ];

    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);
        $this->setPriceAttribute();
    }

    protected function setPriceAttribute() {
        $trip_length = date_diff(date_create($this->start_date), date_create($this->end_date))->format("%a");
        $trip_length += 1;
        $ages = explode(',', $this->age);
        $total = 0;
        foreach($ages as $age) {
            $total += $this->FIXED_RATE * $this->age_load($age) * $trip_length;
        }
        return $this->attributes['price'] = round($total,2);
    }

    protected function age_load($age) {
        if($age < 18) $load = 0;
        elseif($age < 30) $load = 0.6;
        elseif($age < 40) $load = 0.7;
        elseif($age < 50) $load = 0.8;
        elseif($age < 60) $load = 0.9;
        elseif($age < 70) $load = 1;
        else $load = 0;

        return $load;
    }
}
