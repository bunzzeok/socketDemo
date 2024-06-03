import { fileURLToPath, URL } from "node:url";
import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";
import topLevelAwait from "vite-plugin-top-level-await";
import Pages from "vite-plugin-pages";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // federation({
    //   name: "onebite",
    //   filename: "remoteEntry.js",
    //   exposes: {
    //     "./OneBite": "./src/components/OneBite.vue",
    //   },
    //   shared: ["vue", "pinia"],
    // }),
    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: "__tla",
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: (i) => `__tla_${i}`,
    }),
    Pages({
      onRoutesGenerated(routes) {
        const transformRoute = (route) => ({
          ...route,
          path: route.path.replace("/:@", "/:"),
          children: route.children?.map(transformRoute) ?? [],
        });

        return routes.map(transformRoute);
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.join(__dirname, "src/"),
      //'@': fileURLToPath(new URL('src', import.meta.url)),
    },
  },
  build: {
    modulePreload: false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
});
