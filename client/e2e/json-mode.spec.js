import { test, expect } from '@playwright/test';

test('JSON mode and full screen render the code editor', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));

  await page.route('**/api/v1/**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ data: [] }),
    });
  });

  await page.goto('/create-post');

  await page.getByRole('button', { name: /switch to json prompt/i }).click();
  await page.getByRole('button', { name: /full screen/i }).click();
  await page.locator('.json-editor-textarea').fill('{"scene": "fox"}');

  await expect(page.getByText('Valid JSON')).toBeVisible();
  await expect(page.getByRole('button', { name: /exit full screen/i })).toBeVisible();
  expect(errors).toEqual([]);
});
