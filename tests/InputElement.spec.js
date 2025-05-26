import { test, expect, chromium } from '@playwright/test';

let browser;
let context;
let page;

test.describe('Learning all the elements in Playwright', () => {
  test.beforeAll('Launch the chrome browser', async () => {
    browser = await chromium.launch({ headless: false });
    console.log('BEFORE ALL HOOK LAUNCHED THE CHROMIUM BROWSER');
  });

  test.beforeEach('Opens a new context and new page', async () => {
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto('https://letcode.in/test');
    console.log('BEFORE EACH HOOK OPENS A NEW PAGE IN THE CHROMIUM BROWSER');
  });

  test.afterEach('Close the page and context', async () => {
    await page.close();
    await context.close();
    console.log('AFTER EACH HOOK CLOSED THE CURRENT PAGE AND CONTEXT');
  });

  test.afterAll('Close the browser', async () => {
    await browser.close();
    console.log('AFTER ALL HOOK CLOSED THE CHROMIUM BROWSER');
  });

  test('Input element handling', async () => {
    await page.getByRole('link', { name: 'Edit' }).click();

    // Enter text in the input field
    await page.type('#fullName', 'Narmada Nalubolu');

    // Append text at the end
    const appendText = await page.$('#join');
    await appendText.focus();
    await page.keyboard.press('End');
    await appendText.type(' Narmada');

    // Get existing text
    const getMeText = await page.getAttribute('#getMe', 'value');
    console.log(`The text from the getMe field: ${getMeText}`);

    // Clear text
    await page.fill('#clearMe', '');

    // Check if disabled
    const isDisabled = await page.isDisabled('#noEdit');
    expect(isDisabled).toBe(true);

    // Check if readonly
    const isReadOnly = (await page.getAttribute('#dontwrite', 'readonly')) !== null;
    console.log(`This input field is readonly: ${isReadOnly}`);
    expect(isReadOnly).toBe(true);
  });
});