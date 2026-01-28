const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

const PRODUCTS_FILE = path.join(__dirname, '../src/data/catalog_products.json');
const OUTPUT_DIR = path.join(__dirname, '../public/products');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Function to download image
async function downloadImage(url, filepath) {
  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  });

  return new Promise((resolve, reject) => {
    const writer = fs.createWriteStream(filepath);
    response.data.pipe(writer);
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

// Function to search Google Images (basic scraping)
async function searchGoogleImage(query) {
  try {
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}&tbm=isch`;
    const response = await axios.get(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const $ = cheerio.load(response.data);
    
    // Google Images HTML structure changes often. This targets the older/simpler HTML version often returned to bots/scripts.
    // Try to find the first image source.
    // Note: Google obfuscates class names. We often look for image tags.
    
    // Strategy: Look for 'img' tags that have a 'src' starting with http
    const images = [];
    $('img').each((i, el) => {
      const src = $(el).attr('src');
      if (src && src.startsWith('http') && !src.includes('google')) {
        images.push(src);
      }
    });

    // Often the first valid external image is a thumbnail
    if (images.length > 0) {
      return images[0];
    }
    
    return null;
  } catch (error) {
    console.error(`Error searching for ${query}:`, error.message);
    return null;
  }
}

async function main() {
  const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8'));
  
  console.log(`Found ${products.length} products. Checking images...`);

  for (const product of products) {
    const imagePath = path.join(OUTPUT_DIR, `${product.id}.jpg`);
    
    if (fs.existsSync(imagePath)) {
      console.log(`[SKIP] Image for ${product.name} already exists.`);
      continue;
    }

    const query = `Reloj ${product.brand} ${product.id} ${product.name}`;
    console.log(`[SEARCH] Searching for: ${query}`);
    
    // Add delay to avoid being blocked
    await new Promise(resolve => setTimeout(resolve, 2000));

    const imageUrl = await searchGoogleImage(query);

    if (imageUrl) {
      try {
        await downloadImage(imageUrl, imagePath);
        console.log(`[SUCCESS] Downloaded image for ${product.name}`);
      } catch (err) {
        console.error(`[ERROR] Failed to download image for ${product.name}:`, err.message);
      }
    } else {
      console.log(`[NOT FOUND] No image found for ${product.name}`);
    }
  }
}

main();
