<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'image_path' => $this->image,
            'phone_number' => $this->phone_number,
            'address' => $this->address,
            'created_at' => (new Carbon($this->created_at))->format("d M Y H:i"),
            'updated_at' => (new Carbon($this->updated_at))->format("d M Y H:i"),
        ];
    }
}
