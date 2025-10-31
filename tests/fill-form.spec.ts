import { test } from '../fixtures/fixture';
import { testData } from '../resources/fill-form';

test.describe('[Sunny Day] Fill Form Tests', () => {
    for (const formData of testData) {
        test(`Fill form for user ${formData.name}`, async ({ app }) => {
            await app.main.expectLoaded();
            await app.main.fillTheForm(formData);
            await app.thankYou.expectLoaded();
        });
    }
});