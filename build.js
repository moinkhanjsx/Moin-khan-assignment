// This is a fallback build script for Vercel
const { execSync } = require('child_process');

try {
  // Skip TypeScript compilation in production (Vercel) environment
  // and rely only on Vite which can handle TypeScript files
  console.log('Building with Vite...');
  execSync('node ./node_modules/vite/bin/vite.js build', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
