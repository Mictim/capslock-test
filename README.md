### CAPSLOCK QA Task
Here you will find instructions how to set up and run Playwright tests for the CAPSLOCK TEST application.


### Setup Instructions
0. **Clone the Repository**
   First, clone the repository to your local machine:
   ```bash
   git clone <repository-url>
   ```

1. **Install Dependencies**
   Make sure you have Node.js installed. Then, install the necessary dependencies by running:
   ```bash
   npm install
   ```

2. **Configure Playwright**
   If you need, please update the `playwright.config.ts` file to match your testing requirements. You can configure different browsers, devices, and other settings.
   Default consfiguration includes:
   - Browsers: Desktop Chromium (HD and FullHD), Desktop Edge, Mobile Chrome (Galaxy S24), Mobile Safari (iPhone 15 Pro), Desktop Chrome (channel chrome)
   - Viewports: 1280x720, 1920x1080 for Desktop Chrome
   - Test directory: `tests`
   - Traces, Screenshots and videos recording on failure for CI/CD execution and always "on" for local runs.
   - Reporting - is the standard Playwright HTML Report.

3. **Run Tests**
   To run the whole test suite, use the following command:
   ```bash
   npx playwright test
   ```

   To run tests in a specific file, use:
   ```bash
   npx playwright test path/to/your/testfile.spec.ts
   ```

   To run the specific project (browser/device), use:
   ```bash
   npx playwright test --project='Project Name'
   ```

   To run tests by tag, use:
   ```bash
   npx playwright test --grep @tagname
   ```
   or to exclude tests by tag:
   ```bash
   npx playwright test --grep-invert @tagname
   ```

4. **View Test Reports**
    After running the tests, you can generate and view the HTML report by executing:
    ```bash
   npx playwright show-report
   ```
   or using package.json script:
   ```bash
   npm run report:pw
   ```

### Scenarios Covered
The test suite covers the following scenarios:
- page is loaded with proper title
- Presence of the specific sections on the page
- Play/Pause functionality of the CAPSLOCK videos
- Responsiveness of the application on different devices and viewports
- Accessibility checks for key elements
- Form submission and validation for the contact form
- Location check

### Suggested improvements
- Make elements on the page with stable locators (e.g., data-testids or ARIA labels), which can be find easily and will not be changed often.
- Add more tests for edge cases and error states to ensure comprehensive coverage.
- Check performance metrics using Playwright's built-in capabilities or integrate with tools like Lighthouse.
- reporting, like Monocart-report which uses more metrics and provides better insights.
- integration with some test management system, like JIRA X-Ray.