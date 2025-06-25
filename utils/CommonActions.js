import { error } from "console";
import { runInThisContext } from "vm";

export default class CommonActions{

    constructor(page){
        this.page=page;
     }

     async navigate(url){
        await this.page.goto(`https://letcode.in/${url}`)
     }
     async wait(){
      await this.page.pause();
     }
     async click(selector){
        await this.page.click(selector);
     }
     async type(selector, text){
        await this.page.type(selector, text)
     }
     async fill(selector, text){
        await this.page.fill(selector, text)
     }
     async getText(selector){
        return await this.page.textContent(selector);
     }
     async isDisabled(selector){
        return this.page.isDisabled(selector)
     }
     async keyboardAction(){
        await this.page.keyboard.press('End');
     }
     async locator(selector){
        await this.page.locator(selector);
     }
     async focus(selector){
        await this.page.locator(selector).focus();
     }
     async getAttribute(selector, value){
        await this.page.locator(selector).getAttribute(value)
     }
     async getInputValue(selector) {
        return await this.page.locator(selector).inputValue();
     }
     async goBack(){
        await this.page.goBack();
     }

     async getBoundingBox(selector){
        const locator=await this.page.locator(selector);
        await locator.waitFor({state:'visible'});
        return await locator.boundingBox();
        
     }
     async getBackgroundCoulor(selector, propertyName){
        const bgButton=await this.page.locator(selector);
        return await bgButton.evaluate((el,prop)=>{
           return window.getComputedStyle(el)[prop];
        },propertyName)
     }
   
     async longPress(selector){
      await this.page.click(selector, {delay:2000})
     }

     async dragAndDrop(src,trg){
      const source=await this.getBoundingBox(src)
      const target =await this.getBoundingBox(trg)
      if(source && target){
        
        await this.page.mouse.move(source.x+source.width/2, source.y+source.height/2)
        await this.page.mouse.down();
        await this.page.mouse.move(target.x+target.width/2, target.y+target.height/2,{ steps: 10 })
        await this.page.mouse.up();
      }
      else{
         throw new Error('Could not locate drag or drop element')
      }
    }
    async selectOptionUsingText(id, text){

     await this.page.selectOption(`#${id}` , {label:text})
    }
    async selectOptionUsingValue(id,value){
      await this.page.selectOption(`#${id}`, {value:value})
    }
    async selectMultipleOptions(selector, optionsArray){
      await this.page.selectOption(selector, optionsArray)
    }

    async selectLastoption(selector,value){
      await this.page.selectOption(selector, value)

    }
   async selectalloption(selector){
   await this.page.$$(selector);
   }

   async getSelectedValuetext(selector){
      return await this.page.$eval(selector,e=>e.value )
   }
   async getSelectedVisualText(selector){
      return await this.page.$eval(`${selector} option:checked`,
    option => option.textContent.trim())
   }
   async acceptAlertDialog() {
      await this.page.once('dialog',async dialog=>{
         console.log('Alert Message:',dialog.message());
         await dialog.accept();
      })
      
   }
   async dismissAlertDialog(){
      await this.page.once('dialog', async dialog=>{
         console.log('Dismiss Alert dialog:',dialog.message());
         await dialog.dismiss();
      })
   }
   async inputAlertDialog(text){
      await this.page.on('dialog', async (dialog)=>{
         console.log('Input alert dialog:', dialog.message());
         console.log('Dialog type:',dialog.type());
         console.log('Dialog default value', dialog.defaultValue());
         await dialog.accept(text);
      })
   }
  async innerText(selector){
   return await this.page.innerText(selector);
  }

  async waitForSelector(selector){
   await this.page.waitForSelector(selector, {sate:'visible'});
  }

}