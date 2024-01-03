import { test, expect } from '@playwright/test';

test('homepage has title', async ({ page }) => {
	await page.goto('/');

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Home/);
});

test('hero should be visible', async ({ page }) => {
	await page.goto('http://localhost:4321/');
	await expect(page.getByText('OneHwaChong Showcasing events')).toBeVisible();
});

test('hero link should work', async ({ page }) => {
	await page.goto('http://localhost:4321/');
	await page.getByRole('link', { name: 'About Us' }).click();
	await page.goto('http://localhost:4321/about');
	await expect(page.getByRole('heading', { name: 'About' })).toBeVisible();
});