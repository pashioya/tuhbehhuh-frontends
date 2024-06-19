// @ts-check
import { expect, test } from '@playwright/test';

test('Disable endpoint', async ({ page }) => {
    await page.goto('http://localhost:5173/api/7bff75e6-ce38-4618-8f94-dc8cf11745cb/endpoint/017f12f5-8acb-4531-ab77-0e5208a31bca');
    await page.waitForSelector('text=disable');
    await page.click('text=disable');
    await expect(page.waitForSelector('text=enable')).toBeDefined();
});