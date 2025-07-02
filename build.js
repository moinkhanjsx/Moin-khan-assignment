// This is a fallback build script for Vercel
const { execSync } = require('child_process');

try {
  // Run TypeScript compilation
  console.log('Running TypeScript compilation...');
  execSync('npx tsc', { stdio: 'inherit' });
  
  // Build with Vite
  console.log('Building with Vite...');
  execSync('npx vite build', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}
