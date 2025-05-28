import CommonActions from "../utils/CommonActions";

export default class Drag{
    constructor(page){
        this.actions=new CommonActions(page);
    }
   async navigate(){
    await this.actions.navigate('https://letcode.in/draggable')
   }
    async dragAndDrop(){
        await this.actions.dragAndDrop();
    }
}