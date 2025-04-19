
#!/usr/bin/env node

// This script runs Vite directly from the node_modules directory
const { spawn } = require('child_process');
const path = require('path');

const viteExecutable = path.resolve(__dirname, 'node_modules', '.bin', 'vite');

console.log('Starting Vite development server...');
console.log(`Using Vite from: ${viteExecutable}`);

const viteProcess = spawn(viteExecutable, [], {
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
