declare var THREE :any;
/**
 * 
 */
class World {

    /**
     * 
     */
    public constructor(name:string) {
        this.worldName = name;
    }
    worldName:string;
    /**
     * 
     */
    screenWidth: number;
    /**
     * 
     */
    
    screenHeight: number;
    /**
     * 
     */
    canvas:HTMLElement ;
    /**
     * THREE render
     */
    renderer:any;
    /**
     * three scence
     */
    scence:any;
    /**
     * 
     */
    mainCamera: any;
    /**
     * 
     */
    objs: GameObjs;
    /**
     * 
     */
    init() :  void {
        // TODO implement here
        Log.log(this.worldName+ "  init")

        console.log("world innit :"+this.worldName);
        this.canvas =  <HTMLElement>document.getElementById("world1_canvas");
        //设置屏幕宽度和高度
        this.screenWidth = this.canvas.clientWidth;
        this.screenHeight = this.canvas.clientHeight;
        console.log(this.canvas);
        //设置渲染器
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas
        });
        this.renderer.setSize(this.screenWidth, this.screenHeight);//将渲染的大小设为与Canvas相同
        this.renderer.setClearColor(0xFFFFFF, 0.0);//设置默认颜色与透明度
    //    this.renderer.shadowMapEnabled=true;

        

        //初始化场景
        this.scence =  new THREE.Scene();
        //初始化所有对象，并且添加场景对象
        this.objs =  new GameObjs();
        var objMap =  this.objs.objArray;

        //设置摄像机
        var cam =  new GameBehavior("camera",this);
        this.mainCamera = cam;
        cam.threeObj =  new THREE.PerspectiveCamera(
            75,
            this.screenWidth/this.screenHeight, 
            0.1, 
            1000
        );
        this.objs.add(cam);


        //添加玩家对象
        var mePlayer = new MePlayer("mePlayer",this);
        this.objs.add(mePlayer);

        //添加消息处理器
        var meser =  new Messager("messager",this);
        this.objs.add(meser);


        //添加控制器
        var userControler = new UserControler("userControler",this);
        this.objs.add(userControler);

        for( var obj in objMap){
            try{
                objMap[obj].start()
                this.scence.add(objMap[obj].threeObj);
            }catch(e){
                console.log("===============");
            }
            
            console.log(obj + " obj innited")
        }
    }

    /**
     * 
     */
    update() :  void {
        for(var key in this.objs.objArray){
           this.objs.objArray[key].update();
        }
        this.renderer.render(this.scence, this.mainCamera.threeObj);
    }

}