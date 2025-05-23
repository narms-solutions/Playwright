import{test, expect} from '@playwright/test'
import { chromium } from 'playwright';


let browser;
let context;
let page;

test.describe('This test run with all the Hooks not by the fixtures', async()=>{
    test.beforeAll(async()=>{
        //launch a browser
        browser=await chromium.launch({headless:false});
        console.log('CHROMIUM BROWSER IS LAUNCHED BY BEFORE ALL HOOK')
     })

     test.beforeEach(async()=>{
        //open a new context and new page
        context=await browser.newContext();
        page=await context.newPage();
        console.log('BEFORE EACH HOOK OPENED THE NEW CONTEXT AND NEW PAGE')
        await page.goto('https://the-internet.herokuapp.com/');
     })
     test.afterEach(async()=>{
        //Close the newly opened page and context
            await page.close();
            await context.close();
            console.log('AFTER EACH HOOK CLOSED THE PAGE AND CONTEXT')
     })
     test.afterAll(async()=>{
        //close the browser
        await browser.close();
        console.log('AFTER ALL CLOSED HOOK CLOSED THE BROWSER')
     })
     test('Add or remove element test and validation', async()=>{
        await page.click('text="Add/Remove Elements"');
        //await page.pause();
        
        await expect(page.locator('h3')).toHaveText('Add/Remove Elements');
       
        // const header=await page.textContent('h3');
        // expect(header).toBe('Add/Remove Elements');
        for(let i=0;i<3;i++){
            await page.click('button');
        }
        await page.pause();
        const manuallyAddedButtons=await page.$$('button.added-manually');
        for(const button of manuallyAddedButtons){
            await button.click();
        }
       
        
        // await page.getByRole('button',{name:'Delete'}).click();
        // await page.pause();
     })
     test('checkboxex validation', async()=>{
        await page.click('text="Checkboxes"');
        const checkboxValidation=  page.getByRole('checkbox').nth(0); //Here await is not needed since this returns a locator not a promise
        
        await expect(checkboxValidation).not.toBeChecked();
        await page.pause();
     })
     test('Dropdown test',async()=>{
      await page.click("text='Dropdown'");

      //Cheks with the <selected> HTML tag  - i.e complete dropdown is disabled
      const dropdownOption= await page.locator('#dropdown').isDisabled();
      console.log(`Drop down is : ${dropdownOption}`);
      expect(dropdownOption).toBe(false);

      //Checks if the first option is disabled
      const firstChildisDisabled= await page.getAttribute('option:has-text("Please select an option")', 'disabled')
      console.log(`First option in th edropdown is:${firstChildisDisabled}`);

      //Get the count of the options under the drop down
      const countOfOptions= await page.$$eval('#dropdown option', options=>options.length);
      console.log(`No of options in the drop down:${countOfOptions}`);

     
      //Select option 2 using index
      await page.selectOption('#dropdown', {index:2})

      //Validate the selected option
      const firstOptionSelected= await page.$eval('#dropdown', el=>el.value);
       expect(firstOptionSelected).toBe('2');

     })

     test.only('Checkboxes validation and check/uncheck actions', async()=>{
      //await page.click('text="Checkboxes"');
     // await page.pause();
      await page.locator('text="Checkboxes"').click();
      //await page.locator('input[type=checkbox]').nth(0).check(); //first find the element using the locator ans then check the first element
      //Another way to check first element int he checkbox list
      // const checkBoxList= await page.$$('input[type=checkbox]');
      // //await page.pause();
      // await checkBoxList[0].check();
      // await checkBoxList[1].uncheck();
      
      //Another way
      const checkboxList=page.locator('input[type=checkbox]')
      await checkboxList.nth(0).check();
      await checkboxList.nth(1).uncheck();
      await expect(checkboxList.nth(0)).toBeChecked();
      await expect(checkboxList.nth(1)).not.toBeChecked();

      const noOfCheckboxes=await page.locator('input[type=checkbox]');
      const count=await noOfCheckboxes.count();
      console.log(`No of check boxes on this page: ${count}`);
     
     })
     
})