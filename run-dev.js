
#!/usr/bin/env node

// This script runs Vite directly from the node_modules directory
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('Starting Vite development server...');

// Check if vite exists in node_modules
const viteExecutablePath = path.resolve(__dirname, 'node_modules', '.bin', 'vite');
const viteExists = fs.existsSync(viteExecutablePath);

if (!viteExists) {
  console.error('Vite executable not found in node_modules/.bin');
  console.error('Please install vite with: npm install vite@latest');
  process.exit(1);
}

console.log(`Using Vite from: ${viteExecutablePath}`);

const viteProcess = spawn(viteExecutablePath, [], {
  stdio: 'inherit',
  shell: true
});

viteProcess.on('error', (error) => {
  console.error('Failed to start Vite:', error);
  process.exit(1);
});

viteProcess.on('close', (code) => {
  if (code !== 0) {
    console.error(`Vite process exited with code ${code}`);
    process.exit(code);
  }
});
