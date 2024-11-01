<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $category = Category::with(['created_with', 'updated_with'])->orderBy('id')->get();
        $categories = CategoryResource::collection($category);

        return Inertia::render('dashboard/categories/List', ['categories' =>  $categories]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('dashboard/categories/Add');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        $fields = $request->validated();
        $fields['created_by'] = $fields['updated_by'] = Auth::id();
        Category::create($fields);

        return to_route('categories.index')->with('success', 'Category Added Successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return Inertia::render('dashboard/categories/Edit', ["category" => $category->only(['id', 'title'])]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $fields = $request->validated();
        $fields['updated_by'] = Auth::id();

        $category->update($fields);

        return to_route('categories.index')->with('success', 'Category Was Updated Successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        $category->delete();
        return to_route('categories.index')->with('success', 'Category Was Deleted Successfully');
    }


    public function destroyMultiple(Request $request)
    {

        $ids = $request->input('ids');
        if (!empty($ids)) {
            $categories = Category::whereIn('id', $ids);
            $categories->delete();
            Storage::disk('public')->delete($categories->get('image_path'));
        }

        return to_route('categories.index')->with('success', 'Categories Was Deleted');
    }
}
