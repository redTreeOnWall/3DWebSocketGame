
/**
 * 
 */
class MainClass {
    static run:boolean = true;
    
    /**
     * 
     */
    public constructor() {
    }

    /**
     * 
     */
    main() :  void {
        // TODO implement here
        console.log("main");
        var world =  new World("world1")
        world.init();
        var loop = ()=>{
            if(MainClass.run){
            
            world.update();
            requestAnimationFrame(loop);
            }
        }
        loop();
    }
}
window.onload = ()=>{
    test();
    new MainClass().main();
}

var test = ()=>{
    var x : {
        [key:string]:string
    };
   x =  {}
    
    x["name"] = "nameValue"
    console.log(x);
}

