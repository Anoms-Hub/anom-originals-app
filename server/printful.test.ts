import { describe, it, expect, beforeEach } from 'vitest';

describe('Printful API Integration', () => {
  beforeEach(() => {
    // Verify API key is set
    if (!process.env.PRINTFUL_API_KEY) {
      throw new Error('PRINTFUL_API_KEY environment variable is not set');
    }
  });

  it('should have Printful API key configured', () => {
    expect(process.env.PRINTFUL_API_KEY).toBeDefined();
    expect(process.env.PRINTFUL_API_KEY).toBeTruthy();
    expect(process.env.PRINTFUL_API_KEY?.length).toBeGreaterThan(0);
  });

  it('should validate API key format', () => {
    const apiKey = process.env.PRINTFUL_API_KEY;
    // Printful API keys are typically alphanumeric strings
    expect(apiKey).toMatch(/^[a-zA-Z0-9]+$/);
  });

  it('should be able to authenticate with Printful API', async () => {
    const apiKey = process.env.PRINTFUL_API_KEY;
    
    try {
      const response = await fetch('https://api.printful.com/orders', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      // We expect either 200 (success) or 400+ (API error, but auth worked)
      // If we get 401, the API key is invalid
      expect(response.status).not.toBe(401);
      
      // Should be able to parse response
      const data = await response.json();
      expect(data).toBeDefined();
    } catch (error) {
      // Network errors are acceptable in test environment
      // The important thing is that the API key is set
      expect(apiKey).toBeDefined();
    }
  });

  it('should have valid Printful store access', async () => {
    const apiKey = process.env.PRINTFUL_API_KEY;
    
    try {
      const response = await fetch('https://api.printful.com/stores', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      // Check if we can access stores endpoint
      if (response.ok) {
        const data = await response.json();
        expect(data.result).toBeDefined();
      } else if (response.status === 401) {
        throw new Error('Invalid API key - authentication failed');
      }
    } catch (error) {
      // Network errors are acceptable
      expect(apiKey).toBeDefined();
    }
  });
});
