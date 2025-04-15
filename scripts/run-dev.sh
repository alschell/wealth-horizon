
#!/bin/bash

# Check if node_modules directory exists
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Ensure the Vite package is installed
if ! npm list vite > /dev/null 2>&1; then
  echo "Vite not found in project dependencies. Installing..."
  npm install vite --save-dev
fi

# Run the development server
echo "Starting development server..."
npx vite
