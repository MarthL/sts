import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  // depending on your application, base can also be "/"
  base: "/",
  plugins: [react(), viteTsconfigPaths()],
  define: {
    global: 'window'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "./src")
    }
  },
  css: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  server: {
    open: false,
    port: 3000
  }
});
