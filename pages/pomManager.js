import InputElements from '../pages/InputElements.js'
import Button from '../pages/Button.js';
import Drag from '../pages/Drag.js';

export default class pomManager{
    constructor(page){
        this.page= page;
        this.inputElement=new InputElements(page);
        this.button=new Button(page)
        this.drag=new Drag(page);
    }
}