import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const aliasAt = path.resolve(__dirname, "client", "src");
const aliasShared = path.resolve(__dirname, "shared");
const aliasAssets = path.resolve(__dirname, "attached_assets");
console.log('Vite alias @:', aliasAt);
console.log('Vite alias @shared:', aliasShared);
console.log('Vite alias @assets:', aliasAssets);

export default defineConfig(async () => {
  const plugins = [
    react(),
    runtimeErrorOverlay(),
  ];

  // Conditionally add cartographer plugin
  if (process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined) {
    const cartographer = await import("@replit/vite-plugin-cartographer");
    plugins.push(cartographer.cartographer());
  }

  return {
    plugins,
    resolve: {
      alias: {
        "@": aliasAt,
        "@shared": aliasShared,
        "@assets": aliasAssets,
      },
    },
    root: path.resolve(__dirname, "client"),
    build: {
      outDir: path.resolve(__dirname, "dist/public"),
      emptyOutDir: true,
    },
    server: {
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
      proxy: {
        '/api': 'http://localhost:5000',
      },
    },
  };
});
