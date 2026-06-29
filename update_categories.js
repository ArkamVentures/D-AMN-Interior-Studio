const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/data/projectPhotos.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Update serviceTypes
content = content.replace(
  /export const serviceTypes = \[[\s\S]*?\] as const;/,
  `export const serviceTypes = [
  'All',
  'Luxury',
  'Kitchen',
  'Budget',
  'Wall',
  'Office',
] as const;`
);

const categories = ['Luxury', 'Kitchen', 'Budget', 'Wall', 'Office'];

// Replace service: '...' with random new category
content = content.replace(/service:\s*'([^']+)'/g, (match, p1) => {
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  return `service: '${randomCategory}'`;
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Categories updated successfully!');
