import { expect } from "@playwright/test";
import CommonActions from "../utils/CommonActions.js";
export default class InputElements {
    constructor(page) {

        this.actions = new CommonActions(page);
    }
    async navigate() {
        await this.actions.navigate('edit');
    }

    async enterFullName(username) {
        await this.actions.type('#fullName', username);
    }
    async verifyAppendText() {
        await this.actions.focus('#join')
        await this.actions.keyboardAction();
        await this.actions.type('#join', ' Narmada')

    }
    async getexsistingText() {
        const valueFromText = await this.actions.getInputValue('#getMe');
        console.log(`The value is:${valueFromText}`);

    }
    async clearText() {
        await this.actions.fill('#clearMe', '')

    }


    async verifyDisabled() {
        const isDisabled = await this.actions.isDisabled('#noEdit');
        expect(isDisabled).toBe(true);

    }
    async verifyReadonly() {
        const readOnlyField = await this.actions.getAttribute('#dontwrite', 'readonly') !== null
        expect(readOnlyField).toBe(true);

    }
}