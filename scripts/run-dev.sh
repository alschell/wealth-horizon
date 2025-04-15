
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
  npm install @vitejs/plugin-react-swc --save-dev
fi

# Run the development server using npx to ensure we use the local installation
echo "Starting development server..."
npx vite --force

# If vite fails, try a different approach
if [ $? -ne 0 ]; then
  echo "Trying alternative approach to start the server..."
  node_modules/.bin/vite --force
fi
