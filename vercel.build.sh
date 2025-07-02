#!/bin/bash
# Ensure Vite has execute permissions
chmod +x ./node_modules/.bin/vite
# Run TypeScript compilation first
npx tsc
# Then build with Vite
npx vite build
