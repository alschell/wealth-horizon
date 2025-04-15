
#!/bin/bash

# Make the script executable
chmod +x build.sh

# Install required dependencies if they don't exist
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install vite@latest @vitejs/plugin-react-swc@latest lucide-react react-router-dom framer-motion
fi

# Create a package.json if it doesn't exist
if [ ! -f "package.json" ]; then
  echo "Creating package.json..."
  echo '{
  "name": "vite_react_shadcn_ts",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  }
}' > package.json
fi

# Create index.html if it doesn't exist
if [ ! -f "index.html" ]; then
  echo "Creating index.html..."
  echo '<!DOCTYPE html>
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
</html>' > index.html
fi

# Build the project
echo "Building the project..."
npx vite build
