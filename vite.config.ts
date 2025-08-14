// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr({ svgrOptions: { icon: true } }), // <— gör .svg?react till React-komponenter (default export)
  ],
  build: {
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      onwarn(warning, def) {
        if (warning.code === "EVAL" && /@react-jvectormap\/core/.test(warning.id || "")) return;
        def(warning);
      },
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          charts: ["recharts"],
          msal: ["@azure/msal-browser"],
          jvectormap: ["@react-jvectormap/core", "@react-jvectormap/world"],
        },
      },
    },
  },
});
