<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProductResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $images = json_decode($this->images);
        return [
            'id' => $this->id,
            'title' => $this->title,
            'image1' => $images->image1,
            'image2' => $images->image2,
            'image3' => $images->image3,
            'image4' => $images->image4,
            'category' => $this->category->title,
            'description' => $this->description,
            'stock' => $this->stock,
            'price' => $this->price,
            'rate' => $this->rate ?? '0.0',
            'rate_count' => $this->rate_count ?? '0',
            'offer' => $this->offer ?? '0',
            'created_by' => $this->created_with ? ['name' => $this->created_with->name, 'id' => $this->created_with->id] : "Unknown Creator",
            'updated_by' => $this->updated_with ? ['name' => $this->updated_with->name, 'id' => $this->updated_with->id] : "Unknown Updator",
            'created_at' => (new Carbon($this->created_at))->format('d M Y H:i'),
            'updated_at' => (new Carbon($this->updated_at))->format('d M Y H:i'),
        ];
    }
}
