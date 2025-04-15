
#!/bin/bash

echo "Starting development server preparation..."

# Check if node_modules directory exists
if [ ! -d "node_modules" ]; then
  echo "Node modules not found. Installing dependencies..."
  npm install
  
  if [ $? -ne 0 ]; then
    echo "Error installing dependencies. Please check your package.json and try again."
    exit 1
  fi
fi

# Explicitly install Vite and its React plugin if not already installed
if ! npm list vite > /dev/null 2>&1; then
  echo "Vite not found in project dependencies. Installing..."
  npm install vite@latest @vitejs/plugin-react-swc@latest --save-dev
  
  if [ $? -ne 0 ]; then
    echo "Error installing Vite. Please try installing it manually with 'npm install vite@latest @vitejs/plugin-react-swc@latest --save-dev'"
    exit 1
  fi
fi

# Try multiple methods to start the development server
echo "Starting development server..."

# Method 1: Using npx (most reliable)
if [ -x "$(command -v npx)" ]; then
  echo "Starting with npx..."
  npx vite --force
  
  # If npx fails, try other methods
  if [ $? -ne 0 ]; then
    echo "npx vite failed. Trying alternative methods..."
  else
    exit 0
  fi
fi

# Method 2: Using the local vite binary
if [ -f "node_modules/.bin/vite" ]; then
  echo "Starting with node_modules binary..."
  node_modules/.bin/vite --force
  
  if [ $? -ne 0 ]; then
    echo "node_modules/.bin/vite failed. Trying alternative methods..."
  else
    exit 0
  fi
fi

# Method 3: Using npm run
echo "Starting with npm run..."
npm run dev

# If all methods fail, display error message
if [ $? -ne 0 ]; then
  echo "ERROR: All methods to start the development server failed."
  echo "Please try the following manual steps:"
  echo "1. npm install vite@latest @vitejs/plugin-react-swc@latest --save-dev"
  echo "2. npx vite --force"
  exit 1
fi
