
#!/bin/bash

# Make scripts executable
chmod +x scripts/run-dev.sh

# Create node_modules directory if it doesn't exist
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Ensure Vite and its React plugin are installed
if ! npm list vite > /dev/null 2>&1; then
  echo "Installing Vite and React plugin..."
  npm install vite@latest @vitejs/plugin-react-swc@latest --save-dev
fi

# Install other dependencies if needed
npm install

echo "Setup complete. Running the development server now..."

# Try to run the development server with multiple methods
if [ -x "$(command -v npx)" ]; then
  echo "Starting with npx..."
  npx vite --force
elif [ -f "node_modules/.bin/vite" ]; then
  echo "Starting with node_modules binary..."
  node_modules/.bin/vite --force
else
  echo "Error: Vite not found. Please install it manually with 'npm install vite@latest @vitejs/plugin-react-swc@latest --save-dev'"
  exit 1
fi
