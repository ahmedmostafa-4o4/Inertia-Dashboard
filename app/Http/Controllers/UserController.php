<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = UserResource::collection(User::all());

        return Inertia::render('dashboard/users/List', ['users' => $users]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('dashboard/users/Add');
    }

    /**
     * Store a newly created resource in storage.
     */
    /** @var $image \Illuminate\Http\UploadedFile */

    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        $data['password'] = Hash::make($data['password']);
        if ($image) {
            $data['image'] = $image->store('users/' . Str::random(10), 'public');
        } else {
            $data['image'] = null;
        }

        User::create($data);
        return to_route('users.index')->with('success', 'User Was Created');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return Inertia::render('dashboard/users/Show', ["user" => new UserResource($user)]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('dashboard/users/Edit', ["user" => $user]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $fields = $request->validated();
        $image = $fields['image'] ?? null;
        if ($image) {
            Storage::disk('public')->deleteDirectory(dirname($user->image));
            $fields['image'] = $image->store('users/' . Str::random(10), 'public');

            $user->update([
                "name" => $fields['name'],
                "email" => $fields['email'],
                "phone_number" => $fields['phone_number'],
                "image" => $fields['image'],
            ]);
        } else {
            $user->update([
                "name" => $fields['name'],
                "email" => $fields['email'],
                "phone_number" => $fields['phone_number'],
            ]);
        }


        return to_route('users.show', ['user' => $user->id])->with('success', 'User Was Updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        Storage::disk('public')->deleteDirectory(dirname($user->image));
        $user->delete();

        return to_route('users.index')->with('success', 'User Was Deleted');
    }

    public function deleteMultiple(Request $request)
    {

        $ids = $request->input('ids');
        if (!empty($ids)) {
            $users = User::whereIn('id', $ids);
            $users->delete();
            Storage::disk('public')->delete($users->get('image'));
        }

        return to_route('users.index')->with('success', 'Users Was Deleted');
    }
}
