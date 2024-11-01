<?php

namespace App\Observers;

use App\Models\UserRequest;
use Illuminate\Support\Facades\Auth;

class UserObserver
{
    public function updated($user)
    {
        if (Auth::check()) {
            UserRequest::create([
                'admin_id' => $user->id,
                'endpoint' => request()->path(),
                'requested_at' => now(),
            ]);
        }
    }
}
