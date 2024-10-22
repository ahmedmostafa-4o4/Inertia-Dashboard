<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminResource extends JsonResource
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
            'image_path' => $this->image_path,
            'role' => $this->role,
            'phone_number' => $this->phone_number,
            'created_at' => (new Carbon($this->created_at))->format("Y-m-d"),
            'updated_at' => (new Carbon($this->updated_at))->format("Y-m-d"),
            'created_by' => $this->creator ? $this->creator->name : "Unkown Creator",
            'updated_by' => $this->updator ? $this->updator->name : "Unkown Updator",
        ];
    }
}
