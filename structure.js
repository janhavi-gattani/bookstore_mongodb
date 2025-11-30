const fs = require('fs');
const path = require('path');

// Directories to ignore
const IGNORE = ['node_modules', '.git', 'build', 'dist', '.next', 'coverage'];

function printTree(dir, prefix = '', isRoot = true) {
  try {
    if (isRoot) {
      console.log(path.basename(dir) + '/');
    }

    const items = fs.readdirSync(dir);
    const filtered = items.filter(item => !IGNORE.includes(item) && !item.startsWith('.'));

    filtered.forEach((item, index) => {
      const isLast = index === filtered.length - 1;
      const fullPath = path.join(dir, item);
      
      try {
        const stat = fs.statSync(fullPath);
        const isDir = stat.isDirectory();
        
        // Print current item
        console.log(prefix + (isLast ? '└── ' : '├── ') + item + (isDir ? '/' : ''));
        
        // Recurse into directories
        if (isDir) {
          printTree(fullPath, prefix + (isLast ? '    ' : '│   '), false);
        }
      } catch (err) {
        // Skip files we can't access
      }
    });
  } catch (err) {
    console.error('Error reading directory:', err.message);
  }
}

// Usage
const targetDir = process.argv[2] || '.';
console.log('\nFolder Structure:\n');
printTree(path.resolve(targetDir));
console.log('\n');