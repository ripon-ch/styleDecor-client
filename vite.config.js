import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
    build: {
        outDir: "build",
        chunkSizeWarningLimit: 2000
    },
    resolve: {
        alias: {

            'components': path.resolve(__dirname, 'src/components'),
            

            'pages': path.resolve(__dirname, 'src/pages'),
        }
    },
    plugins: [react(), tsconfigPaths()],

    server: {
        port: "3000",
        host: "0.0.0.0",
        strictPort: true,
        allowedHosts: []
    }
});
