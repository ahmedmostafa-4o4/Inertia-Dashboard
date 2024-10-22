import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.jsx",
            refresh: true,
        }),
        react(),
    ],
    optimizeDeps: {
        include: ["@emotion/react", "@emotion/styled"],
    },
    // server: {
    //     host: "0.0.0.0", // Allow connections from any network
    //     port: 5173, // The default port for Vite
    //     hmr: {
    //         host: "192.168.1.12", // Replace this with your local IP address
    //     },
    // },
});
