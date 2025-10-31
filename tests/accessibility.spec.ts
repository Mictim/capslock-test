import { test } from "../fixtures/fixture";

test.describe('Accessibility Tests', () => {
    test('Main Page Accessibility Test @accessibility', async ({ app }) => {
        await test.step('Check Main Page accessibility', async () => {
            await app.main.open();
        });
    });
});