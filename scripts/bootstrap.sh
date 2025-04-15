
#!/bin/bash

# Make scripts executable
chmod +x scripts/run-dev.sh

# Install dependencies if they don't exist
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Ensure Vite is installed
if ! npm list vite > /dev/null 2>&1; then
  echo "Installing Vite..."
  npm install vite --save-dev
  npm install @vitejs/plugin-react-swc --save-dev
fi

# Install any missing dependencies from package.json
npm install

echo "Setup complete. Running the development server now..."
# Run the development server directly
node_modules/.bin/vite --force || npx vite --force
