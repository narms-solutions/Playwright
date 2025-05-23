import {test, expect} from '@playwright/test'
import { Console } from 'console';
import { chromium } from 'playwright';

let browser;
let context;
let page;

test.only('Annotiations test', async()=>{
    browser=await chromium.launch({headless:false})

    context=await browser.newContext();
    page=await context.newPage();

    await page.goto('https://www.packngo.in/');
    console.log('Navigated to the given url');

   const isDisabled= await page.getAttribute('li.holiday.current>a', 'disabled');
   console.log(`Dropdown is : ${isDisabled}`);
    //await page.click('li.holiday.current>a');
    await  page.locator('li.holiday.current>a').click();
    //await page.click('a[href="domestic-holidays"]');
    await page.click('a[href="international-holidays"]');
    //await page.getByRole('link', {name:'international-holidays'}).click();
    //await page.locator('a[href="international-holidays"]').click(); 
    //await page.waitForTimeout(5000)
   
//     await page.getByRole('link', {name:'Login'}).click();
//     await page.pause();
//     //await page.getByRole('textbox',{name:'Enter email'}).fill('pgGru');
//     // await page.pause();
//     await page.getByPlaceholder('name@example.com').fill('playwright@microsoft.com');
//     await page.getByPlaceholder('Enter email').fill('pgGru');
//     await page.getByRole('textbox',{name:'Enter password'}).fill('freeZeray');
//     await page.getByRole('button',{name:'Login'}).click();
//     await page.pause();

})