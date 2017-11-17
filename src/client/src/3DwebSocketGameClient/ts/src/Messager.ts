
/**
 * 与websocket服务端建立一个连接，并用于处理和传递通信内容。
 */
class Messager extends GameBehavior {
    
    player:MePlayer;
    start(){
        this.ws  = new WebSocket(this.serverURL);
        this.ws.onopen = this.connected;
        this.ws.onmessage = this.onMessage;
        this.player = <MePlayer>this.world.objs.get("mePlayer");
    }

    connected = (evt:any)=>{
        Log.log("connected");
        this.conected = true;
        this.ws.send(this.message);
    };
    sendTime:number
    onMessage =(e: MessageEvent)=>{
    
        var es  = <string>e.data;
        var arr = es.split("|");
        var thisGameID = arr[0];
   //     console.log(thisGameID);
        var game = JSON.parse(arr[1]);
        console.log(game);
        var gs = game.gamers;
        // console.log(new Date().getTime()-this.sendTime);
        this.sendTime = new Date().getTime();
        this.ws.send(this.message);
        for(let i = 0; i< gs.length;i++){
            if(thisGameID==gs[i].gamerID){
                this.player.shandow.position.x = gs[i].positionX;
                this.player.shandow.position.z = gs[i].positionY;
                this.player.shandow.rotation.y = gs[i].elur;
            }
        }
        
    //    var pos = 
    //    Log.log(gs);
    
    } 

    update(){
      //  this.sendMes();
    }

    /**
     * 与websocket服务端建立一个连接，并用于处理和传递通信内容。
     */

    /**
     * 服务端地址
     */
    serverURL: string = "ws://60.205.181.78:5555/game/websocket";
    /**
     * websocke客户端
     */
    ws: WebSocket;
    /**
     * 
     */
    message: String = "0|0|0";
    mesGet:string;

    conected:boolean= false;

    /**
     * 每个多少时间发送一次消息
     */
    frameTime:number = 100;
    /**
     * 上一帧发送消息的时间
     */
    lastSendTime:number = 0;
    thisFrameTime:number;
    
    /**
     * 
     */
    
    setMesage() :  void {
        // TODO implement here
    }
    
    /**
     * 
     */
    sendMes() :  void {
        // TODO implement here
        if(!this.conected){
           return; 
        }
        this.thisFrameTime =  new Date().getTime();
        if(this.lastSendTime+this.frameTime<this.thisFrameTime){
            this.ws.send(this.message);
            this.lastSendTime = this.thisFrameTime;
        }
    }

}