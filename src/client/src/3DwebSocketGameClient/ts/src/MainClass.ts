
/**
 * 
 */
class MainClass {

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
        console.log(this);
        console.log(World)
        var world =  new World("world1")
        world.init();
        var loop = ()=>{
            world.update();
            requestAnimationFrame(loop);
        }
        loop();
        
    }
}
window.onload = ()=>{
    new MainClass().main();
}

