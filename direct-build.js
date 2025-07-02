// Direct build script for Vercel
// This will import Vite directly and run the build

async function buildProject() {
  try {
    console.log('Starting build process...');
    
    // Import the vite module directly
    const { build } = require('vite');
    
    // Run the build
    console.log('Running Vite build...');
    await build();
    
    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildProject();
