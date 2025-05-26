import {test,expect} from '@playwright/test'
import { chromium } from 'playwright';

let browser;
let context;
let page;

test.describe('Second most common used element - Button Handling  test',async()=>{
    test.beforeAll('Launch a chromium browser', async()=>{
        browser=await chromium.launch({headless:true});
        console.log(`Before All hook launched chromium browser`);
    })
    test.beforeEach('Open a new context and page', async()=>{
        context=await browser.newContext();
        page=await context.newPage();
        await  page.goto('https://letcode.in/test');
       // await page.pause();
        console.log('BEFORE EACH HOOK OENS A NEW PAGE IN THE CROMIUM BROWSER')

    })
    test.afterEach('Close the page and context', async()=>{
        await page.close();
        await  context.close();
        await console.log('AFTER EACH HOOK CLOSED THE CURRENT PAGE AND CONTEXT')
    })
    test.afterAll('Close the browser' ,async()=>{
        await browser.close();
        console.log('AFTER ALL HOOK CLOSED THE CHROMIUM BROWSER')
    })

    test('Click on Button and go back to previous page test', async()=>{
       await page.getByRole('link',{name: 'Click'}).click();
       await page.click('#home');
       await page.pause();
       //await page.waitForLoadState('networkidle');
       await page.goBack();
       await page.waitForLoadState('networkidle');
       await expect(page).toHaveURL('https://letcode.in/button')

    })
    test('Get the X & Y co-ordinates by clicking on the button', async()=>{
       await page.getByRole('link',{name: 'Click'}).click();
       const button= await page.locator('#position');
       await expect(button).toBeVisible();
       const box=await button.boundingBox();
       if(box){
        console.log(`🟢Button coordinates x: ${box.x}, y:${box.y}`);
       }
       else{
         console.log('🔴 Button not visible or not found.');
       }

    })
    test('To the color of the button test',async()=>{
        await page.getByRole('link',{name: 'Click'}).click();
        const färg=await page.locator('#color');
        //Button background color
        const backgroundColor=await färg.evaluate((el)=>{
            return window.getComputedStyle(el).backgroundColor;
        })
        await expect(backgroundColor).toBe('rgb(42, 157, 144)')
        console.log(`🟢 Background color of the button is:${backgroundColor}`)

        //button text color
        const textColor=await färg.evaluate((el)=>{
            return window.getComputedStyle(el).color;
           })
            console.log(`Text color is :${textColor}`);
            await expect(textColor).toBe('rgb(0, 0, 0)');

    })
    test('Get the height and width of a button test',async()=>{
        await page.getByRole('link',{name: 'Click'}).click();
        const dimensionsButton=await page.locator('#property');
        const buttonBox=await dimensionsButton.boundingBox();
        console.log(`The height : ${buttonBox.height}, width:${buttonBox.width}`);
    })
    test('Check if the button is disabed test',async()=>{
         await page.getByRole('link',{name: 'Click'}).click();
         const isDisable=await page.isDisabled('#isDisabled');
         expect(isDisable).toBe(true);
    })
    test('Press and Hold the button and validate the text after long press test', async()=>{
         await page.getByRole('link',{name: 'Click'}).click();
         //Press and hold the button for 2 seconds
        await page.click('h2', { delay: 2000 }); 
        //get the text again after long pressing the button
        const afterLongPressButton=await page.locator('h2');
        await expect(afterLongPressButton).toHaveText('Button has been long pressed');
    })

} )