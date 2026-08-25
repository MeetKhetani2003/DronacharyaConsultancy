const fs = require('fs');

const filesToUpdate = [
  'src/views/Apply.tsx',
  'src/views/Contact.tsx',
  'src/sections/HomeTop.tsx',
  'src/sections/HomeBottom.tsx',
  'src/components/ui.tsx',
  'src/components/Navbar.tsx',
  'src/components/Footer.tsx'
];

for (const file of filesToUpdate) {
  let content = fs.readFileSync(file, 'utf-8');
  
  // Replace import
  content = content.replace(/import\s+\{\s*([^}]*?)BUSINESS([^}]*?)\}\s+from\s+["']@\/data\/content["'];?/g, (match, p1, p2) => {
    let newImport = '';
    const otherImports = [p1, p2].join('').split(',').map(s => s.trim()).filter(Boolean);
    if (otherImports.length > 0) {
      newImport += `import { ${otherImports.join(', ')} } from "@/data/content";\n`;
    }
    newImport += `import { useBusiness } from "@/app/ClientLayout";`;
    return newImport;
  });

  // Inject hook into component
  // Find all `export function Something(...) {` or `export default function Something(...) {`
  content = content.replace(/(export\s+(?:default\s+)?function\s+[A-Za-z0-9_]+\s*\([^)]*\)\s*\{)/g, (match) => {
    // We only want to inject if the function uses BUSINESS
    return match + '\n  const BUSINESS = useBusiness();';
  });

  fs.writeFileSync(file, content);
}

console.log('Updated components');
