import { test, expect } from '@playwright/test';

test('blog page has title', async ({ page }) => {
	await page.goto('/blog');
	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Blog/);
});

test('blog posts should be visible', async ({ page }) => {
	await page.goto('http://localhost:4321/blog');
	await expect(page.getByText('Blog View write-ups and and posts about events and announcements here Past')).toBeVisible();
	await page.getByRole('link', { name: 'SOO \'23 Banner Past Events' }).click();
	await page.goto('http://localhost:4321/blog/secondary-one-orientation-2023');
	await expect(page.locator('body')).toContainText('The Secondary One Orientation for our incoming Freshmen was held from 3rd January to 4th January this year.');
});