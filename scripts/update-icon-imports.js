
// This is a helper script to update icon imports across the codebase
// Run with: node scripts/update-icon-imports.js

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Find all TypeScript and TSX files
const findFiles = () => {
  const result = execSync('find src -type f -name "*.tsx" -o -name "*.ts"', { encoding: 'utf-8' });
  return result.split('\n').filter(Boolean);
};

// Process a file to update its imports
const processFile = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Check if the file imports from lucide-react
    if (content.includes('from "lucide-react"') || content.includes("from 'lucide-react'")) {
      console.log(`Processing ${filePath}`);
      
      // Update import from lucide-react to use our utility
      let newContent = content.replace(
        /import\s+\{([^}]+)\}\s+from\s+(['"])lucide-react\2/g,
        'import { $1 } from "@/utils/icons"'
      );
      
      // Update PageHeaderCard icon usage from direct component to string
      if (filePath.includes("PageHeaderCard")) {
        newContent = newContent.replace(
          /icon={(\w+)}/g,
          'icon="$1"'
        );
      }
      
      fs.writeFileSync(filePath, newContent, 'utf-8');
      console.log(`✅ Updated ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
};

// Main function
const main = () => {
  console.log('Updating icon imports...');
  const files = findFiles();
  
  files.forEach(processFile);
  
  console.log('Done! Please review the changes and run tests.');
};

main();
