const fs = require('fs');
const { PDFParse } = require('pdf-parse');

const files = [
  './catalogo/CATALOGO CITIZEN ENERO 2026.pdf',
  './catalogo/CATALOGO FESTINA ENERO 2026.pdf'
];

async function readPdf(file) {
  console.log(`Reading ${file}...`);
  try {
    const dataBuffer = fs.readFileSync(file);
    const dataUint8 = new Uint8Array(dataBuffer);
    
    let parser;
    try {
        parser = new PDFParse(dataUint8);
    } catch (e) {}

    if (!parser) parser = new PDFParse({ buffer: dataUint8 });

    const textResult = await parser.getText();
    
    // console.log(`\n--- TEXT CONTENT OF ${file} (First 100 lines) ---\n`);
    const lines = textResult.text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    // lines.slice(0, 100).forEach(line => console.log(line));

    const products = [];
    let currentBrand = file.toLowerCase().includes('citizen') ? 'Citizen' : 'Festina';
    
    if (currentBrand === 'Festina') {
        // Pattern seems to be Model line, then Price line
        // Example:
        // F20750/6
        // $275.000
        for (let i = 0; i < lines.length - 1; i++) {
            const line = lines[i];
            const nextLine = lines[i+1];
            
            // Model usually starts with F and has numbers/slashes
            // Price usually has $ or digits with dots
            if (/^[Ff]\d{3,}.*$/.test(line) && /[\d\.]+/.test(nextLine)) {
                // Parse price
                let priceStr = nextLine.replace(/[^\d]/g, ''); // remove $ and dots
                let price = parseInt(priceStr, 10);
                
                // If price is missing or weird, skip
                if (isNaN(price)) continue;
                
                // Check if price is less than 1,200,000
                // Note: user said "menos a 1.200,000". 
                // Festina prices seen: 275.000 (which is 275k). 275k < 1.2M.
                if (price < 1200000) {
                     products.push({
                        id: line,
                        name: `${currentBrand} ${line}`,
                        brand: currentBrand,
                        price: price, // Store as number
                        originalPriceStr: nextLine,
                        status: 'a pedido'
                     });
                }
            }
        }
    } else {
        // Citizen parsing
        // We saw just prices in the output. Maybe model numbers are on different lines?
        // Let's try to find lines that look like Citizen models (e.g. BI, EQ, AN, etc.)
        // And assume price follows or precedes.
        // For now, let's just dump lines that look like models to debug pattern.
        console.log(`\n--- Debugging Citizen Pattern ---`);
        for (let i = 0; i < Math.min(lines.length, 200); i++) {
            console.log(`[${i}] ${lines[i]}`);
        }
        
        // Attempt generic extraction
        for (let i = 0; i < lines.length - 1; i++) {
             const line = lines[i];
             // Citizen models often start with letters, have digits, maybe dashes.
             // e.g. BI5000-01A
             // Regex: ^[A-Z]{2,}\d{2,}[-\w]*$
             if (/^[A-Z]{2,}\d{2,}[-\w]*$/.test(line)) {
                 // Look for price in next few lines
                 for (let j = 1; j <= 3; j++) {
                     if (i + j >= lines.length) break;
                     const potentialPrice = lines[i+j];
                     if (/^[\d\.]+$/.test(potentialPrice)) {
                         let priceStr = potentialPrice.replace(/\./g, '');
                         let price = parseInt(priceStr, 10);
                         if (!isNaN(price) && price < 1200000) {
                             products.push({
                                id: line,
                                name: `${currentBrand} ${line}`,
                                brand: currentBrand,
                                price: price,
                                originalPriceStr: potentialPrice,
                                status: 'a pedido'
                             });
                             break; // found price
                         }
                     }
                 }
             }
        }
    }

    console.log(`\nFound ${products.length} products for ${currentBrand} ( < 1.2M )`);
    if (products.length > 0) {
        // console.log('Sample:', products.slice(0, 3));
    }
    
    return products;
  } catch (err) {
    console.error(`Error reading ${file}:`, err);
    return [];
  }
}

(async () => {
  let allProducts = [];
  for (const file of files) {
    if (fs.existsSync(file)) {
      const products = await readPdf(file);
      if (products) {
          allProducts = allProducts.concat(products);
      }
    } else {
      console.log(`File not found: ${file}`);
    }
  }
  
  // Write to src/data/catalog_products.json
  const outputPath = './src/data/catalog_products.json';
  // Ensure directory exists
  if (!fs.existsSync('./src/data')) {
      fs.mkdirSync('./src/data');
  }
  
  fs.writeFileSync(outputPath, JSON.stringify(allProducts, null, 2));
  console.log(`\nSaved ${allProducts.length} products to ${outputPath}`);
})();
