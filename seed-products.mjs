import { db } from './server/db.ts';
import { products } from './drizzle/schema.ts';
import { v4 as uuidv4 } from 'uuid';

const designs = [
  // Self-Care Collection
  { name: 'Cheers To Us', slug: 'cheers-to-us', category: 'self-care', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/b0044f1a-d100-4f72-93df-a4eef08ba37e_7a0c8f12.jpg' },
  { name: 'I\'ve Earned This', slug: 'ive-earned-this', category: 'self-care', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/b0044f1a-d100-4f72-93df-a4eef08ba37e_7a0c8f12.jpg' },
  { name: 'Self-Care Mode On', slug: 'self-care-mode-on', category: 'self-care', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/b0044f1a-d100-4f72-93df-a4eef08ba37e_7a0c8f12.jpg' },
  { name: 'Rest Well', slug: 'rest-well', category: 'self-care', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/b0044f1a-d100-4f72-93df-a4eef08ba37e_7a0c8f12.jpg' },
  { name: 'Still Celebrating', slug: 'still-celebrating', category: 'self-care', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/b0044f1a-d100-4f72-93df-a4eef08ba37e_7a0c8f12.jpg' },
  { name: 'Adulting Is Hard', slug: 'adulting-is-hard', category: 'self-care', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/b0044f1a-d100-4f72-93df-a4eef08ba37e_7a0c8f12.jpg' },

  // Luxury Icons
  { name: 'Coffee Power', slug: 'coffee-power', category: 'luxury', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/b616dd74-8974-4b89-a3a4-639da92993fe_5c9d1e3b.jpg' },
  { name: 'Rare Gem', slug: 'rare-gem', category: 'luxury', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/b616dd74-8974-4b89-a3a4-639da92993fe_5c9d1e3b.jpg' },
  { name: 'Still Royal', slug: 'still-royal', category: 'luxury', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/b616dd74-8974-4b89-a3a4-639da92993fe_5c9d1e3b.jpg' },
  { name: 'Big Heart', slug: 'big-heart', category: 'luxury', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/b616dd74-8974-4b89-a3a4-639da92993fe_5c9d1e3b.jpg' },
  { name: 'Leveling Up', slug: 'leveling-up', category: 'luxury', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/b616dd74-8974-4b89-a3a4-639da92993fe_5c9d1e3b.jpg' },
  { name: 'Daily Dose', slug: 'daily-dose', category: 'luxury', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/b616dd74-8974-4b89-a3a4-639da92993fe_5c9d1e3b.jpg' },

  // Neon Power
  { name: 'My Back Has Opinions', slug: 'my-back-has-opinions', category: 'neon-power', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/bbae5994-ffd9-4f41-bc26-d64b95d3f678_8e2f4c1a.jpg' },
  { name: 'Still Dangerous', slug: 'still-dangerous', category: 'neon-power', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/bbae5994-ffd9-4f41-bc26-d64b95d3f678_8e2f4c1a.jpg' },
  { name: 'Relentless', slug: 'relentless', category: 'neon-power', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/bbae5994-ffd9-4f41-bc26-d64b95d3f678_8e2f4c1a.jpg' },
  { name: 'Coffee: My Love Language', slug: 'coffee-my-love-language', category: 'neon-power', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/bbae5994-ffd9-4f41-bc26-d64b95d3f678_8e2f4c1a.jpg' },
  { name: 'Permission Granted', slug: 'permission-granted', category: 'neon-power', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/bbae5994-ffd9-4f41-bc26-d64b95d3f678_8e2f4c1a.jpg' },
  { name: 'Chaos Coordinator', slug: 'chaos-coordinator', category: 'neon-power', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/bbae5994-ffd9-4f41-bc26-d64b95d3f678_8e2f4c1a.jpg' },

  // Neon Vibes
  { name: 'Laughing Through It', slug: 'laughing-through-it', category: 'neon-vibes', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/f63e7455-f7d2-4495-b59d-f7f43241e629_2b5e8c9f.jpg' },
  { name: 'Slay The Day', slug: 'slay-the-day', category: 'neon-vibes', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/f63e7455-f7d2-4495-b59d-f7f43241e629_2b5e8c9f.jpg' },
  { name: 'Tissue For Your Issues', slug: 'tissue-for-your-issues', category: 'neon-vibes', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/f63e7455-f7d2-4495-b59d-f7f43241e629_2b5e8c9f.jpg' },
  { name: 'Protected', slug: 'protected', category: 'neon-vibes', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/f63e7455-f7d2-4495-b59d-f7f43241e629_2b5e8c9f.jpg' },
  { name: 'Infinite Potential', slug: 'infinite-potential', category: 'neon-vibes', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/f63e7455-f7d2-4495-b59d-f7f43241e629_2b5e8c9f.jpg' },
  { name: 'Still Evolving', slug: 'still-evolving', category: 'neon-vibes', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/f63e7455-f7d2-4495-b59d-f7f43241e629_2b5e8c9f.jpg' },

  // Cute Animals
  { name: 'Work From Home Kitty', slug: 'work-from-home-kitty', category: 'animals', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/e0cc0caf-802b-4606-b7c8-67c752e01890_3d1f5e2c.jpg' },
  { name: 'Party Puppy', slug: 'party-puppy', category: 'animals', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/e0cc0caf-802b-4606-b7c8-67c752e01890_3d1f5e2c.jpg' },
  { name: 'Too Early Cat', slug: 'too-early-cat', category: 'animals', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/e0cc0caf-802b-4606-b7c8-67c752e01890_3d1f5e2c.jpg' },
  { name: 'Much Wow', slug: 'much-wow', category: 'animals', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/e0cc0caf-802b-4606-b7c8-67c752e01890_3d1f5e2c.jpg' },
  { name: 'Doomscrolling', slug: 'doomscrolling', category: 'animals', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/e0cc0caf-802b-4606-b7c8-67c752e01890_3d1f5e2c.jpg' },
  { name: 'Magic Kitty', slug: 'magic-kitty', category: 'animals', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/e0cc0caf-802b-4606-b7c8-67c752e01890_3d1f5e2c.jpg' },

  // Women's Empowerment
  { name: 'Kiss With Intent', slug: 'kiss-with-intent', category: 'empowerment', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/e8f89d57-1901-4f5c-bd5a-c153c73fa37e_4c2d6f1b.jpg' },
  { name: 'Still Got It', slug: 'still-got-it', category: 'empowerment', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/e8f89d57-1901-4f5c-bd5a-c153c73fa37e_4c2d6f1b.jpg' },
  { name: 'Access Granted', slug: 'access-granted', category: 'empowerment', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/e8f89d57-1901-4f5c-bd5a-c153c73fa37e_4c2d6f1b.jpg' },
  { name: 'Sparks & Bubbles', slug: 'sparks-bubbles', category: 'empowerment', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/e8f89d57-1901-4f5c-bd5a-c153c73fa37e_4c2d6f1b.jpg' },
  { name: 'Late Check-Out', slug: 'late-check-out', category: 'empowerment', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/e8f89d57-1901-4f5c-bd5a-c153c73fa37e_4c2d6f1b.jpg' },
  { name: 'Chemistry', slug: 'chemistry', category: 'empowerment', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/e8f89d57-1901-4f5c-bd5a-c153c73fa37e_4c2d6f1b.jpg' },

  // Bling Ideas
  { name: 'Debugger', slug: 'debugger', category: 'tech', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/blingideas_9e3f7c2d.jpg' },
  { name: 'NPC Energy', slug: 'npc-energy', category: 'tech', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/blingideas_9e3f7c2d.jpg' },
  { name: 'Doomscroll', slug: 'doomscroll', category: 'tech', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/blingideas_9e3f7c2d.jpg' },
  { name: 'Git Gud', slug: 'git-gud', category: 'tech', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/blingideas_9e3f7c2d.jpg' },

  // Sci-Fi Characters
  { name: 'Astronaut', slug: 'astronaut', category: 'scifi', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/Gemini_Generated_Image_6705jy6705jy6705_1f4e8c3b.png' },
  { name: 'Robot', slug: 'robot', category: 'scifi', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/Gemini_Generated_Image_6705jy6705jy6705_1f4e8c3b.png' },
  { name: 'Alien', slug: 'alien', category: 'scifi', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/Gemini_Generated_Image_6705jy6705jy6705_1f4e8c3b.png' },

  // Digital Dreams
  { name: 'Pixel Gamers', slug: 'pixel-gamers', category: 'digital', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/Gemini_Generated_Image_aqxfkjaqxfkjaqxf_5d2e9a1c.png' },
  { name: 'Gaming Beast', slug: 'gaming-beast', category: 'digital', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/Gemini_Generated_Image_aqxfkjaqxfkjaqxf_5d2e9a1c.png' },
  { name: 'Love Swans', slug: 'love-swans', category: 'digital', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/Gemini_Generated_Image_aqxfkjaqxfkjaqxf_5d2e9a1c.png' },
  { name: 'Pixel Angel', slug: 'pixel-angel', category: 'digital', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/Gemini_Generated_Image_aqxfkjaqxfkjaqxf_5d2e9a1c.png' },
  { name: 'Swan Hearts', slug: 'swan-hearts', category: 'digital', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/Gemini_Generated_Image_aqxfkjaqxfkjaqxf_5d2e9a1c.png' },
  { name: 'Tree Brain', slug: 'tree-brain', category: 'digital', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/Gemini_Generated_Image_aqxfkjaqxfkjaqxf_5d2e9a1c.png' },

  // Wellness Vibes
  { name: 'Touch Grass', slug: 'touch-grass', category: 'wellness', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/Gemini_Generated_Image_brlnh3brlnh3brln_6e3a7d2f.webp' },
  { name: 'Chill Out', slug: 'chill-out', category: 'wellness', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/Gemini_Generated_Image_brlnh3brlnh3brln_6e3a7d2f.webp' },
  { name: 'Creative Flow', slug: 'creative-flow', category: 'wellness', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/Gemini_Generated_Image_brlnh3brlnh3brln_6e3a7d2f.webp' },
];

const productTypes = ['tshirt', 'hoodie', 'mug', 'water_bottle', 'coffee_bottle', 'phone_case'];

const pricing = {
  tshirt: 20,
  hoodie: 40,
  mug: 14,
  water_bottle: 18,
  coffee_bottle: 20,
  phone_case: 22,
};

const descriptions = {
  tshirt: 'Premium quality t-shirt with vibrant print',
  hoodie: 'Cozy hoodie featuring bold design',
  mug: 'Coffee mug with eye-catching artwork',
  water_bottle: 'Durable water bottle with custom design',
  coffee_bottle: 'Insulated coffee bottle with unique print',
  phone_case: 'Protective phone case with premium design',
};

async function seedProducts() {
  console.log('Starting product seeding...');
  
  const productsToInsert = [];
  
  for (const design of designs) {
    for (const productType of productTypes) {
      productsToInsert.push({
        id: uuidv4(),
        designName: design.name,
        designSlug: design.slug,
        description: descriptions[productType],
        imageUrl: design.image,
        productType,
        price: pricing[productType],
        category: design.category,
        tags: `${design.category},${productType},anom-originals`,
        isActive: 1,
      });
    }
  }
  
  console.log(`Inserting ${productsToInsert.length} products...`);
  
  // Insert in batches to avoid overwhelming the database
  const batchSize = 50;
  for (let i = 0; i < productsToInsert.length; i += batchSize) {
    const batch = productsToInsert.slice(i, i + batchSize);
    await db.insert(products).values(batch);
    console.log(`Inserted batch ${Math.floor(i / batchSize) + 1} of ${Math.ceil(productsToInsert.length / batchSize)}`);
  }
  
  console.log('Product seeding complete!');
}

seedProducts().catch(console.error);
