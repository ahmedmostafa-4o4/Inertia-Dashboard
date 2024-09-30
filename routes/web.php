<?php

use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Stevebauman\Location\Facades\Location;

Route::redirect('/', '/admin');

Route::middleware('auth:admin')->group(function () {
    Route::get('/admin', function (Request $request) {
        $location = Location::get("8.8.8.8");
        if ($location) {
            $latitude = $location->latitude;
            $longitude = $location->longitude;
            return Inertia::render('dashboard/Home', ["latitude" => $latitude, "longitude" => $longitude]);
        } else {
            return "Unable to retrieve location for IP address: " . request()->ip();
        }
    })->name('admin');
    Route::get('/admin/users', function () {
        return Inertia::render('dashboard/Users',);
    })->name('users');
    Route::get('/admin/products', function () {
        return Inertia::render('dashboard/products/List',);
    })->name('products');
    Route::get('/admin/add-product', function () {
        return Inertia::render('dashboard/products/Add',);
    })->name('addProduct');
    Route::get('/admin/products/{id}', function ($id) {
        return Inertia::render('dashboard/products/Product',);
    })->name('product');
    Route::get('/admin/profile/{id}', function ($id) {
        return Inertia::render('dashboard/admin/Profile',);
    })->name('profile');
    Route::get('/admin/orders', function () {
        return Inertia::render('dashboard/orders/List',);
    })->name('orders');
    Route::get('/admin/add-order', function () {
        return Inertia::render('dashboard/orders/Add',);
    })->name('addOrder');
    Route::get('/admin/add-user', function () {
        return Inertia::render('dashboard/users/Add',);
    })->name('addUser');
    Route::get('/admin/returns', function () {
        return Inertia::render('dashboard/returns/List',);
    })->name('returns');
    Route::get('/admin/add-return', function () {
        return Inertia::render('dashboard/returns/Add',);
    })->name('addReturn');
    Route::resource('admins', AdminController::class);
    Route::resource('products', ProductController::class);
    Route::get('test', function (Request $request) {
        return Auth::user()->id;
    });
});


Route::get('login', [AdminAuthController::class, 'showLoginForm'])->name('admin.login');
Route::post('login', [AdminAuthController::class, 'login']);
Route::post('logout', [AdminAuthController::class, 'logout'])->name('admin.logout');
