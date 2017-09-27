declare var THREE: any;

class World{
    worldName:String;
    screenWidth:number;
    screenHeight:number;
    mainCamera:any;
    scence:any;
    canvas:any;
    isUping:boolean = true;
    objs:GameObjs;
    init(){

    }
    render(){

    }
    update(){
        if(this.isUping){
            //更新所有对象
            for(var obj in this.objs){
                try{
                    this.objs.update();
                }catch(e){
                console.log(e);
                }
            }
            //渲染
            this.render();
              
            window.requestAnimationFrame(this.update);
            // setTimeout(world.updata,35);
        }
    }
}
class GameObjs{
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
class GameBehavior{
    constructor(name:string){
        this.name = name;
    }
    name:string;
    threeObj:any;
    start(){

    }
    update(){
        console.log(this.name+" updating")
    }
}

class UsersMap extends GameBehavior{
    
}

class Vector3{
    x:number=0;
    y:number=0;
    z:number=0;
    constructor(x:number,y:number,z:number){
        this.x =x;
        this.y =y;
        this.z =z;
    }
}

var test = ()=>{
    var g1 = new GameBehavior('g1');
    var g2 = new GameBehavior('g2');
    var g3 = new UsersMap("g3")
    var objs = new GameObjs();
    objs.add(g1);
    objs.add(g2);
    objs.add(g3)
    console.log(objs);
    objs.update()
}
test();
