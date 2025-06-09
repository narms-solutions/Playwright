import{test,expect} from '@playwright/test';
import pomManager from '../pages/pomManager.js';
let pm;

test.describe('POM expample test',()=>{
    test.beforeEach('Naviagete to the page', async({page})=>{
     pm =new pomManager(page);
    })
    test.afterEach('Close the browser',async({page})=>{
        await page.close();
    })
    test('Different types of edit test', async()=>{
        await pm.inputElement.navigate();
        await pm.inputElement.enterFullName('Narmada Nalubolu');
        await pm.inputElement.verifyAppendText();
        await pm.inputElement.getexsistingText();
        await pm.inputElement.clearText();
        await pm.inputElement.verifyDisabled();
        await pm.inputElement.verifyReadonly();
       })
    test('button Hndling', async()=>{
        await pm.button.navigate();
        await pm.button.gotoHomeAndReturn();
        await pm.button.verifyButtonLocation();
        await pm.button.verifyButtonColor();
        await pm.button.verifySize();
        await pm.button.verifyButtonDisabled();
        await pm.button.assertLongPressedText('Button has been long pressed');
    })
    test('Drag and Drop test',async()=>{
        await pm.drag.navigate();
        await pm.drag.dragAndDrop();
        await pm.drag.navigateDroppable();
        await pm.drag.dragAndDropintoFrame();
    })
    test('Drop down test', async()=>{
        await pm.dropdown.navigate();
        await pm.dropdown.selectUsingText();
        await pm.dropdown.selectUsingValue();
        await pm.dropdown.selectmangoOptionFromALL();
        await pm.dropdown.selectMultipleOtionsFromDropDown();
        await pm.dropdown.selectLastOption();
        await pm.dropdown.validateSelectedText();

    })
})