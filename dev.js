
#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Check if node_modules exists, if not run npm install
if (!fs.existsSync('node_modules')) {
  console.log('Installing dependencies...');
  const install = spawn('npm', ['install', 'vite', '@vitejs/plugin-react-swc', 'lucide-react', 'react-router-dom', 'framer-motion'], {
    stdio: 'inherit',
    shell: true
  });

  install.on('close', (code) => {
    if (code !== 0) {
      console.error('Failed to install dependencies');
      process.exit(code);
    }
    runVite();
  });
} else {
  runVite();
}

function runVite() {
  console.log('Starting development server...');
  const vite = spawn('npx', ['vite'], {
    stdio: 'inherit',
    shell: true
  });

  vite.on('close', (code) => {
    process.exit(code);
  });
}
