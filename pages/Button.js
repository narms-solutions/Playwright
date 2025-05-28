import { expect } from "@playwright/test";
import CommonActions from "../utils/CommonActions.js";

export default class Button {
    constructor(page) {
        this.actions = new CommonActions(page);
    }

    async navigate() {
        await this.actions.navigate('https://letcode.in/button')
    }
    async gotoHomeAndReturn() {
        //Goto Home and come back here using driver commanda
        await this.actions.click('#home');
        await this.actions.goBack();
        await expect(this.actions.page).toHaveURL('https://letcode.in/button');
        //Get the location by clicking the button
    }
    async verifyButtonLocation() {

        const locationBox = await this.actions.getBoundingBox('#position')
        if (locationBox) {
            console.log(`🟢 Button coordinates x: ${locationBox.x}, y: ${locationBox.y}`);
        } else {
            console.log('🔴 Button not visible or not found.');
        }
    }
    //get the button Background color and text color
    async verifyButtonColor() {
        const buttonBGColor = await this.actions.getBackgroundCoulor('#color', 'backgroundColor');
        expect(buttonBGColor).toBe('rgb(42, 157, 144)')
        const textColor = await this.actions.getBackgroundCoulor('#color', 'color')
        expect(textColor).toBe('rgb(0, 0, 0)')

    }
    //Get the height and width of the box

    async verifySize() {
        const propBox = await this.actions.getBoundingBox('#property')
        console.log(`Width of the box is :${propBox.height}, width: ${propBox.width} `)
    }
    async verifyButtonDisabled() {
        //Check if the button is disabled
        const isDisabled = await this.actions.isDisabled('#isDisabled');
        expect(isDisabled).toBe(true)

    }

    async verifyLongPress() {
        await this.actions.longPress('h2');
        return await this.actions.getText('h2');
    
      
    }
    async assertLongPressedText(LongMessage){
     const longPressText=await this.verifyLongPress();
     expect(longPressText.trim()).toBe(LongMessage)
    }
}
