import {test, expect, chromium} from '@playwright/test';




test('this is a login test @smoke',async({page})=>{


    const userAgent = await page.evaluate(() => navigator.userAgent);
    const screenWidth = await page.evaluate(() => window.screen.width);  
    const screenHeight = await page.evaluate(() => window.screen.height); 
 
    console.log(`User Agent: ${userAgent}`); 
    console.log(`Screen Width: ${screenWidth}`); 
    console.log(`Screen Height: ${screenHeight}`); 

    await page.goto('https://the-internet.herokuapp.com/login');
    //await page.locator('#username').click();
    //await page.pause();
    await page.locator('#username').fill('tomsmith');
    await page.locator('input[id=password]').fill('SuperSecretPassword!');
    await page.getByRole('button',{name:/login/i}).click();
    await page.pause();




    // //await page.locator('button[type=submit]').click();
    // await expect(page.locator('#flash-messages')).toContainText(/You logged into a secure area!/); // here using regex instead of ''(single cotes)
    // await expect(page.locator('h4.subheader')).toContainText('Welcome to the Secure Area. When you are done click logout below.'); //h4.class name
    // //await page.pause();
    // await page.getByRole('link',{name:'Logout'}).click(); //syntax for getByRole - ('attribbute/role,{name:''})
    // await page.locator('input[name=username]').fill('11'); //i wrote the locator as xpath for same username field
    // await expect(page.getByLabel('username')).toHaveValue('11') // Wrotet the locator getByLabel - for the sme username field. we can use as many types as we can 
    // //await page.pause();


});

// (async()=>{
//     const browser=await chromium.launch(
//         {headless:false}
//     );

//     const page=await browser.newPage();

//     await page.goto("https://the-internet.herokuapp.com/login");
//     await page.locator('#username').fill('tomsmith');
//     await page.locator('input[id=password]').fill('SuperSecretPassword!');
//     await page.locator('button[type=submit]').click();
//     await page.pause();
// })();
