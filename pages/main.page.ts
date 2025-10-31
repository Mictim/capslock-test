import test, { expect } from "@playwright/test";
import { AppPage } from "./page-holder";
import { FormType } from "../types/form";

export class MainPage extends AppPage {
    public pagePath = '/';
    public location = this.page.locator('.locationCityAndState');
    // Section hero elements
    public sectionHero = this.page.locator('section div.hero');
    // Section falling elements
    public sectionFalling = this.page.locator('section div.falling');
    // Section general view elements
    public sectionGeneralView = this.page.locator('section div.generalView');
    // Section health block elements
    public sectionHealthBlock = this.page.locator('section div.healthBlock');
    // Section slider elements
    public sectionSlider = this.page.locator('section div.sliderTheme_blue');
    public sliderTopContainer = this.sectionSlider.locator('.sliderDefault');
    public sliderBottomContainer = this.sectionSlider.locator('.sliderPrev');
    public sliderPrevButton = this.sliderTopContainer.locator('button.slick-prev');
    public sliderNextButton = this.sliderTopContainer.locator('button.slick-next');
    public sliderImage = this.sliderTopContainer.locator('.slick-list .slick-current img');
    public sliderBottomImages = this.sliderBottomContainer.locator('.slick-list');
    public sliderBottomVisibleImages = this.sliderBottomImages.locator('.slick-active img');
    public sliderBottomCurrentImage = this.sliderBottomImages.locator('.slick-current img');
    // Section warranty elements
    public sectionWarranty = this.page.locator('section div.warranty');
    // Section form elements
    public sectionForm = (index: 1 | 2) => this.page.locator('section.section_form').locator(`#form-container-${index}`);
    public stepContainer = (index: 1 | 2, step: 1 | 2 | 3 | 4 | 5 | 'sorry') => this.sectionForm(index).locator(`div.step-${step}`);


    /**
     * Method which verifies that Main Page is loaded
     * @param message (optional) Custom message to be displayed in case of failure
     */
    async expectLoaded(message?: string): Promise<void> {
        await test.step('Expect Main Page to be loaded', async () => {
            await expect(await this.page, { message: message ?? 'Main Page is loaded' }).toHaveTitle(/Caps Lock/);
        });
    }

    /**
     * Method which is validating location text on Main Page
     * @param expectedLocation Expected location text to be validated
     */
    async validateLocation(expectedLocation: string): Promise<void> {
        await test.step('Check location on Main Page', async () => {
            await expect(await this.location, 
                { message: `Location contains expected text: ${expectedLocation}` }
            ).toContainText(expectedLocation);
        });
    }

    /**
     * Method which is validating section header and subheader on Main Page
     * @param section Expected section
     */
    async validateSectionOnPage(section: string): Promise<void> {
        await test.step(`Validate ${section} section on Main Page`, async () => {
            let sectionLocator;
            switch (section) {
                case 'Hero':
                    sectionLocator = this.sectionHero;
                    break;
                case 'Falling':
                    sectionLocator = this.sectionFalling;
                    break;
                case 'General View':
                    sectionLocator = this.sectionGeneralView;       
                    break;
                case 'Health Block':
                    sectionLocator = this.sectionHealthBlock;       
                    break;
                case 'Slider':
                    sectionLocator = this.sectionSlider;       
                    break;
                case 'Warranty':
                    sectionLocator = this.sectionWarranty;       
                    break;
                case 'Form 1':
                    sectionLocator = this.sectionForm(1);       
                    break;
                case 'Form 2':
                    sectionLocator = this.sectionForm(2);       
                    break;
                default:
                    throw new Error(`Section ${section} is not defined on Main Page`);
            }
            await expect.soft(await sectionLocator.count(), 
                { message: `Section ${section} is visible on Main Page` }
            ).toBeGreaterThan(0);
        });
    }

    /**
     * Method which is validating video playback on Main Page
     * @param container Container where the video is located: 'Hero' or 'General View'
     * @param action Action to be performed on the video: 'play' or 'pause'
     */
    async validateVideoPlayback(container: 'Hero' | 'General View', action: 'play' | 'pause'): Promise<void> {
        await test.step(`${container} video ${action} on Main Page`, async () => {
            await this.page.waitForTimeout(2000); // wait for video to load
            const section = container === 'Hero' ? this.sectionHero : this.sectionGeneralView;
            const videoButton = section.locator('.blockVideo button.play');
            const isButtons = await videoButton.locator('i').count() > 0 ? true : false; 
            if(!isButtons) {
                await videoButton.click();
            }
            const isPlaying = await videoButton.locator('i').getAttribute('class');
            if (isPlaying?.includes('lavin-pause') && action === 'play') {
                await videoButton.click();
                await expect(videoButton.locator('i')).toHaveClass(/lavin-play/);
            }
            if (isPlaying?.includes('lavin-play') && action === 'pause') {
                await videoButton.click();
                await expect(videoButton.locator('i')).toHaveClass(/lavin-pause/);
            }
            await this.page.waitForTimeout(3000); // wait for video state to stabilize
        });
    }

    /**
     * Method which is validating slider items switching on Main Page
     * @param button Button to be clicked: 'next' or 'prev'
     */
    async validateSliderItemsSwitchingByButtons(button: 'next' | 'prev'): Promise<void> {
        await test.step('Check slider items switching on Main Page', async () => {
            switch (button) {
                case 'next':
                    await this.sliderNextButton.click();
                    break;
                case 'prev':
                    await this.sliderPrevButton.click();
                    break;
            }
            const newImage = await this.sliderImage.getAttribute('src');
            const expectedImage = await this.sliderBottomCurrentImage.getAttribute('src');
            await expect(newImage, { message: 'Slider image did not change as expected' }).toEqual(expectedImage);
        });
    }

    /**
     * Method which is validating slider items switching by bottom images on Main Page
     * @param index Bottom image index to be validated
     */
    async validateSliderItemsSwitchByBottomImages(index: number): Promise<void> {
        await test.step('Check slider items switching by bottom images on Main Page', async () => {
            await expect(index, { message: 'Bottom image index, it should be greater than or equal to 0' })
                .toBeGreaterThanOrEqual(0);
            await expect(index, { message: 'Bottom image index, it should be less than the number of visible images' })
                .toBeLessThan(await this.sliderBottomVisibleImages.count());
            const bottomImage = this.sliderBottomVisibleImages.nth(index);
            await bottomImage.scrollIntoViewIfNeeded();
            await this.page.waitForTimeout(3000);
            await bottomImage.click({ force: true });
            const newImage = await this.sliderImage.getAttribute('src');
            const expectedImage = await this.sliderBottomCurrentImage.getAttribute('src');
            await expect(newImage, { message: 'Slider image did not change as expected' }).toEqual(expectedImage);
        });
    }

    // SUBMIT FORM METHODS

    async submitStep(index: 1 | 2, step: 1 | 2 | 3 | 4 | 5 | "sorry"): Promise<void> {
        return test.step(`Submit form`, async () => {
            const form = this.stepContainer(index, step);
            await form.locator('button[type="submit"]').click();
        });
    }

    async validateStep(index: 1 | 2, expectedStep: number): Promise<void> {
        const form = this.stepContainer(index, 2);
        await expect.soft(await this.sectionForm(index).locator('[data-form-progress-current-step]'),
            { message: `Current form step is ${expectedStep}` }
        ).toHaveText(expectedStep.toString());
        await expect.soft(await form.locator('form').getAttribute("data-current-step")).toEqual(`.step-${expectedStep}`);
    }

    async completeFirstStep(formData: FormType): Promise<string> {
        return test.step(`[FORM SUBMIT][1st Step] Enter ZIP code: ${formData.zipCode}`, async () => {
            const { index, zipCode } = formData;
            const form = this.stepContainer(index, 1);

            await form.locator('input[name="zipCode"]').fill(zipCode ?? '');
            await this.submitStep(index, 1);
            const stepTwoVisible = await this.sectionForm(index).locator('div.step-2').getAttribute('style');
            if (('display: none').includes(stepTwoVisible!)) {
                return 'sorry';
            } else {
                return '2';
            }
        })
    }

    async completeSecondStep(formData: FormType): Promise<string> {
        return test.step(`[FORM SUBMIT][2nd Step] Provide interests: ${formData.email}`, async () => {
            const { index, interest } = formData;
            const form = this.stepContainer(index, 2);
            if (interest && interest.length > 0) {
                for (const interestItem of interest) {
                    await form.getByText(interestItem).click();
                }
            }
            await this.submitStep(index, 2);
            return '3';
        })
    }

    async selectPropertyType(formData: FormType): Promise<void> {
        return test.step(`Select property type`, async () => {
            const { index, propertyType } = formData;
            const form = this.stepContainer(index, 3);
            if (propertyType) {
                await form.getByText(propertyType).click();
            }
        });
    }

    async completeThirdStep(formData: FormType): Promise<string> {
        return test.step(`[FORM SUBMIT][3rd Step] Provide a Property Type: ${formData.propertyType}`, async () => {
            const { index } = formData;
            await this.selectPropertyType(formData);
            await this.submitStep(index, 3);
            return '4';
        })
    }

    async fillName(formData: FormType): Promise<void> {
        return test.step(`Fill name: ${formData.name}`, async () => {
            const { index, name } = formData;
            const form = this.stepContainer(index, 4);
            if (name) {
                await form.locator('input[name="name"]').fill(name);
            }
        });
    }

    async fillEmail(formData: FormType): Promise<void> {
        return test.step(`Fill email: ${formData.email}`, async () => {
            const { index, email } = formData;
            const form = this.stepContainer(index, 4);
            if (email) {
                await form.locator('input[name="email"]').fill(email);
            }
        });
    }

    async completeFourthStep(formData: FormType): Promise<string> {
        return test.step(`[FORM SUBMIT][4th Step] Provide Name: ${formData.name}, Email: ${formData.email}`, async () => {
            const { index } = formData;
            await this.fillName(formData);
            await this.fillEmail(formData);
            await this.submitStep(index, 4);
            return '5';
        });
    }

    async fillPhoneNumber(formData: FormType): Promise<void> {
        return test.step(`Fill phone number: ${formData.phone}`, async () => {
            const { index, phone } = formData;
            const form = this.stepContainer(index, 5);
            if (phone) {
                await form.locator('input[name="phone"]').fill(phone);
            }
        });
    }

    async completeFifthStep(formData: FormType): Promise<void> {
        return test.step(`[FORM SUBMIT][5th Step] Provide Phone number: ${formData.phone}`, async () => {
            const { index } = formData;
            await this.fillPhoneNumber(formData);
            await this.submitStep(index, 5);
        });
    }

    async fillTheForm(formData: FormType): Promise<void> {
        await test.step('Fill the form on Main Page', async () => {
            await this.completeFirstStep(formData);
            await this.validateStep(formData.index, 2);
            await this.completeSecondStep(formData);
            await this.validateStep(formData.index, 3);
            await this.completeThirdStep(formData);
            await this.validateStep(formData.index, 4);
            await this.completeFourthStep(formData);
            await this.validateStep(formData.index, 5);
            await this.completeFifthStep(formData);
        });
    }

    async validateErrorMessage(
        index: 1 | 2, 
        step: 1 | 2 | 3 | 4 | 5 | "sorry",
        expectMessage: string): Promise<void> {
        await test.step('Validate error message on Main Page', async () => {
            const form = this.stepContainer(index, step);
            await expect(await form.locator(".helpBlock div"), { message: 'Validation message is displayed as expected' }).toHaveText(expectMessage);
        });
    }
}