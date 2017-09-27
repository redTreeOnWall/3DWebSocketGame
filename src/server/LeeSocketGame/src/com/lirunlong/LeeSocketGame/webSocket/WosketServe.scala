package com.lirunlong.LeeSocketGame.webSocket

import java.util

import com.fasterxml.jackson.core.JsonFactory
import com.fasterxml.jackson.databind.ObjectMapper
import com.lirunlong.LeeSocketGame.webSocket.GameModel.gamers.{connetedNumber, userIndex, users}
import com.lirunlong.LeeSocketGame.webSocket.gameContrler.game.gameState
import com.lirunlong.LeeSocketGame.webSocket.gameContrler.gamers
import org.eclipse.jetty.server.{Connector, Server}
import org.eclipse.jetty.servlet.{ServletContextHandler, ServletHolder}
import org.eclipse.jetty.websocket.api.{Session, WebSocketListener}
import org.eclipse.jetty.websocket.servlet.{WebSocketServlet, WebSocketServletFactory}

import scala.util.parsing.json.JSONObject


object WosketServe {
  def main(args: Array[String]): Unit = {

    new Thread(new Runnable {
      override def run(): Unit = {
        while(true){
          Thread.sleep(40l)
          gameContrler.game.update()
        }
      }
    }).start()

    var server = new Server(5555)
    var sch = new ServletContextHandler(ServletContextHandler.SESSIONS)
    sch.setContextPath("/game")

    sch.addServlet(new ServletHolder(new GameWebSocketServlet()), "/websocket")

    server.setHandler(sch)

    server.start()
    server.join()

  }
}


object gameContrler{

  //游戏玩家集合（hashmap）的控制器
  object gamers{
    //加入新玩家的队列
    var needAddList : util.LinkedList[Gamer] = new util.LinkedList[Gamer]()
    //移除玩家的队列
    var needRemoveList : util.LinkedList[Long] = new util.LinkedList[Long]()
    //玩家操作
    def GamersChange(gamer:Gamer,chageFunc:(Gamer)=>(Long)): Long = synchronized {
      chageFunc(gamer)
    }
    var addOne=(gamer:Gamer)=>{
      userIndex = userIndex+1
      gamer.id = userIndex
      needAddList.add(gamer)
      userIndex
    }
    var removeOne = (gamer:Gamer)=>{
      needRemoveList.add(gamer.id)
      gamer.id
    }
    var addUpdate = (gamer:Gamer)=>{
      //添加
      while(needAddList.size()>0){
        var i = needAddList.poll()
        users.put(i.id,i)
        connetedNumber = connetedNumber+1
        println("new User In,ID:"+i.id +"  users size:"+users.size())
      }
      //移除
      while(needRemoveList.size()>0){
        var i = needRemoveList.poll()
        users.remove(i)
        connetedNumber = connetedNumber-1
        println("a User out,ID:"+i +"  users size:"+users.size())
      }
      1l
    }
  }
  object game{
    //游戏状态
    object gameState{
      //      游戏状态数据包
      var gameStateMes="update not started"
      var gamerNum = 0
    }
    def update(): Unit ={
      //添加或移除
      gameContrler.gamers.GamersChange(null,gameContrler.gamers.addUpdate)

      var gameJson :ObjectMapper = new ObjectMapper()
      var rootJson  = gameJson.createObjectNode()
      var gamersJson = gameJson.createArrayNode()
      game.gameState.gamerNum = 0
      var it  = GameModel.gamers.users.entrySet().iterator()
      //根据游戏变化更新gamers map
      while(it.hasNext()){
        game.gameState.gamerNum = game.gameState.gamerNum +1
        var gamer = it.next().getValue()
        gamer.Update();
        var gamerJson  = gameJson.createObjectNode()
        gamerJson.put("positionX",gamer.position.x)
        gamerJson.put("positionY",gamer.position.y)
        gamerJson.put("elur",gamer.elur)
        gamerJson.put("gamerID",gamer.id)
        gamersJson.add(gamerJson)
      }
      rootJson.put("gamers",gamersJson)
      rootJson.put("gamerNum",game.gameState.gamerNum)
      gameState.gameStateMes = rootJson.toString()
   //   println(gameState.gameStateMes)
      this.sendModel()
    }

    def sendModel(): Unit ={
      var it2  = GameModel.gamers.users.entrySet().iterator()
      //发送更新好的数据
      while(it2.hasNext()){
        it2.next().getValue().SendMes()
      }
    }
  }

}

/***
  * game model
  */
object GameModel{
  object gamers{
    var userIndex =0l
    var connetedNumber = 0;
    var users:util.HashMap[Long,Gamer] = new util.HashMap()
  }
  object game{

  }
}


class Gamer(gameId:Long){
  var socketSession:Session = null
  var id = gameId
  object position{
    var x =0.0f
    var y = 0.0f
  }
  var elur = 0f;
  var msgGet ="" // 128-128
  var msgOut =""
  var Update =()=>{
    var xy =  msgGet.split("<->")

    if(xy.length==3){
      this.position.x =xy(0).toFloat
      this.position.y =xy(1).toFloat
      this.elur = xy(2).toFloat

    }
  }
  var SendMes = ()=>{
    msgOut = this.id +"|"+gameContrler.game.gameState.gameStateMes
    try{
      socketSession.getRemote().sendStringByFuture(msgOut)
    }catch {
      case e: Exception =>{
        println(e)
      }
    }
  }
  var pushMsg = (mes:String)=>  {
    this.msgGet = mes
  }
}


object conNum{
  var num = 0
}

class GameWebSocketListner extends WebSocketListener {
  var gamer:Gamer = new Gamer(0)
  var se :Session = null;
  var userID = 0l
  override def onWebSocketText(s: String) = {
    gamer.pushMsg(s)
  }
  override def onWebSocketBinary(bytes: Array[Byte], i: Int, i1: Int) = {
   // println(new String(bytes));
  }

  override def onWebSocketConnect(session: Session) = {

    conNum.num = conNum.num+1
    println("conNum:"+conNum.num)
    se = session
    gamer.socketSession = se
    userID = gamers.GamersChange(gamer,gamers.addOne)
  }

  override def onWebSocketClose(i: Int, s: String) = {

    gamers.GamersChange(this.gamer,gamers.removeOne)
    conNum.num = conNum.num-1
  }

  override def onWebSocketError(throwable: Throwable) = {
    println("err")
    conNum.num = conNum.num-1
    gamers.GamersChange(this.gamer,gamers.removeOne)
    se.close()
  }
}
class GameWebSocketServlet extends WebSocketServlet {
  override def configure(webSocketServletFactory: WebSocketServletFactory) = {

    webSocketServletFactory.register(classOf[GameWebSocketListner])
  }

}