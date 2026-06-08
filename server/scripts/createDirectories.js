/**
 * Create upload directories if they don't exist
 */

const fs = require('fs');
const path = require('path');

const directories = [
  path.join(__dirname, '../uploads/students'),
  path.join(__dirname, '../uploads/teachers'),
  path.join(__dirname, '../reports')
];

directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✓ Created directory: ${dir}`);
  }
});

console.log('✓ All directories created/verified');
