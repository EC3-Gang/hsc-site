import { test, expect } from '@playwright/test';

test('events page has title', async ({ page }) => {
	await page.goto('/events');
	// Expect a title "to contain" a substring.
	await expect(page).toHaveTitle(/Events/);
});

test('CSM\'23 is visible under "past events"', async ({ page }) => {
	await page.goto('http://localhost:4321/events');
	await page.getByRole('button', { name: 'Upcoming' }).click();
	await page.getByRole('option', { name: 'Past' }).click();
	await expect(page.getByText('Combined Sports Meet (2023)', { exact: true })).toBeVisible();
});

test('search functionality on events works', async ({ page }) => {
	await page.goto('http://localhost:4321/events');
	await page.getByRole('button', { name: 'Upcoming' }).click();
	await page.getByText('All', { exact: true }).click();
	await page.getByPlaceholder('Search for an event').click();
	await page.getByPlaceholder('Search for an event').fill('track and field finals (2023)');
	await expect(page.getByText('Track and Field Finals (2023)28 Apr 2023 02:30 pmSingapore National StadiumHave')).toBeVisible();
});