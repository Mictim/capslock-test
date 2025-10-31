import test, { expect, Page } from "@playwright/test";
import { AppPage } from "./page-holder";

export class ThankYouPage extends AppPage {
    public pagePath = '/thankyou';

    async expectLoaded(message?: string): Promise<void> {
        await test.step('Expect Thank You Page to be loaded', async () => {
            await expect(this.page, { message : message ?? 'Thank You Page is not loaded' }).toHaveURL(this.pagePath);
        });
    }
}