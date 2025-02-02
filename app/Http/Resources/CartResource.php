<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CartResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $image = json_decode($this->product->images);
        return [
            "id"=> $this->product->id,
            "cart_id" => $this->id,
            "title"=> $this->product->title,
            "price"=> $this->product->price,
            "offer"=> $this->product->offer,
            "image1"=>$image->image1,
            "color"=> $this->color,
            "size"=>$this->size,
            "quantity"=>$this->quantity,
        ];
    }
}
