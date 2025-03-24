
#!/usr/bin/env node
const { execSync } = require('child_process');

console.log('Running tests...');

try {
  execSync('jest', { stdio: 'inherit' });
  console.log('All tests passed!');
} catch (error) {
  console.error('Tests failed');
  process.exit(1);
}
