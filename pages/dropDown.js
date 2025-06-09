import { test, expect } from '@playwright/test';
import CommonActions from '../utils/CommonActions';

export default class dropDown {
    constructor(page) {
        this.actions = new CommonActions(page);
    }
    async navigate() {
        await this.actions.navigate('dropdowns')
    }
    async selectUsingText() {
        //Select option Apple using visual text
        await this.actions.selectOptionUsingText('fruits', 'Apple');

        const confirmText = await this.actions.getText('.subtitle');
        expect(confirmText).toContain('Apple');

    }
    async selectUsingValue() {
        //select option using value
        await this.actions.selectOptionUsingValue('fruits', '2')
    }
    //Select option using text using For loop
    async selectmangoOptionFromALL() {
        const allOptions = await this.actions.selectalloption('#fruits option');
        for (option of allOptions) {
            const text = await option.textContent()
            console.log(text)
            if (text.trim() == 'Pine Apple') {
                await this.actions.selectOptionUsingValue('fruits', '4')
                const confirmText = await this.actions.getText('.subtitle');
                expect(confirmText).toContain('You have selected Pine Apple');
            }

        }

    }

    async selectMultipleOtionsFromDropDown() {
        //To check if the dropdown can be able to select multiple options check in the HTML for Multiple tag

        await this.actions.selectMultipleOptions('#superheros', [
            { label: 'Aquaman' },
            { label: 'The Avengers' },
            { value: 'bt' },
            { value: 'bp' },
            { index: 15 }
        ])

    }
async selectLastOption() {
        const options = await this.actions.locator('#lang option');
        const count = await options.count();
        console.log(count)
        for (let i = 0; i < count; i++) {
            const option = await options.nth(i);
            const text = (await option.textContent()).trim();
            const LastValue = await option.getAttribute('value');
             console.log(text);

            if (i === count - 1) {
                await this.actions.selectLastoption('#lang', LastValue);
               const selectedOption= await this.actions.getSelectedValuetext('#lang');
               const selectedVisualLang=await this.actions.getSelectedVisualText('#lang')
               console.log(`selected Option Visual text: ${selectedVisualLang}, value: ${selectedOption}`);
               
            }
        }
    }
async validateSelectedText() {
        await this.actions.selectLastoption('#country', 'India');
       const text= await this.actions.getSelectedValuetext('#country');
       console.log(text);

    }
}



