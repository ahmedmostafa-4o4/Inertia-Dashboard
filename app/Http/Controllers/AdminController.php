<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Http\Requests\StoreAdminRequest;
use App\Http\Requests\UpdateAdminRequest;
use App\Http\Resources\AdminResource;
use App\Notifications\UserNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $admins = Admin::with(['creator', 'updator'])->orderByDesc('id')->get();

        return Inertia::render(
            'dashboard/admin/List',
            [
                "admins" => AdminResource::collection($admins),
                'status' => session('success')
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('dashboard/admin/Add');
    }

    /**
     * Store a newly created resource in storage.
     */
    /** @var $image \Illuminate\Http\UploadedFile */
    public function store(StoreAdminRequest $request)
    {
        $data = $request->validated();
        $currentUser = Auth::id();
        $image = $data['image_path'] ?? null;
        $data['password'] = Hash::make($data['password']);
        if ($image) {
            $data['image_path'] = $image->store('admin/' . Str::random(10), 'public');
        } else {
            $data['image_path'] = "/images/default-user.jpg";
        }
        $data['created_by'] = $currentUser;
        $data['updated_by'] = $currentUser;
        Admin::create($data);
        return to_route('admins.index')->with('success', 'Admin Was Created');
    }

    /**
     * Display the specified resource.
     */
    public function show(Admin $admin)
    {
        $imageUrl = $admin->image_path;
        return Inertia::render('dashboard/admin/Show', ["admin" => $admin, 'imageUrl' => asset('storage/' . $imageUrl), "status" => session('success')]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Admin $admin)
    {
        return Inertia::render('dashboard/admin/Edit', ["admin" => $admin]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAdminRequest $request, Admin $admin)
    {
        $fields = $request->validated();
        $currentUser = Auth::id();
        $fields['updated_by'] = $currentUser;
        $image = $fields['image_path'] ?? null;
        if ($image) {
            Storage::disk('public')->deleteDirectory(dirname($admin->image_path));
            $fields['image_path'] = $image->store('admin/' . Str::random(10), 'public');

            $admin->update([
                "name" => $fields['name'],
                "email" => $fields['email'],
                "phone_number" => $fields['phone_number'],
                "role" => $fields['role'],
                "image_path" => $fields['image_path'],
                "updated_by" => $fields['updated_by']
            ]);
        } else {
            $admin->update([
                "name" => $fields['name'],
                "email" => $fields['email'],
                "phone_number" => $fields['phone_number'],
                "role" => $fields['role'],
                "updated_by" => $fields['updated_by']
            ]);
        }


        return to_route('admins.show', ['admin' => $admin->id])->with('success', 'Admin Was Updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Admin $admin)
    {
        Storage::disk('public')->deleteDirectory(dirname($admin->image_path));
        $admin->delete();

        return to_route('admins.index')->with('success', 'Admin Was Deleted');
    }
    public function deleteMultiple(Request $request)
    {

        $ids = $request->input('ids');
        if (!empty($ids)) {
            $admins = Admin::whereIn('id', $ids);
            $admins->delete();
            Storage::disk('public')->delete($admins->get('image_path'));
        }

        return to_route('admins.index')->with('success', 'Admins Was Deleted');
    }
}
