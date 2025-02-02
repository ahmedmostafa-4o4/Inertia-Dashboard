<?php

namespace App\Http\Controllers;

use App\Http\Controllers\ProductController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('logout', [UserAuthController::class, 'logout']);
    Route::post('out', [PassengerAuthController::class, 'logout']);
    Route::put('/user/{user}', [UserAuthController::class, 'update']);
    Route::put('/user/{user}/change_password', [UserAuthController::class, 'changePassword']);
    Route::delete('/user/{user}', [UserAuthController::class, 'destroy']);
    Route::delete('/cart/{cart}/{color}/{size}', [CartController::class, 'delete']);
    Route::post('/cart/sync', [CartController::class, 'sync']);
    Route::apiResource('cart', CartController::class);

    Route::post('/otp/send', [RegisteredPassengerController::class, 'sendOtp']);
    Route::post('/otp/verify', [RegisteredPassengerController::class, 'verifyOtp']);
});

Route::post('/checkout', [OrderController::class, 'checkout']);

Route::get('/products', [ProductController::class, 'apiIndex']);
Route::get('/products/{product}', [ProductController::class, 'apiShow']);
Route::get('/products-filter', [ProductController::class, 'filterProducts']);

Route::get('/categories', [CategoryController::class, 'apiIndex']);
Route::get('/categories/{category}', [CategoryController::class, 'getRelatedProducts']);


Route::post('signup', [RegisteredPassengerController::class,'store']);
Route::post('signin', [PassengerAuthController::class,'login']);
Route::post('login', [UserAuthController::class, 'login']);
Route::post('register', [RegisteredUserController::class, 'store']);

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();
 
    return response()->json("Email verfied!");
})->middleware(['auth:passenger', 'signed'])->name('verification.verify');