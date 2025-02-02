<?php

use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Models\Admin;
use App\Models\UserRequest;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redirect;
use Stevebauman\Location\Facades\Location;

Route::redirect('/', '/dashboard');


Route::middleware('auth:admin')->group(function () {

    Route::middleware('logRequest')->group(function () {

        Route::get('dashboard', function () {
            $ipAddresses = DB::table('sessions')->pluck('ip_address')->filter()->toArray(); // Filter out nulls

            $locations = [];

            foreach ($ipAddresses as $index => $ip) {
                $location = Location::get($ip);

                if ($location) {
                    $locations[] = [
                        "id" => $index,  // Unique ID for each location
                        "position" => [
                            "lat" => $location->latitude,
                            "lng" => $location->longitude,
                        ],
                        "name" => "User $index",  // Placeholder name; replace as needed
                    ];
                } else {
                    $locations[] = [
                        "id" => $index,
                        "position" => null,
                        "name" => "User $index",
                        "error" => "Unable to retrieve location for IP: $ip"
                    ];
                }
            }

            return Inertia::render('dashboard/Home', ["locations" => $locations]);
        })->name('home');

        Route::resource('admins', AdminController::class)->middleware('role');
        Route::post('admins/deleteMultiple', [AdminController::class, 'deleteMultiple'])->name('admin.deleteMultiple');

        Route::resource('products', ProductController::class)->middleware('role');
        Route::post('products/destory', [ProductController::class, 'destroyAll'])->name('products.destroyAll');

        Route::resource('categories', CategoryController::class)->middleware('role');
        Route::post('categories/destory', [CategoryController::class, 'destroyMultiple'])->name('categories.destroyMultiple');

        Route::resource('users', UserController::class)->middleware('role');
        Route::post('users/destory', [UserController::class, 'deleteMultiple'])->name('users.deleteMultiple');

        Route::get('/profile', [ProfileController::class, 'edit'])->name('admin.profile');

        Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');

        Route::post('/profile/delete', action: [ProfileController::class, 'destroy'])->name('profile.delete');

        Route::put('/profile/change_password', [ProfileController::class, 'changePassword'])->name('admin.change_password');

        Route::delete('/profile/notifications/{notification}', [NotificationController::class, 'destroy'])->name('notification.destroy');

        Route::delete('/profile/notifications', [NotificationController::class, 'destroyAll'])->name('notification.destroyAll');

        Route::get('/profile/notifications/{notification}/{id}/{notifiable_id}', [NotificationController::class, 'show'])->name('notification.read');

        Route::post('logout', [AdminAuthController::class, 'logout'])->name('admin.logout');

        Route::get('/track-user-activity/{id}', function (string $id) {
            $userRequests = UserRequest::select('description', 'id', 'requested_at', 'method', 'payload')->where('admin_id', $id)->orderByDesc('requested_at')->get();
            return Inertia::render('dashboard/TrackUser', ['userRequests' => $userRequests]);
        })->name('userRequests');

        Route::post('/track-user-activity', function (Request $request) {
            $ids = $request->input('ids');
            if (!empty($ids)) {
                $requests = UserRequest::whereIn('id', $ids);
                $requests->delete();
            }

            return Redirect::back()->with('success', 'Requests Was Deleted');
        })->name('userRequests.delete');
    });

    Route::post("/send-notification", [NotificationController::class, 'sendNotification'])->name('notification.send');

    Route::get("/create-notification", [NotificationController::class, 'create'])->name('notification.create');

    Route::get("/get-notifications", [NotificationController::class, 'getNotifications'])->name('notification.get');

    Route::get('/profile/notifications', [NotificationController::class, 'index'])->name('profile.notifications');

    Route::get('/profile/chat', [NotificationController::class, 'json_show'])->name('profile.chats');

    Route::post('/profile/chat/send-message', [NotificationController::class, 'sendMessage'])->name('profile.sendMessage');

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
            ->whereNotNull('last_activity')->orderBy('last_activity')
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


Route::get('register', [RegisteredUserController::class, 'create'])
    ->name('register');

Route::post('register', [RegisteredUserController::class, 'store']);
