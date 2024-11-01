<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Notification;
use App\Notifications\UserNotification;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Notification as FacadesNotification;
use Inertia\Inertia;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notifications = Auth::user()->notifications()
            ->orderBy('created_at', 'desc') // Order by the most recent first
            ->get()
            ->unique('data.sender_data.id') // Ensure we have unique notifications by sender_id
            ->values(); // Re-index the collection


        Inertia::share('notifications', $notifications);

        return Inertia::render('dashboard/notifications/Notifications', ['notifications' => $notifications]);
    }

    public function getNotifications()
    {
        // Fetch all notifications for the authenticated user
        $notifications = Auth::user()->notifications()
            ->orderBy('created_at', 'desc') // Order by the most recent first
            ->get()
            ->unique('data.sender_data.id') // Ensure we have unique notifications by sender_id
            ->values(); // Re-index the collection/ Ensure we have unique notifications by sender_id

        $unread_notifications = Auth::user()->unreadNotifications;

        return response()->json(['notifications' => $notifications, 'unread_notifications' => $unread_notifications]);
    }

    public function sendNotification(Request $request)
    {
        $request->validate([
            'users' => 'required|array',
            'users.*' => 'exists:admins,id',
            'message' => 'required|string',
        ]);

        $users = Admin::whereIn('id', $request->users)->get();
        $senderData = $request->user();
        $notification = new UserNotification($request->message, $senderData);
        FacadesNotification::send($users, $notification);
    }
    public function sendMessage(Request $request)
    {
        $request->validate([
            'users' => 'required|array',
            'users.*' => 'exists:admins,id',
            'message' => 'required|string',
        ]);

        $users = Admin::whereIn('id', $request->users)->get();
        $senderData = $request->user();
        $notification = new UserNotification($request->message, $senderData);
        FacadesNotification::send($users, $notification);

        return response()->json(['data' => 'Message Sent successfully !']);
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

    private function fetchNotifications($sender_id, $receiver_id)
    {
        $receiver_notifications = Notification::where('data->sender_data->id', $sender_id)->where('notifiable_id',  $receiver_id)->get()->toArray();


        foreach ($receiver_notifications as &$rec_notification) {
            $rec_notification['type'] = 'receiver';
        }

        $sender_notifications = Notification::where('notifiable_id', $sender_id)->where('data->sender_data->id', $receiver_id)->get()->toArray();

        foreach ($sender_notifications as &$send_notification) {
            $send_notification['type'] = 'sender';
        }

        $all_notifications = array_merge($receiver_notifications, $sender_notifications);

        usort($all_notifications, function ($a, $b) {
            return strtotime($a['created_at']) - strtotime($b['created_at']);
        });

        return $all_notifications;
    }

    public function show(Notification $notification, Request $request, string $id, string $notifiable_id)
    {

        if ($id) {
            $receiver_id = $id;
            $sender_id = $request->user()->id;

            // Fetch and merge notifications
            $all_notifications = $this->fetchNotifications($sender_id, $receiver_id);

            Notification::where('notifiable_id', $notifiable_id)->update(['read_at' => now()]);

            return Inertia::render('dashboard/notifications/Show', [
                "notification" => $all_notifications,
                "sender_id" => $id,
                'notifiable_id' => $notifiable_id
            ]);
        }


        return response()->json(['error' => 'No sender notifications found'], 400);
    }

    public function json_show(Notification $notification, Request $request)
    {

        // Mark notifications as read by updating the 'read_at' field in the database
        if ($request->has('sender_id')) {
            $sender_notifications = $request->query('sender_id');

            if ($sender_notifications) {
                $receiver_id = (int)$sender_notifications;
                $sender_id = $request->user()->id;

                // Fetch and merge notifications
                Notification::where('notifiable_id', $request->query('notifiable_id'))->update(['read_at' => now()]);
                $all_notifications = $this->fetchNotifications($sender_id, $receiver_id);

                return response()->json(['notifications' => $all_notifications]);
            }

            return response()->json(['error' => 'Invalid sender notifications format'], 400);
        }

        return response()->json(['error' => 'No sender notifications found'], 400);
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
    public function destroyAll(Request $request)
    {
        $request->user()->notifications()->delete();

        return to_route('profile.notifications')->with('success', 'All Notifications Deleted Successfully');
    }
}
