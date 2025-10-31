import { test } from '../fixtures/fixture';
import { FormType } from "../types/form";

const testData: FormType[] = [
    {
        index: 1,
        zipCode: '13481',
        interest: ['Independence', 'Safety'],
        propertyType: 'Owned',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '2345678901'
    },
    {
        index: 2,
        zipCode: '65123',
        interest: ['Therapy', 'Other'],
        propertyType: 'Rental',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '3456789012'
    }
]


test.describe('[Sunny Day] Fill Form Tests', () => {
    for (const formData of testData) {
        test(`Fill form for user ${formData.name}`, async ({ app }) => {
            await app.main.expectLoaded();
            await app.main.fillTheForm(formData);
            await app.thankYou.expectLoaded();
        });
    }
});