import{test,expect} from '@playwright/test'
import pomManager from '../pages/pomManager.js'

let pm;

test.describe('POM expample test',()=>{
    test.beforeEach('Naviagete to the page', async({page})=>{
     pm =new pomManager(page);
    })
    test('Different types of edit test', async()=>{
        // await pm.inputelements.navigate();
        // await pm.inputelements.editElements('Narmada Nalubolu');
        await pm.button.navigate();
        await pm.button.buttonHandling();
    })
})