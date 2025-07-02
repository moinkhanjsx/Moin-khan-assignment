// Simple build script for Vercel deployment
const { spawn } = require('child_process');
const path = require('path');

// Path to Vite executable inside node_modules
const vitePath = path.join(__dirname, 'node_modules', '.bin', 'vite');

console.log('Starting Vite build...');
console.log('Vite path:', vitePath);

// Run Vite build using spawn
const buildProcess = spawn('node', [vitePath, 'build'], {
  stdio: 'inherit',
  shell: true
});

buildProcess.on('close', (code) => {
  if (code !== 0) {
    console.error(`Build process exited with code ${code}`);
    process.exit(code);
  }
  console.log('Build completed successfully');
});
