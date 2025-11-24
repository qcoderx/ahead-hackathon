import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/ahead-hackathon\.onrender\.com\/api\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24
              }
            }
          }
        ]
      },
      manifest: {
        name: 'MamaSafe - AI-Powered Pregnancy Care',
        short_name: 'MamaSafe',
        description: 'AI-powered medication safety analysis for pregnant women',
        theme_color: '#13ec5b',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'images/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'images/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})