#!/bin/bash

# Exit on error
set -e

# Print commands for debugging
set -x

echo "Starting Vercel build process..."

# Print current directory and files
pwd
ls -la

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm ci
fi

# Check if node_modules/.bin/vite exists
if [ ! -f "node_modules/.bin/vite" ]; then
  echo "Vite not found, installing it..."
  npm install vite@latest
fi

# Make sure the binary is executable
chmod +x node_modules/.bin/vite

# Run the build command using the full path
echo "Running build command..."
./node_modules/.bin/vite build
