<?php

use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Middleware\AdminPermissionsMiddleware;
use App\Http\Resources\AdminResource;
use App\Models\Admin;
use Carbon\Carbon;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Stevebauman\Location\Facades\Location;

Route::redirect('/', '/admin');
// $location = Location::get("8.8.8.8");
// if ($location) {
//     $latitude = $location->latitude;
//     $longitude = $location->longitude;
//     return Inertia::render('dashboard/Home', ["latitude" => $latitude, "longitude" => $longitude]);
// } else {
//     return "Unable to retrieve location for IP address: " . request()->ip();
// }
Route::middleware('auth:admin')->group(function () {
    Route::get('admin', function () {

        return Inertia::render('dashboard/Home',);
    })->name('home');
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
    Route::resource('admins', AdminController::class)->middleware('role');
    Route::post('admins/deleteMultiple', [AdminController::class, 'deleteMultiple'])->name('admin.deleteMultiple');

    Route::resource('products', ProductController::class);
    Route::get('test', function (Request $request) {
        return Auth::user()->id;
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('admin.profile');

    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');

    Route::post('/profile/delete', action: [ProfileController::class, 'destroy'])->name('profile.delete');

    Route::put(
        '/profile/change_password',
        [ProfileController::class, 'changePassword']
    )->name('admin.change_password');

    Route::post("/send-notification", [NotificationController::class, 'sendNotification'])->name('notification.send');
    Route::get("/create-notification", [NotificationController::class, 'create'])->name('notification.create');
    Route::get("/get-notifications", [NotificationController::class, 'getNotifications'])->name('notification.get');
    Route::delete('/profile/notifications/{notification}', [NotificationController::class, 'destroy'])->name('notification.destroy');
    Route::post('/profile/notifications/{notification}', [NotificationController::class, 'show'])->name('notification.read');
    Route::get('/profile/notifications', [NotificationController::class, 'index'])->name('profile.notifications');
    Route::get('/active-users', function () {
        // Fetch all users
        $users = Admin::all();

        $inactivityThreshold = 60; // Inactivity threshold in seconds
        $currentTimestamp = time(); // Current Unix timestamp
        $usersStatus = [];

        // Get last activity for users who are in the sessions table
        $sessions = DB::table('sessions')
            ->select('user_id', 'last_activity')
            ->whereNotNull('user_id')
            ->whereNotNull('last_activity')
            ->get()
            ->keyBy('user_id'); // Key by user_id for easy lookup

        foreach ($users as $user) {
            // Check if the user has an active session
            if (isset($sessions[$user->id])) {
                $lastActivity = $sessions[$user->id]->last_activity; // Last activity timestamp
                $isOnline = ($currentTimestamp - $lastActivity) <= $inactivityThreshold;

                $usersStatus[] = [
                    'user_id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'image_path' => $user->image_path,
                    'role' => $user->role,
                    'last_activity' => $lastActivity,
                    'status' => $isOnline ? 'online' : round(($currentTimestamp - $lastActivity) / 60),
                ];
            } else {
                // User is not in the sessions table, mark as offline
                $usersStatus[] = [
                    'user_id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'image_path' => $user->image_path,
                    'role' => $user->role,
                    'last_activity' => null, // No last activity recorded
                    'status' => 'offline',
                ];
            }
        }

        return response()->json($usersStatus); // Return the users' online/offline status
    })->name('admin.users.activity');
    Route::get('active-users-check', function () {
        return Inertia::render('dashboard/Test');
    });
});



Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
    ->name('password.request');

Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
    ->name('password.email');

Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
    ->name('password.reset');

Route::post('reset-password', [NewPasswordController::class, 'store'])
    ->name('password.store');

Route::get('login', [AdminAuthController::class, 'showLoginForm'])->name('login');

Route::post('login', [AdminAuthController::class, 'login']);

Route::post('logout', [AdminAuthController::class, 'logout'])->name('admin.logout');

Route::get('test-email', function () {
    Mail::raw('This is a test email from your application.', function ($message) {
        $message->to('lofylofy56@gmail.com') // Change to your email
            ->subject('Test Email');
    });

    return 'Test email sent!';
});
