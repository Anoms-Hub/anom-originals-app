# Social Media Preview Guide - Anom Originals

## What Was Fixed

Your website now has complete Open Graph and social media meta tags for **Facebook, Reddit, LinkedIn, and YouTube**. When you share your link on these platforms, it will display:

- **Beautiful neon preview image** (the cyberpunk Anom Originals graphic)
- **Compelling title**: "Anom Originals - Turn Your Personality Into Art"
- **Engaging description**: Details about your services
- **Proper dimensions** optimized for each platform

---

## Meta Tags Added

### Open Graph Tags (Facebook, LinkedIn, Reddit)
```html
<meta property="og:type" content="website" />
<meta property="og:url" content="https://anomartsy.xyz/" />
<meta property="og:title" content="Anom Originals - Turn Your Personality Into Art" />
<meta property="og:description" content="Custom digital art, graphic design, and AI-assisted creative direction. Emotes, profile pictures, merchandise, and more." />
<meta property="og:image" content="https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/anom-social-preview-3znYqEaehtEFrNyV8Ao9sH.png" />
<meta property="og:image:width" content="2752" />
<meta property="og:image:height" content="1536" />
```

### Twitter/X Tags
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Anom Originals - Turn Your Personality Into Art" />
<meta name="twitter:description" content="Custom digital art, graphic design, and AI-assisted creative direction. Emotes, profile pictures, merchandise, and more." />
<meta name="twitter:image" content="https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/anom-social-preview-3znYqEaehtEFrNyV8Ao9sH.png" />
```

### LinkedIn Tags
```html
<meta property="linkedin:title" content="Anom Originals - Digital Art & Creative Direction" />
<meta property="linkedin:description" content="Transform your personality into vibrant visual experiences. Custom digital art, graphic design, emotes, profile pictures, and merchandise." />
<meta property="linkedin:image" content="https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/anom-social-preview-3znYqEaehtEFrNyV8Ao9sH.png" />
```

### YouTube Tags
```html
<meta property="youtube:title" content="Anom Originals - Digital Art & Creative Direction" />
<meta property="youtube:description" content="Custom digital art, graphic design, and AI-assisted creative direction. Transform your personality into vibrant visual experiences." />
<meta property="youtube:image" content="https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/anom-social-preview-3znYqEaehtEFrNyV8Ao9sH.png" />
```

---

## How to Test Each Platform

### Facebook & Instagram
1. Go to [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/sharing/)
2. Enter your URL: `https://anomartsy.xyz/`
3. Click "Debug"
4. You should see:
   - Your neon preview image
   - Title: "Anom Originals - Turn Your Personality Into Art"
   - Description about your services
5. If the preview doesn't update, click "Scrape Again" to refresh

### Twitter/X
1. Go to [Twitter Card Validator](https://cards-dev.twitter.com/validator)
2. Enter your URL: `https://anomartsy.xyz/`
3. You should see:
   - Large preview image (summary_large_image format)
   - Title and description
   - Creator credit (@anomoriginals)

### LinkedIn
1. Go to [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
2. Enter your URL: `https://anomartsy.xyz/`
3. You should see:
   - Preview image
   - Title and description
   - Proper formatting for LinkedIn shares

### Reddit
1. Go to [Reddit Link Preview Tool](https://www.reddit.com/r/test/)
2. Create a test post and paste your link
3. Reddit will automatically fetch the preview:
   - Image from og:image
   - Title from og:title
   - Description from og:description

### YouTube
1. YouTube uses og:image and og:description for video recommendations
2. When you link to your site in YouTube descriptions or community posts, it will show the preview

---

## Preview Image Details

**File**: `anom-social-preview.png`  
**Dimensions**: 2752 x 1536px (16:9 aspect ratio)  
**Format**: PNG (original) + WebP (compressed)  
**URL**: `https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/anom-social-preview-3znYqEaehtEFrNyV8Ao9sH.png`

**Visual Elements**:
- Anom Originals neon infinity logo (cyan & magenta)
- Bold cyan text: "TURN YOUR PERSONALITY INTO ART"
- Subtext: "Digital Art • Graphic Design • Creative Direction"
- Dark cyberpunk background with circuit patterns
- Neon glow effects and digital noise overlay

---

## Platform-Specific Behavior

| Platform | Image Size | Title Length | Description Length | Best Practice |
|----------|-----------|-------------|-------------------|----------------|
| **Facebook** | 1200x630px (1.91:1) | 60 chars | 160 chars | Use og:image, og:title, og:description |
| **Twitter/X** | 1200x675px (16:9) | 70 chars | 200 chars | Use twitter:card="summary_large_image" |
| **LinkedIn** | 1200x627px (1.91:1) | 60 chars | 160 chars | Use og:image and og:title |
| **Reddit** | 1200x630px (1.91:1) | 60 chars | 160 chars | Uses og:image, og:title, og:description |
| **YouTube** | 1200x627px | 60 chars | 160 chars | Uses og:image and og:description |

---

## Troubleshooting

### Preview Not Showing?

**Solution 1: Clear Cache**
- Facebook: Click "Scrape Again" in the Sharing Debugger
- Twitter: Wait 24 hours or use the Card Validator
- LinkedIn: Click "Inspect" again
- Reddit: Clear browser cache and try again

**Solution 2: Verify Image URL**
- Make sure the image URL is publicly accessible
- Test in browser: https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/anom-social-preview-3znYqEaehtEFrNyV8Ao9sH.png
- Image should load without errors

**Solution 3: Check Meta Tags**
- Right-click on your website → "View Page Source"
- Search for "og:image", "og:title", "og:description"
- Verify they're present and have correct values

### Image Looks Blurry?

- Facebook and LinkedIn may compress images
- Our image is high-quality (2752x1536px) which is optimal
- Different platforms crop differently - this is normal

### Title/Description Not Showing?

- Check character limits (title: 60 chars, description: 160 chars)
- Verify no special characters are breaking the tags
- Clear cache and try again

---

## When to Update Meta Tags

Update the meta tags in `client/index.html` if you:

1. **Change your brand message** - Update og:title and og:description
2. **Create a new preview image** - Update og:image URL
3. **Add new services** - Update og:description to mention them
4. **Change your domain** - Update og:url

**Location**: `/home/ubuntu/anom-originals-landing/client/index.html`

---

## Best Practices Going Forward

1. **Keep descriptions concise** - Under 160 characters for maximum compatibility
2. **Use the same image** - Consistency across all platforms builds brand recognition
3. **Test before sharing** - Use the validators above before posting to social media
4. **Monitor engagement** - See which platforms drive the most traffic
5. **Update seasonally** - Refresh preview image and description for new campaigns

---

## Quick Reference URLs

- **Your Website**: https://anomartsy.xyz/
- **Facebook Debugger**: https://developers.facebook.com/tools/debug/sharing/
- **Twitter Validator**: https://cards-dev.twitter.com/validator
- **LinkedIn Inspector**: https://www.linkedin.com/post-inspector/
- **Preview Image**: https://d2xsxph8kpxj0f.cloudfront.net/310519663404343710/8vpTXzdJWtzLJPMkvmwcBn/anom-social-preview-3znYqEaehtEFrNyV8Ao9sH.png

---

## Questions?

If previews still aren't showing after testing:
1. Verify your domain is correctly set to https://anomartsy.xyz/
2. Check that the image URL is accessible
3. Wait 24-48 hours for social media caches to update
4. Try using a different domain or subdomain to test
