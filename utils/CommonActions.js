export default class CommonActions{

    constructor(page){
        this.page=page;
     }

     async navigate(url){
        await this.page.goto(url)
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
        return await this.page.getContent(selector);
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

   async getContent(selector) {
    const locator = this.page.locator(selector);
    return await locator.textContent();
}
}