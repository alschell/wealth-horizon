
#!/usr/bin/env node
const { execSync } = require('child_process');

// Parse command line arguments
const args = process.argv.slice(2);
const isWatch = args.includes('--watch');
const isVerbose = args.includes('--verbose');
const isCoverage = args.includes('--coverage');
const pattern = args.find(arg => !arg.startsWith('--'));

console.log('Running tests...');
console.log('-'.repeat(50));

let command = 'jest';

if (pattern) {
  console.log(`Testing pattern: ${pattern}`);
  command += ` ${pattern}`;
}

if (isWatch) {
  command += ' --watch';
}

if (isVerbose) {
  command += ' --verbose';
}

if (isCoverage) {
  command += ' --coverage';
}

try {
  execSync(command, { stdio: 'inherit' });
  console.log('-'.repeat(50));
  console.log('All tests passed!');
} catch (error) {
  console.error('-'.repeat(50));
  console.error('Tests failed');
  process.exit(1);
}
