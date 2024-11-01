<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CategoryResource extends JsonResource
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
            'title' => $this->title,
            'created_by' => $this->created_with ? ['name' => $this->created_with->name, 'id' => $this->created_with->id] : "Unkown Creator",
            'updated_by' => $this->updated_with ? ['name' => $this->created_with->name, 'id' => $this->created_with->id] : "Unkown Updator",
            'created_at' => (new Carbon($this->created_at))->format("d M Y H:i"),
            'updated_at' => (new Carbon($this->updated_at))->format("d M Y H:i"),
        ];
    }
}
