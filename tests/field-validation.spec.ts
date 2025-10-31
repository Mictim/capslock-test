import { test } from "../fixtures/fixture";

test.describe('Field Validation Tests @form-validation', () => {
    test('Validate email field type', async ({ app }) => {
        await app.main.expectLoaded();
        await app.main.validateEmailFieldType(1, 4);
        await app.main.validateEmailFieldType(1, 'sorry');
        await app.main.validateEmailFieldType(2, 4);
        await app.main.validateEmailFieldType(2, 'sorry');
    });

    test('Validate ZIP code field type', async ({ app }) => {
        await app.main.expectLoaded();
        await app.main.validateZipCodeFieldType(1);
        await app.main.validateZipCodeFieldType(2);
    });

    test('Validate name field type', async ({ app }) => {
        await app.main.expectLoaded();
        await app.main.validateNameFieldType(1, 4);
        await app.main.validateNameFieldType(2, 4);
    });

    test('Validate phone number field type', async ({ app }) => {
        await app.main.expectLoaded();
        await app.main.validatePhoneFieldType(1, 5);
        await app.main.validatePhoneFieldType(2, 5);
    });
});