
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // Add this to handle the process.env references in various packages
    'process.env': {
      NODE_ENV: JSON.stringify(mode),
    },
    'process.env.NODE_ENV': JSON.stringify(mode),
    // Add any other environment variables needed for the application
    'process.env.NEXT_PUBLIC_APP_URL': JSON.stringify('http://localhost:8080'),
  }
}));
