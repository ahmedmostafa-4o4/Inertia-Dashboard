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
        $fields['options'] = json_encode($fields['options']);

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
        $fields['options'] = json_encode($fields['options']);
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


    // Api Functions

    public function apiIndex()
    {
        $products = ProductResource::collection(Product::orderByDesc('id')->get());
        return response()->json(['products' => $products]); // Sample response for testing
    }
    public function apiShow(Product $product)
    {
        return response()->json(['product' => new ProductResource($product)]); // Sample response for testing
    }


    public function filterProducts(Request $request)
    {
        $query = Product::query();
    
        // Receive filter parameters
        $price = $request->input('price');
        $size = $request->input('size');
        $rating = $request->input('rating');
        $color = $request->input('color');
        $stock = $request->input('stock');
        $newArrival = $request->input('newArrival');
    
        // Apply filters based on the received parameters
    
        if ($price) {
            // Apply price filtering logic (modify this based on how the price data is stored)
            if ($price === 'HTL') {
                $query->orderBy('price', 'desc');  // High to Low
            } elseif ($price === 'LTH') {
                $query->orderBy('price', 'asc');  // Low to High
            }
        }
    
        if ($size) {
            $query->whereJsonContains('options->sizes', $size);  // Assuming 'sizes' is a JSON column
        }
    
        if ($rating) {
            $query->where('rate', '>=', $rating);  // Filter based on rating
        }
    
        if ($color) {
            $query->whereJsonContains('options->colors', $color);  // Assuming 'colors' is a JSON column
        }
    
        if ($stock) {
            if ($stock === 'in') {
                $query->where('stock', '>', 0);  // In stock
            } else {
                $query->where('stock', 0);  // Out of stock
            }
        }
    
        if ($newArrival) {
            // Apply logic for new arrivals, for example checking a "created_at" field or a specific tag
            if ($newArrival === 'bigsale') {
                $query->where('created_at', '>=', now()->subDays(30));  // Products added in the last 30 days
            }
        }
    
        // Get filtered products
        $products = $query->get();
    
        return response()->json(compact('products',));
    }
}