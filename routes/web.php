<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;


Route::redirect('/', '/admin');

Route::get('/admin', function () {
    return Inertia::render('dashboard/Home',);
})->name('admin');
Route::get('/admin/new-admin', function () {
    return Inertia::render('dashboard/admin/Add',);
})->name('newAdmin');
Route::get('/admin/users', function () {
    return Inertia::render('dashboard/Users',);
})->name('users');





Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
