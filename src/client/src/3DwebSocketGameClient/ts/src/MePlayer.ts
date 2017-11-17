
/**
 * 
 */
class MePlayer extends GameBehavior {
    //上一个影子帧，
    public deltPos : Vector3 = new Vector3();
    public deltEle:number =0;
    //最新的影子帧
    public thisPos : Vector3 = new Vector3();
    public thisEle:number =0;

    //服务器帧间隔时间
    public serverDeltTime:number;
    //客户端帧间隔时间
    public clientDeltTime:number;

    //当前帧是否是最新的帧
    public HasNew: boolean;

    public shandow:any;
    update(){
        
    }
    start(){
        //光源
        var light =  new THREE.PointLight(0xffffff, 1, 200);
        light.position.set(0, 10, -5);
        //3维度物体
        var cp = new THREE.Mesh(new THREE.CubeGeometry(0.1,0.5,0.05),new THREE.MeshPhongMaterial({color:0xaaffff,shininess:1000,specular:0xaaffff}));
        var cp2 = new THREE.Mesh(new THREE.CubeGeometry(1,1.5,0.5),new THREE.MeshPhongMaterial({color:0xffaaff,shininess:1000,specular:0xffaaff}));
        this.shandow = cp2;
        var bgm = new THREE.MeshPhongMaterial({ 
            map: 
            THREE.ImageUtils.loadTexture('./res/bg.jpg',
                {},
                function(t:any){
                    
                } 
            ),
            shininess:0
        });
   //     cp.material = bgm;
        bgm.map.wrapS = THREE.RepeatWrapping;
        bgm.map.wrapT = THREE.RepeatWrapping;
        bgm.map.repeat.set(100,100);
        var bg = new THREE.Mesh(new THREE.CubeGeometry(100,0.01,100),bgm);
        /*
            bg.receiveShadow  = true;
            cp.castShadow  = true;
            light.castShadow = true;
        */
        this.world.scence.add(bg);
        this.world.scence.add(cp2);
        this.threeObj =  cp;
        this.threeObj.add( this.world.mainCamera.threeObj);
        this.threeObj.add(light);
        this.world.mainCamera.threeObj.position.set(0,3,-5);
        this.world.mainCamera.threeObj.lookAt(this.threeObj.position);
        Log.log(this.world)
    }

    /**
     * 
     */
    speed: Vector3;
    /**
     * 
     */
    a: Vector3;
    /**
     * 
     */
    getNextPosition() :  void {
        // TODO implement here
    }

}