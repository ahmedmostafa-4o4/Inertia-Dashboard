<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Notification;
use App\Notifications\UserNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification as FacadesNotification;
use Inertia\Inertia;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notifications = Auth::user()->notifications;
        Inertia::share('notifications', $notifications);

        return Inertia::render('dashboard/notifications/Notifications', ['notifications' => $notifications]);
    }

    public function getNotifications()
    {
        $notifications = Auth::user()->notifications;

        return response()->json(['notifications' => $notifications]);
    }

    public function sendNotification(Request $request)
    {
        $request->validate([
            'users' => 'required|array',
            'users.*' => 'exists:admins,id',
            'message' => 'required|string',
            'title' => 'string'
        ]);

        $users = Admin::whereIn('id', $request->users)->get();
        $senderData = $request->user();
        $notification = new UserNotification($request->title, $request->message, $senderData);
        FacadesNotification::send($users, $notification);

        return to_route('admins.index')->with('success', 'Notifications sent successfully');
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        return Inertia::render('dashboard/notifications/SendNotification', ['users' => $request->ids]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Notification $notification)
    {
        $user = Auth::user();
        $user->unreadNotifications->markAsRead();

        return Inertia::render('dashboard/notifications/Show', ["notification" => $notification]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Notification $notification)
    {
        $notification->delete();

        return to_route('profile.notifications')->with('success', 'Notification Deleted Successfully');
    }
}
