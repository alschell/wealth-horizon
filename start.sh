
#!/bin/bash

# Make the script executable
chmod +x start.sh

# Install required dependencies
echo "Installing required dependencies..."
npm install vite @vitejs/plugin-react-swc lucide-react react-router-dom framer-motion

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

# Run the development server
echo "Starting development server..."
npx vite
