import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const kw = JSON.parse(fs.readFileSync(path.join(rootDir, 'src', 'data', 'top1000keywords.json'), 'utf8'));
const kwString = kw.join(', ');

const indexHtmlPath = path.join(rootDir, 'index.html');
let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Replace keywords
indexHtml = indexHtml.replace(/<meta name="keywords" content="[^"]*" \/>/, `<meta name="keywords" content="${kwString.replace(/"/g, '&quot;')}" />`);

// Update theme-color meta if exists or add it
if (!indexHtml.includes('name="theme-color"')) {
  indexHtml = indexHtml.replace('<head>', '<head>\n    <meta name="theme-color" content="#FAF8F5" />');
}

// Update body class from bg-dark to light off-white theme
indexHtml = indexHtml.replace('<body class="bg-dark text-white">', '<body class="bg-[#FAF8F5] text-[#1E2329] font-outfit antialiased selection:bg-[#FF8C38] selection:text-white">');

fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
console.log('✅ Successfully updated index.html with top 1000 keywords and light offwhite theme.');
