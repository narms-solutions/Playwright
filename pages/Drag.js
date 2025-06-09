import CommonActions from "../utils/CommonActions";

export default class Drag{
    constructor(page){
        this.actions=new CommonActions(page);
    }
   async navigate(){
    await this.actions.navigate('https://letcode.in/draggable')
   }
      
    async dragAndDrop(){
        await this.actions.dragAndDrop('#sample-box','.example-boundary');
    }
    async navigateDroppable(){
        await this.actions.navigate('https://letcode.in/droppable')
    }
    async dragAndDropintoFrame(){
      await this.actions.wait();
      await this.actions.dragAndDrop('#draggable','#droppable')
    }
}