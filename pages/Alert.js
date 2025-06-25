import {test, expect} from '@playwright/test'
import CommonActions from '../utils/CommonActions.js'
import { text } from 'stream/consumers';

export default class Alert{
    constructor(page){
        this.actions =new CommonActions(page);
    }


    async navigate(){
        await this.actions.navigate('alert');
    }

    async acceptAlertButton(){
        await this.actions.wait();
        await this.actions.click('#accept');
        await this.actions.acceptAlertDialog();
        await this.actions.click('#accept');
    }

    async dismissAlertButton(){
        
        await this.actions.click('#confirm');
        await this.actions.acceptAlertDialog();
       // await this.actions.dismissAlertDialog();
        await this.actions.click('#confirm');
    }
    async inputAlertDialog(){
        // await this.actions.click('#prompt');
        //await this.actions.wait();
        await this.actions.inputAlertDialog('Narmada');
        await this.actions.click('#prompt');
        const test= await this.actions.getText('#myName');
        expect(test).toContain('Narmada')
    }
    async sweetAlert(){
        await this.actions.click('#modern');
        await this.actions.waitForSelector('.modal-card  .title')
        const modern=await this.actions.innerText('.modal-card  .title');
        
        console.log(modern);
        expect(modern).toContain('Modern Alert');
        await this.actions.click('.modal-close is-large');
        console.log('Added all files');
    }


}