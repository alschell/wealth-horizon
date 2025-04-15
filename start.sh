
#!/bin/bash

# Make the script executable
chmod +x start.sh

# Install required dependencies
echo "Installing required dependencies..."
npm install vite @vitejs/plugin-react-swc lucide-react react-router-dom framer-motion

# Run the development server
echo "Starting development server..."
npx vite
