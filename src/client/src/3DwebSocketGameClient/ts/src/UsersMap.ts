
/**
 * 游戏中所有的游戏对象的hashmap，数据来自于服务器，并在每一帧更新（判断是否有新对象加入或者老对象需要销毁）
 */
class UsersMap extends GameBehavior {
    start(){
        
    }
    update(){
        
    }

    /**
     * 游戏中所有的游戏对象的hashmap，数据来自于服务器，并在每一帧更新（判断是否有新对象加入或者老对象需要销毁）
     */

    /**
     * 
     */
    size(){
        
    };
    /**
     * 
     */
    users:{
        [key:string]:GameUser
    };
    /**
     * 
     */
    get() :  void {
        // TODO implement here
        this.users["name"]
    }

    /**
     * 
     */
    put(g:GameUser) :  void {
        // TODO implement here
        this.users["name"] =  g;
    }
}