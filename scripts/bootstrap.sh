
#!/bin/bash

# Make scripts executable
chmod +x scripts/run-dev.sh

# Install dependencies if they don't exist
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

echo "Setup complete. To start the development server, run: sh scripts/run-dev.sh"
