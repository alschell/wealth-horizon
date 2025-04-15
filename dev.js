
#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Check if package.json exists, if not create it
if (!fs.existsSync('package.json')) {
  console.log('Creating package.json...');
  const packageJson = {
    name: "vite_react_shadcn_ts",
    private: true,
    version: "0.0.0",
    type: "module",
    scripts: {
      dev: "vite",
      build: "tsc && vite build",
      preview: "vite preview"
    }
  };
  
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
}

// Check if index.html exists, if not create it
if (!fs.existsSync('index.html')) {
  console.log('Creating index.html...');
  const indexHtml = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Wealth Horizon</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;
  
  fs.writeFileSync('index.html', indexHtml);
}

// Check if node_modules exists, if not run npm install
if (!fs.existsSync('node_modules')) {
  console.log('Installing dependencies...');
  const install = spawn('npm', ['install', 'vite@latest', '@vitejs/plugin-react-swc@latest', 'lucide-react', 'react-router-dom', 'framer-motion'], {
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
