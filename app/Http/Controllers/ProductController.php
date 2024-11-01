<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = ProductResource::collection(Product::orderByDesc('id')->get());
        return Inertia::render('dashboard/products/List', ['products' => $products]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Category::get(['id', 'title']);

        return Inertia::render('dashboard/products/Add', ['categories' => $categories]);
    }

    /**
     * Store a newly created resource in storage.
     */

    /** @var \Illuminate\Http\UploadedFile[] $images */

    public function store(StoreProductRequest $request)
    {
        $fields = $request->validated();
        $fields['created_by'] = $fields['updated_by'] = Auth::id();

        $images = $fields['images'];

        foreach ($images as $key => $image) {
            /** @var $image \Illuminate\Http\UploadedFile */
            if ($image instanceof \Illuminate\Http\UploadedFile) {
                // Ensure the extension is not null or empty; default to 'jpg' if so
                $extension = $image->getClientOriginalExtension() ?: 'jpg';

                // Store the image with a unique filename in the 'products' directory
                $fields['images'][$key] = $image->storeAs(
                    'products',
                    time() . '_' . $key . '.' . $extension,
                    'public'
                );
            }
        }

        $fields['images'] = json_encode($fields['images']);

        Product::create($fields);

        return to_route('products.index')->with('success', 'Product Created Successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return Inertia::render('dashboard/products/Product', ['product' => new ProductResource($product)]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        $categories = Category::get(['id', 'title']);

        return Inertia::render('dashboard/products/Edit', ['categories' => $categories, 'product' => $product]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        $fields = $request->validated();
        $fields['updated_by'] = Auth::id();
        $images = $fields['images'];
        foreach ($images as $key => $image) {
            /** @var $image \Illuminate\Http\UploadedFile */
            if ($image instanceof \Illuminate\Http\UploadedFile) {
                // Ensure the extension is not null or empty; default to 'jpg' if so
                if (!empty(json_decode($product->images)->$key)) {
                    Storage::disk('public')->delete(json_decode($product->images)->$key);
                }
                $extension = $image->getClientOriginalExtension() ?: 'jpg';

                // Store the image with a unique filename in the 'products' directory
                $fields['images'][$key] = $image->storeAs(
                    'products',
                    time() . '_' . $key . '.' . $extension,
                    'public'
                );
            } else {
                $fields['images'][$key] = json_decode($product->images)->$key ?? null;
            }
        }

        $product->update($fields);

        return to_route('products.index')->with('success', 'Product Updated Successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $images = json_decode($product->images, true);

        if (is_array($images))
            Storage::disk('public')->delete($images);

        $product->delete();


        return to_route('products.index')->with('success', 'Product Deleted Successfully');
    }
    public function destroyAll(Request $request)
    {
        $ids = $request->input('ids');
        if (!empty($ids)) {
            $products = Product::whereIn('id', $ids);
            $products->delete();
            Storage::disk('public')->delete(json_decode($products->get('images'), true));
        }

        return to_route('products.index')->with('success', 'Products Was Deleted');
    }
}
