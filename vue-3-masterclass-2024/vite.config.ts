import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import vueRouter from 'unplugin-vue-router/vite'
import tailwindcss from '@tailwindcss/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import AutoIport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    AutoIport({

      // targets to transform
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.vue\.[tj]sx?\?vue/, // .vue (vue-loader with experimentalInlineMatchResource enabled)
        /\.md$/, // .md
      ],
      // global imports to register
      imports: [
        // presets
        'vue',
        VueRouterAutoImports,
        // custom
        {
          'pinia': ['defineStore', 'storeToRefs', 'acceptHMRUpdate']
        }
      ],
      dts: true,
      viteOptimizeDeps: true,
      dirs: [
        'src/stores'
      ]
    }),
    Components({
      dts: true, // enabled by default if `typescript` is installed
      // types: [{
      //   from: 'vue-router',
      //   names: ['RouterLink', 'RouterView'],
      // }],
    }),
    tailwindcss(),
    vueRouter(),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: element => element.startsWith('iconify-icon')
        }
      }
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
