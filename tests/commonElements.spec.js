import {test, expect} from '@playwright/test'

test('Drop down test',async ({page})=>{

   await page.goto('https://the-internet.herokuapp.com/');
   //await page.pause();
   await page.getByRole('link', {name:/Dropdown/i}).click();

//    const isDisabled = await page.getAttribute('#dropdown', 'disabled');
//    console.log(`isDisabled : ${isDisabled}`);

//Check wheater the first child option is disabled
const isFirstChildOptionDisabled=await page.getAttribute('option:has-text("Please select an option")', 'disabled');
console.log(`isDisabled : ${isFirstChildOptionDisabled}`);

//Check if the dropdown is disabled or enabled
const dropDownOption =await page.locator('#dropdown').isDisabled();
expect(dropDownOption).toBe('');
console.log(`Drop down option is : ${dropDownOption}`);

//


   //await page.pause();
  //for standard HTML tags like <select>, we can directly use selectOption() method
  //Syntax by ID  page.selectOption('#dropdown', 'Option value')
  //Syntax by label page.selectOption('#dROPDOWN ', {label:'Option Text' })
  //Syntax by index page.selectorOptions('#Dropdown', {index:2});
  //Syntax to select multiple options ('#Dropdown',['value1', 'value 2'])

  //****Non-custom or non standard drop down --- these dropdowns are built using <div>, <li>, or <span> elements and require clicking.*/
/* Syntax is first click the drop down to open and then select option 
// Step 1: Click to open dropdown
await page.click('.custom-dropdown-toggle');

// Step 2: Click the option
await page.click('text=Option Label');  */ 

// await page.selectOption('#dropdown', '1');
const count= await page.$$eval('#dropdown option', options=>options.length);
 console.log(`No of options in the drop doen list : ${count}`);
await page.selectOption('#dropdown', {index:2});  //here it selects second option
 //await page.selectOption('#dropdown', {lable:'Option 1'});
 //await page.selectOption('#dropdown', ['1','2'])
 //await page.pause();
 // page.$eval(selector, pageFunction) - This is a Playwright method used to evaluate JavaScript in the context of the browser (i.e., inside the page).
 const selectedOption= await page.$eval('#dropdown', el=>el.value); //el is an arrow function and reference to the <select> element that matched #dropdown. and  el.value returns  "current selected value" of the dropdown.
 expect(selectedOption).toBe('2');





}) 