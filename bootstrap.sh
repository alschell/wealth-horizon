
#!/bin/bash

# This script installs necessary dependencies without modifying package.json
# It's a workaround for the read-only package.json restriction

echo "Installing missing dependencies..."
npm install --no-save lucide-react vite @vitejs/plugin-react-swc

echo "Dependencies installed successfully"
echo "To start the development server, run: npm run dev"
