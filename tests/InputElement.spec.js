import {test, expect} from '@playwright/test'
import{chromium} from 'playwright'
import { Console } from 'console';
import { read } from 'fs';
import { endianness } from 'os';



let browser;
let context;
let page;
test.describe('Learning all the elements in Playwright',()=>{
test.beforeAll('Launch the chrome browser',async()=>{
    browser=await chromium.launch({headless:false})
    console.log("bEFORE ALL HOOK LUANCHED THE CHROMIUM BROWSER");

})
test.beforeEach('Opens a new context and new page',async()=>{
    context=await browser.newContext();
    page=await context.newPage();
   await  page.goto('https://letcode.in/test');
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

test('Input element handling', async()=>{
    
    await page.getByRole('link',{name:'Edit'}).click();
    //await page.click('text="Edit"');
    //await page.pause();

    //Enter text in the input field
    await page.type('#fullName', 'Narmada Nalubolu');//Types the text without erasing the exsisting text
   // await page.fill('#fullName', 'Narmada Nalubolu'); //Clears the already exsisting text and fill the given text7
    
    //Append a text to the end of the exsisting text
    const appendText= await page.$('#join');
    await appendText.focus(); //Keeps the focu on the element
    await page.keyboard.press("End"); //In order to append the text at he end of the text , we need to press the END button from the keyboard
    await appendText.type(' Narmada'); //Here type method types the text at the end of the exsisting text
 
    //get the exsisting text
    const getMeText=await page.getAttribute('#getMe','value');
    console.log(`The text form the getme field:${getMeText}`);
    await page.pause();

    //clear the text from the input foeld
    await page.fill('#clearMe','');

    //Check the input field is disabled
    const isDisable=await page.isDisabled('#noEdit');
    expect(isDisable).toBe(true);

    //Check if the inout field is readonly
    const readOnlyTextFiled= await page.getAttribute('#dontwrite', 'readonly')!==null;
    console.log(`This input fiels is readonly: ${readOnlyTextFiled}`);
    expect(readOnlyTextFiled).toBe(true);
   
})
test.only('Button handlings',async()=>{
    await page.click("text='Click'");
    //Click the button and redirect back to the same page
    await page.click('text="Goto Home"') //Clicks he button
    await page.waitForLoadState('networkidle'); //Wait for the page to load
    await page.goBack(); //Goes back to the previous page
    await page.waitForLoadState('networkidle'); //Wait for the page to load
    await  expect(page).toHaveURL("https://letcode.in/button");//Asserting the url 

    //
})

})