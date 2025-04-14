
#!/usr/bin/env node

/**
 * Script to fix icon imports across the codebase
 * 
 * This script will:
 * 1. Find all .tsx files in the src directory
 * 2. For each file, check if it imports from 'lucide-react'
 * 3. If it does, replace those imports with imports from '@/utils/icons'
 */

const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

// Regex to match imports from 'lucide-react'
const importRegex = /import\s+\{\s*((?:[A-Za-z0-9_]+\s*,\s*)*[A-Za-z0-9_]+)\s*\}\s+from\s+['"]lucide-react['"]/g;

async function getFiles(dir) {
  const subdirs = await readdir(dir);
  const files = await Promise.all(subdirs.map(async (subdir) => {
    const res = path.resolve(dir, subdir);
    return (await stat(res)).isDirectory() ? getFiles(res) : res;
  }));
  return files.flat().filter(file => file.endsWith('.tsx') || file.endsWith('.ts'));
}

async function fixImports() {
  console.log('Starting to fix icon imports...');
  const files = await getFiles(path.resolve(__dirname, '../src'));
  let fixedFiles = 0;

  for (const file of files) {
    const content = await readFile(file, 'utf8');
    
    if (content.includes('lucide-react')) {
      let updatedContent = content.replace(importRegex, (match, iconList) => {
        return `import { ${iconList} } from "@/utils/icons"`;
      });
      
      if (updatedContent !== content) {
        await writeFile(file, updatedContent, 'utf8');
        console.log(`Fixed imports in: ${file}`);
        fixedFiles++;
      }
    }
  }

  console.log(`Done! Fixed imports in ${fixedFiles} files.`);
}

fixImports().catch(console.error);
