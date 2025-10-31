
import { test } from "../fixtures/fixture";
import { testData } from "../resources/errors";


test.describe('Fill form. Negative Tests @negative', () => {
    for(const data of testData.zip) {
        test(`Validate ${data.testName}`, async ({ app }) => {
            await app.main.open();
            await app.main.completeFirstStep(data);
            await app.main.validateErrorMessage(
                data.index,
                1,
                data.errorMessage!
            );
        });
    }

    test('Validate property type required error', async ({ app }) => {
        await app.main.open();
        await app.main.completeFirstStep(testData.propertyTypeRequired);
        await app.main.completeSecondStep(testData.propertyTypeRequired);
        await app.main.selectPropertyType(testData.propertyTypeRequired);
        await app.main.submitStep(
            testData.propertyTypeRequired.index,
            3
        );
        await app.main.validateErrorMessage(
            testData.propertyTypeRequired.index,
            3,
            testData.propertyTypeRequired.errorMessage!
        );
    });

    for(const data of testData.user) {
        test(`Validate ${data.testName}`, async ({ app }) => {
            await app.main.open();
            await app.main.completeFirstStep(data);
            await app.main.completeSecondStep(data);
            await app.main.completeThirdStep(data);
            await app.main.fillName(data);
            await app.main.fillEmail(data);
            await app.main.submitStep(
                data.index,
                4
            );
            await app.main.validateErrorMessage(
                data.index,
                4,
                data.errorMessage!
            );
        });
    }

    test('Validate phone number error', async ({ app }) => {
        await app.main.open();
        await app.main.completeFirstStep(testData.wrongPhoneNumber);
        await app.main.completeSecondStep(testData.wrongPhoneNumber);
        await app.main.completeThirdStep(testData.wrongPhoneNumber);
        await app.main.completeFourthStep(testData.wrongPhoneNumber);
        await app.main.fillPhoneNumber(testData.wrongPhoneNumber);
        await app.main.submitStep(
            testData.wrongPhoneNumber.index,
            5
        );
        await app.main.validateErrorMessage(
            testData.wrongPhoneNumber.index,
            5,
            testData.wrongPhoneNumber.errorMessage!
        );
    });

    for(const data of testData.sorryEmail) {
        test(`Validate ${data.testName}`, async ({ app }) => {
            await app.main.open();
            await app.main.completeFirstStep(data);
            await app.main.fillSorryEmail(data);
            await app.main.submitStep(
                data.index,
                'sorry'
            );
            await app.main.validateErrorMessage(
                data.index,
                'sorry',
                data.errorMessage!
            );
        });
    }
        
});