import{test, expect} from '@playwright/test'

test('Counter by using the locators', async ({page})=>{
    await page.goto("http://127.0.0.1:5500/ButtonCounter.html");

    //1 locate using ID
    await page.locator('#clickbutton').click();

    //2 locate using class 
    await page.locator(".button-style").click();
    
    //3 tag and classname combination
    await page.locator("button.button-style").click();

    //4 by attribute value
    await page.locator('[data-action="increament"]').click();
    //await page.locator('[id="clickbutton"]').click();

    //5 by text
    await page.locator('text="CLICK ME"').click();

    //6 combining class and text

    await page.locator('.button-style:text("CLICK ME")').click();

    //7 partial attribute
    await page.locator('[role="button"]').click();

    //8 attribute and partial text
    await page.locator('button:has-text("CLICK ME")').click();


    //playwright locators t.ex getbyRole, getByLabel, getByText,getBytestID

    //9 getByText
    await page.getByText('CLICK ME').click();

    //10 getByRole
    await page.getByRole('button', {name:/click me/i}).click();

    //11 attribute and text combination
    await page.locator('[data-action="increament"]:text("CLICK ME")').click();

    // Counter number Assertion 
    await expect(page.locator('#counter')).toContainText('11')

    await page.pause();
})