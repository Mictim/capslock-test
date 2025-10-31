import { test as base } from "@playwright/test";
import { Application } from "../pages/application";

export const test = base.extend<{
    app: Application;
}>({
    page: async ({ context, baseURL }, use) => {
        const page = await context.newPage();
        await page.goto(baseURL!);
        await use(page);
    },
    app: async ({ page }, use) => {
        const application = new Application(page);
        await use(application);
    },
});

export { expect } from "@playwright/test";