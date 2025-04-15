
#!/bin/bash

# Make the script executable
chmod +x build.sh

# Install required dependencies if they don't exist
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install vite @vitejs/plugin-react-swc lucide-react react-router-dom framer-motion
fi

# Build the project
echo "Building the project..."
npx vite build
