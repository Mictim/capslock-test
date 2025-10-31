import { test } from "../fixtures/fixture";

const sections = [
    "Hero",
    "Falling",
    "General View",
    "Health Block",
    "Slider",
    "Warranty",
    "Form 1",
    "Form 2"
]

test.describe('Miscellaneous Tests @misc', () => {
    test('Validate sections on Main Page', async ({ app }) => {
        await app.main.expectLoaded();
        for (const section of sections) {
            await app.main.validateSectionOnPage(section);
        };
    });

    // Will fail on CI due to geolocation based on IP
    test.skip('Validate location on Main Page @geolocation', async ({ app }) => {
        await app.main.expectLoaded();
        await app.main.validateLocation("Greater Poland");
    });

    test('Validate slider switch by Next/Prev buttons', async ({ app }) => {
        await app.main.expectLoaded();
        await app.main.validateSliderItemsSwitchingByButtons('next');
        await app.main.validateSliderItemsSwitchingByButtons('prev');
    });

    test('Validate slider switch by images', async ({ app }) => {
        await app.main.expectLoaded();
        await app.main.validateSliderItemsSwitchByBottomImages(1);
        await app.main.validateSliderItemsSwitchByBottomImages(2);
        await app.main.validateSliderItemsSwitchByBottomImages(3);
    });
});