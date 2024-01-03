import { test, expect } from '@playwright/test';

test('initiatives page has title', async ({ page }) => {
	await page.goto('/initiatives');

	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Initiatives/);
});

test('search functionality on initiatives work', async ({ page }) => {
	await page.goto('http://localhost:4321/initiatives');
	await page.getByPlaceholder('Search for an initiative').click();
	await page.getByPlaceholder('Search for an initiative').fill('notes');
	await expect(page.getByText('HCNotes', { exact: true })).toBeVisible();
});