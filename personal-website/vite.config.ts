import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy ({
      targets: [
        {
          src: './src/crapsgame/crapsgame.js',
          dest: './src/crapsgame/',
        },
        {
          src: './src/randomQuoteGenerator/randomQuoteGenerator.js',
          dest: './src/randomQuoteGenerator/',
        },
        {
          src: './src/aboutmesection/Joshua_Akalihu_CV.pdf',
          dest: './src/aboutmesection/',
        },
      ],
    }),
  ],
  server: {
    allowedHosts: [ "jaclyn-brakeless-spectroscopically.ngrok-free.dev" ]
  }
})


