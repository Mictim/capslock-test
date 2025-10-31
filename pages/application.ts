import { Page } from "@playwright/test";
import { MainPage } from "./main.page";
import { ThankYouPage } from "./thank-you.page";


export class Application {
    readonly main: MainPage;
    readonly thankYou: ThankYouPage;
    constructor(private page: Page) {
        this.main = new MainPage(page);
        this.thankYou = new ThankYouPage(page);
    }


}