
#!/bin/bash

# Make the script executable
chmod +x build.sh

# Install required dependencies if they don't exist
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install vite @vitejs/plugin-react-swc lucide-react react-router-dom framer-motion
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

# Build the project
echo "Building the project..."
npx vite build
