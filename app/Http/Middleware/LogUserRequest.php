<?php

namespace App\Http\Middleware;

use App\Models\UserRequest;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LogUserRequest
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next)
    {
        if (Auth::check()) {
            // Describe the action in a user-friendly way
            $actionDescription = $this->describeAction($request);

            // Log the request details
            UserRequest::create([
                'admin_id' => Auth::id(),
                'endpoint' => $request->path(),
                'method' => $request->method(),
                'payload' => $request->isMethod('get') ? null : json_encode($request->except(['password', '_token'])),
                'description' => $actionDescription,
                'requested_at' => now(),
            ]);
        }
        return $next($request);
    }


    protected function describeAction(Request $request)
    {
        $method = $request->method();
        $routeName = $request->route() ? $request->route()->getName() : '';
        $path = $request->path();

        switch ($routeName) {
            case 'home':
                return "Visited the Dashboard Home page";

            case 'admins.index':
                return "Viewed the list of admins";
            case 'admins.store':
                return "Created a new admin";
            case 'admins.show':
                $adminId = $request->route('admin');
                return "Viewed admin details for ID {$adminId}";
            case 'admins.update':
                $adminId = $request->route('admin');
                return "Updated admin details for ID {$adminId}";
            case 'admins.destroy':
                $adminId = $request->route('admin');
                return "Deleted admin with ID {$adminId}";
            case 'admin.deleteMultiple':
                return "Deleted multiple admins";

            case 'products.index':
                return "Viewed the list of products";
            case 'products.store':
                return "Created a new product";
            case 'products.show':
                $productId = $request->route('product');
                return "Viewed product details for ID {$productId}";
            case 'products.update':
                $productId = $request->route('product');
                return "Updated product details for ID {$productId}";
            case 'products.destroy':
                $productId = $request->route('product');
                return "Deleted product with ID {$productId}";
            case 'products.destroyAll':
                return "Deleted multiple products";

            case 'categories.index':
                return "Viewed the list of categories";
            case 'categories.store':
                return "Created a new category";
            case 'categories.show':
                $categoryId = $request->route('category');
                return "Viewed category details for ID {$categoryId}";
            case 'categories.update':
                $categoryId = $request->route('category');
                return "Updated category details for ID {$categoryId}";
            case 'categories.destroy':
                $categoryId = $request->route('category');
                return "Deleted category with ID {$categoryId}";
            case 'categories.destroyMultiple':
                return "Deleted multiple categories";

            case 'admin.profile':
                return "Viewed profile";
            case 'profile.update':
                return "Updated profile information";
            case 'profile.delete':
                return "Deleted profile";
            case 'admin.change_password':
                return "Changed password";

            case 'notification.destroy':
                return "Deleted a specific notification";
            case 'notification.destroyAll':
                return "Deleted all notifications";
            case 'notification.read':
                return "Marked a notification as read";
            case 'notification.send':
                return "Sent a notification";
            case 'notification.create':
                return "Created a notification";
            case 'notification.get':
                return "Fetched notifications";

            case 'profile.notifications':
                return "Viewed profile notifications";
            case 'profile.chats':
                return "Viewed profile chats";
            case 'profile.sendMessage':
                return "Sent a message in chat";

            case 'admin.logout':
                return "Logged Out";

            case 'admin.users.activity':
                return "Checked online status of all active users";
            case 'active-users-check':
                return "Visited the active users check page";

            default:
                // Generic fallback for unspecified routes
                return match ($method) {
                    'GET' => "Visited page: /$path",
                    'POST' => "Submitted form on /$path",
                    'PUT', 'PATCH' => "Updated data on /$path",
                    'DELETE' => "Deleted data from /$path",
                    default => "Performed $method request on /$path",
                };
        }
    }
}
