import InputElements from '../pages/InputElements.js'
import Button from '../pages/Button.js';
import Drag from '../pages/Drag.js';
import DropDown from '../pages/dropDown.js';
import Alert from '../pages/Alert.js'

export default class pomManager{
    constructor(page){
        this.page= page;
        this.inputElement=new InputElements(page);
        this.button=new Button(page)
        this.drag=new Drag(page);
        this.dropdown=new DropDown(page);
        this.alert=new Alert(page);
    }
}