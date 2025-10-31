import { test } from '../fixtures/fixture';
import { testData } from '../resources/fill-form';
import { FormType } from '../types/form';

const specTestData: FormType = {
    index: 1,
    zipCode: '11111',
    email: 'joe@example.com'
}

test.describe('[Sunny Day] Fill Form Tests @smoke', () => {
    for (const formData of testData) {
        test(`Fill form for user ${formData.name}`, async ({ app }) => {
            await app.main.expectLoaded();
            await app.main.fillTheForm(formData);
            await app.thankYou.expectLoaded();
        });
    }
});

test.describe('Fill form with specific ZIP code', () => {
    test('Fill form with ZIP code 11-111', async ({ app }) => {
        await app.main.expectLoaded();
        await app.main.completeFirstStep(specTestData);
        await app.main.fillSorryEmail(specTestData);
        await app.main.submitStep(
            specTestData.index,
            'sorry'
        );
        await app.main.validateStepSorryThankYouMessage(specTestData.index);
    });
})