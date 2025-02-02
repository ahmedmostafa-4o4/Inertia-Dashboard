<?php

namespace App\Http\Controllers;

use App\Http\Resources\CartResource;
use App\Models\Cart;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {
        $user = auth()->user();
        $mergedCart = Cart::with('product')->where('user_id', $user->id)->get();
    
        // Map to merge product data and quantity directly
        $cartItems = CartResource::collection($mergedCart);
    
        return response()->json($cartItems);
    }
    
    

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $fields = $request->validate([
            'product_id' => 'required|exists:products,id', // Ensure the product exists
            'user_id' => 'required|integer|exists:users,id', // Ensure the user exists
            'quantity' => 'required|integer|min:1', // Ensure quantity is a positive integer
            'color' => 'nullable',
            'size' => 'nullable',
        ]);

        $fields['color'] = $fields['color'] ?? $request->input('colors')[0];
        $fields['size'] = $fields['size'] ?? $request->input('sizes')[0];
        Cart::create($fields);
        return response()->json($request->input('product'));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
    public function delete(string $cart, string $color, string $size)
    {
        $user = auth()->user();
        Cart::where("product_id", $cart)->where("color", $color)->where("size", $size)->where("user_id", $user->id)->delete();
        return response()->json($cart);
    }

    public function sync(Request $request)
    {
        $user = $request->user();
        $localCartItems = $request->input('items', []);

        foreach ($localCartItems as $item) {
            $cartItem = Cart::firstOrCreate(
                ['user_id' => $user->id, 'product_id' => $item['id']],
                ['quantity' => $item['quantity']]
            );

            // Update quantity if it exists
            if ($cartItem->exists) {
                $cartItem->quantity = $item['quantity'];
                $cartItem->save();
            }
        }

        // Return the merged cart data as response
        $mergedCart = Cart::with('product')->where('user_id', $user->id)->get();
        return response()->json($mergedCart);
    }
}
