import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const APP_DIR = path.join(ROOT, 'app');

function getRoutes(dir, prefix = '') {
  let routes = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    if (item.isDirectory()) {
      if (item.name.startsWith('[')) continue;
      routes = routes.concat(getRoutes(path.join(dir, item.name), `${prefix}/${item.name}`));
    } else if (item.name === 'page.tsx') {
      routes.push(prefix || '/');
    }
  }
  return routes;
}

const validRoutes = new Set(getRoutes(APP_DIR));
// Also add static file routes and dynamic article prefix
validRoutes.add('/');
validRoutes.add('/sitemap.xml');
validRoutes.add('/robots.txt');

function walk(dir) {
  let files = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.next', '.git'].includes(item.name)) continue;
    const full = path.join(dir, item.name);
    if (item.isDirectory()) files = files.concat(walk(full));
    else if (/\.(tsx|ts|jsx|js|html)$/.test(item.name)) files.push(full);
  }
  return files;
}

const files = walk(ROOT);
let brokenCount = 0;
const checkedLinks = new Set();

const linkRegex = /href=["'](\/calculators\/[a-z0-9\-_/]+|\/pages\/[a-z0-9\-_/]+)["']/g;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = linkRegex.exec(content)) !== null) {
    let link = match[1];
    if (link.endsWith('/')) link = link.slice(0, -1);
    // Ignore blog slug pattern
    if (link.startsWith('/pages/blog/')) continue;

    checkedLinks.add(link);
    if (!validRoutes.has(link)) {
      brokenCount++;
      const relPath = path.relative(ROOT, file).replace(/\\/g, '/');
      console.error(`[BROKEN LINK] in ${relPath}: ${link}`);
    }
  }
}

console.log(`Verified ${checkedLinks.size} unique internal links across the codebase.`);
if (brokenCount > 0) {
  console.error(`Found ${brokenCount} broken internal links.`);
  process.exit(1);
} else {
  console.log('✓ All internal links match valid Next.js routes!');
  process.exit(0);
}
