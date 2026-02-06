import { test, expect } from '@playwright/test';

test.describe('Services Pages', () => {
  test('should display services index page', async ({ page }) => {
    await page.goto('/services');
    
    // Verify page title
    await expect(page.locator('h1')).toContainText('Professional Home Services');
    
    // Verify services are displayed
    const serviceCards = page.locator('[class*="service-card"]');
    await expect(serviceCards).toHaveCount(3); // We have 3 sample services
  });

  test('all service links should generate valid URLs', async ({ page }) => {
    await page.goto('/services');
    
    // Get all service links
    const serviceLinks = page.locator('a[href^="/services/"]');
    const count = await serviceLinks.count();
    
    expect(count).toBeGreaterThan(0);
    
    // Test each service link
    for (let i = 0; i < count; i++) {
      const link = serviceLinks.nth(i);
      const href = await link.getAttribute('href');
      
      if (href && href !== '/services' && href !== '/services/') {
        const response = await page.goto(href);
        expect(response?.status()).toBe(200);
        
        // Verify service page has expected content
        await expect(page.locator('h1')).toBeVisible();
        await expect(page.getByText('Call Now')).toBeVisible();
      }
    }
  });

  test('service detail page should have SEO elements', async ({ page }) => {
    await page.goto('/services/emergency-plumbing');
    
    // Check for meta description
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    expect(metaDescription).toBeTruthy();
    expect(metaDescription?.length).toBeGreaterThan(50);
    
    // Check for Open Graph tags
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toBeTruthy();
    
    // Check for JSON-LD schema
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd.first()).toBeAttached();
  });

  test('service page should have CTA buttons', async ({ page }) => {
    await page.goto('/services/emergency-plumbing');
    
    // Verify Call Now button exists
    const callButton = page.getByRole('link', { name: /Call Now/i });
    await expect(callButton).toBeVisible();
    
    // Verify Get Free Quote button exists
    const quoteButton = page.getByRole('link', { name: /Get Free Quote/i });
    await expect(quoteButton).toBeVisible();
  });

  test('should navigate between service pages', async ({ page }) => {
    await page.goto('/services');
    
    // Click first service
    await page.locator('a[href^="/services/"]').first().click();
    
    // Verify we're on a service detail page
    await expect(page).toHaveURL(/\/services\/.+/);
    await expect(page.locator('h1')).toBeVisible();
  });
});

test.describe('Projects Pages', () => {
  test('should display projects index page', async ({ page }) => {
    await page.goto('/projects');
    
    // Verify page title
    await expect(page.locator('h1')).toContainText('Before & After Gallery');
    
    // Verify projects are displayed
    const projectCards = page.locator('a[href^="/projects/"]');
    const count = await projectCards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('project detail page should have before/after slider', async ({ page }) => {
    await page.goto('/projects/modern-kitchen-transformation');
    
    // Verify slider exists
    const slider = page.locator('[data-slider]');
    await expect(slider).toBeVisible();
    
    // Verify slider input exists
    const sliderInput = page.locator('[data-slider-input]');
    await expect(sliderInput).toBeVisible();
  });

  test('before/after slider should be interactive', async ({ page }) => {
    await page.goto('/projects/modern-kitchen-transformation');
    
    const slider = page.locator('[data-slider-input]');
    await expect(slider).toBeVisible();
    
    // Interact with slider
    await slider.fill('75');
    
    // Verify slider value changed
    const value = await slider.inputValue();
    expect(value).toBe('75');
  });
});
