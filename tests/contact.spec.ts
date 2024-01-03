import { test, expect } from '@playwright/test';

test('contact page has title', async ({ page }) => {
	await page.goto('/contact');

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Contact/);
});