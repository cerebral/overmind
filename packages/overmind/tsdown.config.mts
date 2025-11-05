import { defineConfig } from 'tsdown'

export default defineConfig([
  // CommonJS build
  {
    entry: ['src/index.ts', 'src/config/index.ts'],
    format: ['cjs'],
    dts: true,
    outDir: 'lib',
    platform: 'neutral',
    unbundle: true,
    sourcemap: true,
  },
  // ESM build
  {
    entry: ['src/index.ts', 'src/config/index.ts'],
    format: ['esm'],
    dts: false,
    outDir: 'es',
    outExtensions: () => ({ js: '.js' }),
    platform: 'neutral',
    unbundle: true,
    sourcemap: true,
  },
  // Browser build
  {
    entry: ['src/index.ts'],
    format: ['iife', 'umd'],
    dts: false,
    outDir: 'dist',
    outExtensions: () => ({ js: '.min.js' }),
    platform: 'browser',
    minify: true,
    sourcemap: true,
    globalName: 'Overmind',
    noExternal: [/.*/],
  },
])
