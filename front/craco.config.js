const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/shared': path.resolve(__dirname, 'src/shared'),
      '@/entities': path.resolve(__dirname, 'src/entities'),
      '@/features': path.resolve(__dirname, 'src/features'),
      '@/widgets': path.resolve(__dirname, 'src/widgets'),
      '@/pages': path.resolve(__dirname, 'src/pages'),
      '@/processes': path.resolve(__dirname, 'src/processes'),
    },
  },
}
