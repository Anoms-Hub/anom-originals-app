import { getDb } from './server/db.ts';
import { products as productsTable } from './drizzle/schema.ts';
import { v4 as uuidv4 } from 'uuid';

const designs = [
  // Self-Care Collection (6 designs)
  { name: 'Cheers To Us', slug: 'cheers-to-us', category: 'self-care', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/cheers-to-us_5d2d0f30.png' },
  { name: "I've Earned This", slug: 'ive-earned-this', category: 'self-care', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/ive-earned-this_0628cac5.png' },
  { name: 'Self-Care Mode On', slug: 'self-care-mode-on', category: 'self-care', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/self-care-mode-on_51e0cd23.png' },
  { name: 'Rest Well', slug: 'rest-well', category: 'self-care', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/rest-well_394353cc.png' },
  { name: 'Still Celebrating', slug: 'still-celebrating', category: 'self-care', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/still-celebrating_3d63860a.png' },
  { name: 'Adulting Is Hard', slug: 'adulting-is-hard', category: 'self-care', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/adulting-is-hard_7e4b1c2a.png' },

  // Luxury Icons (6 designs)
  { name: 'Coffee Power', slug: 'coffee-power', category: 'luxury', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/coffee-power_c7a1df6d.png' },
  { name: 'Rare Gem', slug: 'rare-gem', category: 'luxury', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/rare-gem_b2199c1f.png' },
  { name: 'Still Royal', slug: 'still-royal', category: 'luxury', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/still-royal_78c80fc5.png' },
  { name: 'Big Heart', slug: 'big-heart', category: 'luxury', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/big-heart_8f5e3d1b.png' },
  { name: 'Leveling Up', slug: 'leveling-up', category: 'luxury', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/leveling-up_e2a6d85e.png' },
  { name: 'Daily Dose', slug: 'daily-dose', category: 'luxury', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/daily-dose_50c8ec8d.png' },

  // Neon Power (6 designs)
  { name: 'My Back Has Opinions', slug: 'my-back-has-opinions', category: 'neon-power', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/my-back-has-opinions_54615a15.png' },
  { name: 'Still Dangerous', slug: 'still-dangerous', category: 'neon-power', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/still-dangerous_30456279.png' },
  { name: 'Relentless', slug: 'relentless', category: 'neon-power', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/relentless_ffdde3e6.png' },
  { name: 'Coffee: My Love Language', slug: 'coffee-my-love-language', category: 'neon-power', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/coffee-my-love-language_5d80bd18.png' },
  { name: 'Permission Granted', slug: 'permission-granted', category: 'neon-power', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/permission-granted_2954eb07.png' },
  { name: 'Chaos Coordinator', slug: 'chaos-coordinator', category: 'neon-power', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/chaos-coordinator_9c3e5f2d.png' },

  // Neon Vibes (6 designs)
  { name: 'Laughing Through It', slug: 'laughing-through-it', category: 'neon-vibes', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/laughing-through-it_7f8643ac.png' },
  { name: 'Slay The Day', slug: 'slay-the-day', category: 'neon-vibes', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/slay-the-day_4c4d3958.png' },
  { name: 'Tissue For Your Issues', slug: 'tissue-for-your-issues', category: 'neon-vibes', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/tissue-for-your-issues_2d226ae6.png' },
  { name: 'Protected', slug: 'protected', category: 'neon-vibes', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/protected_d099e16e.png' },
  { name: 'Infinite Potential', slug: 'infinite-potential', category: 'neon-vibes', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/infinite-potential_ad52c4bd.png' },
  { name: 'Still Evolving', slug: 'still-evolving', category: 'neon-vibes', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/still-evolving_ec9ef912.png' },

  // Cute Animals (6 designs)
  { name: 'Work From Home Kitty', slug: 'work-from-home-kitty', category: 'animals', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/work-from-home-kitty_38cad53b.png' },
  { name: 'Party Puppy', slug: 'party-puppy', category: 'animals', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/party-puppy_35e5212f.png' },
  { name: 'Too Early Cat', slug: 'too-early-cat', category: 'animals', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/too-early-cat_f827eb45.png' },
  { name: 'Much Wow', slug: 'much-wow', category: 'animals', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/much-wow_c2777e0f.png' },
  { name: 'Doomscrolling', slug: 'doomscrolling', category: 'animals', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/doomscrolling_1f0f027f.png' },
  { name: 'Magic Kitty', slug: 'magic-kitty', category: 'animals', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/magic-kitty_1cda851c.png' },

  // Women's Empowerment (6 designs)
  { name: 'Kiss With Intent', slug: 'kiss-with-intent', category: 'empowerment', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/kiss-with-intent_22977fd2.png' },
  { name: 'Still Got It', slug: 'still-got-it', category: 'empowerment', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/still-got-it_7d3ad002.png' },
  { name: 'Access Granted', slug: 'access-granted', category: 'empowerment', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/access-granted_4e7f2c1d.png' },
  { name: 'Sparks & Bubbles', slug: 'sparks-and-bubbles', category: 'empowerment', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/sparks-and-bubbles_89ea84c7.png' },
  { name: 'Late Check-Out', slug: 'late-check-out', category: 'empowerment', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/late-check-out_e172520b.png' },
  { name: 'Chemistry', slug: 'chemistry', category: 'empowerment', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/chemistry_6e852dfd.png' },

  // Sci-Fi Characters (composite)
  { name: 'Sci-Fi Characters', slug: 'scifi-characters', category: 'scifi', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/scifi-characters_972844b6.png' },

  // Digital Dreams (composite)
  { name: 'Digital Dreams', slug: 'digital-dreams', category: 'digital', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/digital-dreams_f95b53c5.png' },

  // Wellness Vibes (composite)
  { name: 'Wellness Vibes', slug: 'wellness-vibes', category: 'wellness', image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/wellness-vibes_6ff46e53.webp' },
];

const productTypes = ['tshirt', 'hoodie', 'mug', 'water_bottle', 'coffee_bottle', 'phone_case', 'sweatshirt', 'cap'];

const pricing = {
  tshirt: 20,
  hoodie: 40,
  mug: 14,
  water_bottle: 18,
  coffee_bottle: 20,
  phone_case: 22,
  sweatshirt: 35,
  cap: 16,
};

const descriptions = {
  tshirt: 'Premium quality t-shirt with vibrant print',
  hoodie: 'Cozy hoodie featuring bold design',
  mug: 'Coffee mug with eye-catching artwork',
  water_bottle: 'Durable water bottle with custom design',
  coffee_bottle: 'Insulated coffee bottle with unique print',
  phone_case: 'Protective phone case with premium design',
  sweatshirt: 'Comfortable sweatshirt with custom artwork',
  cap: 'Adjustable cap with embroidered design',
};

async function seedProducts() {
  console.log('🌱 Starting product seeding...');
  
  const db = await getDb();
  if (!db) {
    console.error('❌ Database connection failed');
    process.exit(1);
  }

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
  
  console.log(`📦 Inserting ${productsToInsert.length} products...`);
  
  // Insert in batches to avoid overwhelming the database
  const batchSize = 50;
  for (let i = 0; i < productsToInsert.length; i += batchSize) {
    const batch = productsToInsert.slice(i, i + batchSize);
    await db.insert(productsTable).values(batch);
    const batchNum = Math.floor(i / batchSize) + 1;
    const totalBatches = Math.ceil(productsToInsert.length / batchSize);
    console.log(`✅ Batch ${batchNum}/${totalBatches} inserted`);
  }
  
  console.log('🎉 Product seeding complete!');
  console.log(`📊 Total products created: ${productsToInsert.length} (${designs.length} designs × ${productTypes.length} product types)`);
}

seedProducts().catch(err => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
