<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function checkout(Request $request)
    {
        $stripe = new \Stripe\StripeClient('sk_test_51KZBBTKJSugXqyCGHYEu5c4q4ustC9vcXo6Gj2louV6bkH6C5ekLQNAi6WvG9e9oUoDrCv5ybAxngUug7yamdOpk00ryTWMIHi');

        $line_items = [];
        foreach ($request->input('items') as $product) {
            $line_items[] = [
                'price_data' => [
                    'currency' => 'EGP',
                    'product_data' => [
                        'name' => $product['title'] . ' (' . $product['color'] . ', ' . $product['size'] .', ' .  $product['quantity'] . ')',
                        'description' => 'Color: ' . $product['color'] ??$product['colors'][0]  . ', Size: ' . $product['size']??$product['sizes'][0] . 'Quantity: ' . $product['quantity'],
                        'images' => [$product['image1'], $product['image2']],
                    ],
                    'unit_amount' => (float) ($product['offer'] ?? $product['price']) * 100,
                ],
                'quantity' => $product['quantity'],
            ];
        }

        try {
            $checkout_session = $stripe->checkout->sessions->create([
                'line_items' => $line_items,
                'mode' => 'payment',
                'success_url' => url('/success'),
                'cancel_url' => url('/cancel'),
            ]);

            return response()->json(['id' => $checkout_session->id, 'url' => $checkout_session->url]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
