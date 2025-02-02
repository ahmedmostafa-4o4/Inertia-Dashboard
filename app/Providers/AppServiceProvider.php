<?php

namespace App\Providers;

use App\Models\Admin;
use App\Observers\UserObserver;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;
use Laravel\Sanctum\PersonalAccessToken;
use Laravel\Sanctum\Sanctum;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot()
    {


        Vite::prefetch(concurrency: 3);

        Inertia::share([
            'unreadNotificationsCount' => function () {
                if (Auth::check()) {
                    return Auth::user()->unreadNotifications->count();
                }
                return 0;
            },
            'notifications' => function () {
                if (Auth::check()) {
                    return Auth::user()->notifications;
                }
                return [];
            },

        ]);
    }
}
