import { expect } from "@playwright/test";
import CommonActions from "../utils/CommonActions.js"; 
export default class InputElements{
    constructor(page){
        
        this.actions=new CommonActions(page);
    }
    async navigate(){
        await this.actions.navigate('https://letcode.in/edit');
    }

    async editElements(username){
        await this.actions.type('#fullName', username); //types the username in the input field 
        //Append the text at the end of the exsisting text
        await this.actions.focus('#join')
        await this.actions.keyboardAction();
        await this.actions.type('#join', ' Narmada')  
        //get exsisting text 
        const valueFromText=await this.actions.getInputValue('#getMe');
        console.log(`The value is:${valueFromText}`);  

        //Clear the text
        await this.actions.fill('#clearMe','')
        //check if the button is disabled
        const isDisabled= await this.actions.isDisabled('#noEdit');
        expect(isDisabled).toBe(true);
        //check if the input text feld is readonly
        const readOnlyField=await this.actions.getAttribute('#dontwrite', 'readonly')!==null
        expect(readOnlyField).toBe(true);
    }
}