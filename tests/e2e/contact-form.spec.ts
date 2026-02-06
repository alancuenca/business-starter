import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('should open contact form dialog on CTA click', async ({ page }) => {
    await page.goto('/');
    
    // Click the "Get Free Quote" button
    const ctaButton = page.getByTestId('cta-contact');
    await expect(ctaButton).toBeVisible();
    await ctaButton.click();
    
    // Verify the contact form section is visible
    const contactSection = page.locator('#contact-form');
    await expect(contactSection).toBeVisible();
  });

  test('should complete multi-step contact form', async ({ page }) => {
    await page.goto('/#contact-form');
    
    // Step 1: Select service type
    await page.locator('input[name="service"][value="Emergency Plumbing"]').check();
    await page.getByRole('button', { name: 'Next' }).click();
    
    // Step 2: Fill contact information
    await page.fill('#name', 'John Doe');
    await page.fill('#phone', '(555) 123-4567');
    await page.fill('#email', 'john@example.com');
    await page.getByRole('button', { name: 'Next' }).nth(1).click();
    
    // Step 3: Fill project details
    await page.fill('#address', '123 Main St, San Francisco, CA');
    await page.fill('#details', 'Need emergency plumbing repair for burst pipe.');
    await page.selectOption('#timeline', 'emergency');
    
    // Submit form
    await page.getByRole('button', { name: 'Submit Request' }).click();
    
    // Verify success message
    await expect(page.locator('#success-message')).toBeVisible();
    await expect(page.locator('#success-message')).toContainText('Thank You!');
  });

  test('should validate required fields', async ({ page }) => {
    await page.goto('/#contact-form');
    
    // Try to proceed without selecting service
    await page.getByRole('button', { name: 'Next' }).click();
    
    // Should still be on step 1 due to validation
    const step1 = page.locator('fieldset[data-step="1"]');
    await expect(step1).toHaveClass(/active/);
  });

  test('should allow navigation between steps', async ({ page }) => {
    await page.goto('/#contact-form');
    
    // Select service and go to step 2
    await page.locator('input[name="service"][value="Kitchen Remodel"]').check();
    await page.getByRole('button', { name: 'Next' }).click();
    
    // Fill some data
    await page.fill('#name', 'Jane Smith');
    
    // Go back to step 1
    await page.getByRole('button', { name: 'Back' }).click();
    
    // Verify we're back on step 1
    const step1 = page.locator('fieldset[data-step="1"]');
    await expect(step1).toHaveClass(/active/);
    
    // Verify selection is preserved
    await expect(page.locator('input[name="service"][value="Kitchen Remodel"]')).toBeChecked();
  });
});
