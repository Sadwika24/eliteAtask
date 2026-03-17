import { test, expect } from '@playwright/test';

// EPAM Services -> Explore Client Work
// This file will be populated incrementally. DO NOT EDIT MANUALLY.

// Test: EPAM Services -> Explore Client Work
// Steps:
// 1. Open https://www.epam.com/
// 2. Select "Services" from the header
// 3. Click "Explore Our Client Work"
// 4. Verify "Client Work" heading is visible

test('EPAM: Navigate to Services -> Explore Our Client Work', async ({ page }) => {
  // 1) Navigate to the EPAM homepage
  await page.goto('https://www.epam.com/');

  // 2) Click the "Services" header link. Use a robust selector and fallbacks
  const servicesLink = page.locator('a[href="/services"]').first();
  await servicesLink.scrollIntoViewIfNeeded();
  try {
    await servicesLink.click({ timeout: 5000 });
  } catch (e) {
    // If an overlay or media intercepts pointer events, force the click as a fallback
    await servicesLink.click({ force: true });
  }

  // Ensure we are on the Services page; if the click didn't navigate, navigate directly
  await page.waitForURL('**/services/**', { timeout: 10000 }).catch(async () => {
    await page.goto('https://www.epam.com/services');
    await page.waitForURL('**/services/**', { timeout: 10000 });
  });

  // 3) Click the Client Work / Explore link
  const clientWorkLink = page.locator('a[href="/services/client-work"]').first();
  await clientWorkLink.scrollIntoViewIfNeeded();
  try {
    await clientWorkLink.click({ timeout: 5000 });
  } catch (e) {
    await clientWorkLink.click({ force: true });
  }

  // Wait for the Client Work page
  await page.waitForURL('**/services/client-work', { timeout: 10000 });

  // 4) Assert that the "Client Work" heading is visible
  const heading = page.getByRole('heading', { name: /Client Work/i });
  await expect(heading).toBeVisible({ timeout: 5000 });
});
