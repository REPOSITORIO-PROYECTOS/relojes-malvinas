const fs = require('fs');
const pdfParse = require('pdf-parse');

console.error('DEBUG: Script started');
console.error('DEBUG: Type of pdfParse:', typeof pdfParse);
try {
    console.error('DEBUG: pdfParse keys:', Object.keys(pdfParse));
} catch (e) {
    console.error('DEBUG: Cannot list keys');
}

// Determine the parse function
let parseFunc = pdfParse;
if (typeof parseFunc !== 'function') {
    if (typeof parseFunc.default === 'function') {
        console.error('DEBUG: Using pdfParse.default');
        parseFunc = parseFunc.default;
    } else if (typeof parseFunc.PDFParse === 'function') {
        console.error('DEBUG: Using pdfParse.PDFParse');
        parseFunc = parseFunc.PDFParse;
    } else {
        console.error('DEBUG: Could not find parse function in export');
    }
}

const files = [
  './catalogo/CATALOGO CITIZEN ENERO 2026.pdf',
  './catalogo/CATALOGO FESTINA ENERO 2026.pdf'
];

async function readPdf(file) {
  console.error(`DEBUG: Reading ${file}...`);
  try {
    const dataBuffer = fs.readFileSync(file);
    const data = await parseFunc(dataBuffer);
    console.log(`\n--- CONTENT OF ${file} ---\n`);
    console.log(data.text.substring(0, 3000)); 
  } catch (err) {
    console.error(`Error reading ${file}:`, err);
  }
}

(async () => {
  for (const file of files) {
    if (fs.existsSync(file)) {
      await readPdf(file);
    } else {
      console.error(`File not found: ${file}`);
    }
  }
})();
