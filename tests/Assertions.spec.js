import{test, expect} from '@playwright/test'
import { describe } from 'node:test'

test.describe('learning Assertions', ()=>{
    test('validating URL and  Title test',async ({page})=>{

        await page.goto('https://the-internet.herokuapp.com/');

        await expect(page).toHaveURL('https://the-internet.herokuapp.com/');

        await expect(page).toHaveTitle('The Internet');
        //await page.pause();

    })

    test('validating text',async({page})=>{
        await page.goto('https://the-internet.herokuapp.com/');
        await expect(page.locator('h1')).toContainText(['Welcome to the']);
        await expect(page.locator('h2')).toHaveText('Available Examples');
        await expect(page.locator('body')).toContainText('Shadow');
       // await page.pause()
    })

    test('Visibility test @regression', async({page})=>{
        await page.goto("https://the-internet.herokuapp.com/");
        await expect(page.locator('h1')).toBeVisible();

    })

    test('count of all a tags in aweb page',async({page})=>{
        await page.goto('https://the-internet.herokuapp.com/');
        await expect(page.locator('a')).toHaveCount(46);
        //await page.pause();
    })

    test('checkboxes',async({page})=>{
        await page.goto('https://the-internet.herokuapp.com/checkboxes');
        //await page.pause();
        // await page.waitForTimeout(10000)  //wait for certain amount of time untill it interact with the element
        // await page.waitForLoadState('networkidle'); //this will wait for the page finishing all the network tab activities before it interacts with the elements 

       // const firstChecck=await page.getByRole('checkbox').nth(0).check();
        //const secondCheck=await page.getByRole('checkbox').nth(1).uncheck();
        await page.getByRole('checkbox').nth(0).check();
        await page.getByRole('checkbox').nth(1).uncheck();
        // await expect(firstChecck).not.toBeChecked();  we cannot use this way 'astoBeChecked' can be only used with Locator object
        await expect(page.getByRole('checkbox').nth(0)).toBeChecked(); 
        await expect(page.getByRole('checkbox').nth(1)).not.toBeChecked();
        //await page.pause();
    })

    test('toHaveValue assertion',async({page})=>{
        await page.goto('https://the-internet.herokuapp.com/login');
        //await page.pause();
        await page.locator('#username').fill('tomsmith')
        await expect(page.locator('#username')).toHaveValue('tomsmith')
    })
})