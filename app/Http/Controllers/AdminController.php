<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Http\Requests\StoreAdminRequest;
use App\Http\Requests\UpdateAdminRequest;
use App\Http\Resources\AdminResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Support\Str;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $admins = Admin::with('creator')->get();

        return Inertia::render('dashboard/admin/List', ["admins" => AdminResource::collection($admins)]);
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
            $data['image_path'] = "images/default-user.jpg";
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
        return Inertia::render('dashboard/admin/Profile', ["admin" => $admin, 'imageUrl' => asset('storage/' . $imageUrl)]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Admin $admin)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAdminRequest $request, Admin $admin)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Admin $admin)
    {
        //
    }
}
