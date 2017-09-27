
/**
 * 
 */
class GameObjs {
    objArray:{[key:string]:GameBehavior}={
        
    };
    update(){
        for(var k in this.objArray){
            this.objArray[k].update();
        }
    }
    add(obj:GameBehavior){
        this.objArray[obj.name] = obj;
    }
    remove(key:string){
        delete this.objArray[key];
    }
    get(key:string){
        return this.objArray[key]
    }
    getSize(){
        
    }

}