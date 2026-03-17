import { test, expect } from '@playwright/test';

test('EPAM: Services -> Explore Our Client Work -> Client Work visible', async ({ page }) => {
  // Navigate to EPAM home
  await page.goto('https://www.epam.com/', { waitUntil: 'networkidle' });

  // Click Services link (verified selector: a[href="/services"]). Use evaluate to avoid pointer interception.
  const servicesHandle = await page.$('a[href="/services"]');
  if (servicesHandle) {
    await page.evaluate(el => (el as HTMLElement).click(), servicesHandle);
  } else {
    // fallback to text selector
    await page.click('text=Services');
  }

  // wait for potential UI update
  await page.waitForTimeout(1000);

  // Click Explore Our Client Work (verified selector: a[href="/services/client-work"]).
  const exploreHandle = await page.$('a[href="/services/client-work"]');
  if (exploreHandle) {
    await page.evaluate(el => (el as HTMLElement).click(), exploreHandle);
  } else {
    await page.click('text=Explore Our Client Work');
  }

  // Wait for navigation/content load
  await page.waitForLoadState('networkidle');

  // Assert that 'Client Work' text is visible on the target page
  await expect(page.locator('text=Client Work')).toBeVisible({ timeout: 8000 });
});
