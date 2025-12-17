import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "build",
    chunkSizeWarningLimit: 2000,
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, "src/components"),
      pages: path.resolve(__dirname, "src/pages"),
      contexts: path.resolve(__dirname, "src/contexts"),
      services: path.resolve(__dirname, "src/services"),
      utils: path.resolve(__dirname, "src/utils"),
    },
  },
  server: {
    port: 3000,          // ⚠️ must be NUMBER, not string
    host: "0.0.0.0",
    strictPort: true,
  },
});
