
/**
 * 游戏的控制器，用于控制主角移动
 */
class UserControler extends GameBehavior {
    update(){
        if(this.isDown){
            var v= this.getMoveVector2()
        //    Log.log(v);
        //    var el = Math.atan2(v.y,v.x);
        //    console.log(el)
            this.deltPos.x = this.thisPos.x;
            this.deltPos.y = this.thisPos.y;
            var p = this.world.objs.get("mePlayer");
            var ppp = {x:p.threeObj.position.x,y:p.threeObj.position.y,z:p.threeObj.position.z}
            var eee =  p.threeObj.rotation.y;
            p.threeObj.rotation.y = p.threeObj.rotation.y + v.x/100;
            p.threeObj.translateZ(0.02);

            (<Messager>this.world.objs.get("messager")).message = p.threeObj.position.x+"<->"+p.threeObj.position.z+"<->"+p.threeObj.rotation.y;
     //       (<Messager>this.world.objs.get("messager")).message = 0.0001999966666833333+"<->"+0.0001999966666833333+"<->"+0.0001999966666833333;
        //    Log.log("mes:"+(<Messager>this.world.objs.get("messager")).message);
            //发送小心后恢复
     //       p.threeObj.position.set(ppp.x,ppp.y,ppp.z);
     //       p.threeObj.rotation.y = eee;
     //       console.log(p.threeObj.translateZ);
        //    this.world.objs.get("mePlayer").threeObj.rotation.y = v.y;

        }
        
    }
    start(){
        addEventListener("mousedown",(event)=>{
            this.isDown = true;
            //初始化鼠标位置(重置)
            this.thisPos.x = event.screenX;
            this.thisPos.y = event.screenY;
            this.deltPos.x = event.screenX;
            this.deltPos.y = event.screenY;
        },false);
        //鼠标抬起
        addEventListener("mouseup",(event)=>{
            this.isDown = false;
        },false);
        //鼠标移动
        addEventListener("mousemove", (event)=>{
            this.thisPos.x = event.screenX;
            this.thisPos.y = event.screenY;
        });
    }
    /**
     * 
     */
    controlerVector3= new Vector3();
    /**
     * 
     */
    thisPos: Vector3 = new Vector3();
    /**
     * 
     */
    deltPos: Vector3 = new Vector3();
    isDown = false;
    /**
     * 设置玩家角色的加速度
     */
    setMePlayerA() :  void {
        // TODO implement here
    }

    /**
     * @return 
     */
    getMoveVector2() :  Vector3 {
        // TODO implement here
        var v = new Vector3();
        v.x = this.thisPos.x - this.deltPos.x;
        v.y = this.thisPos.y - this.deltPos.y;
        return v;
    }
    getCenterVector (){

        var v = new Vector3();
        v.x = this.thisPos.x - this.world.screenWidth/2;
        v.y = this.thisPos.y - this.world.screenHeight/2;
        return v;
    }

}