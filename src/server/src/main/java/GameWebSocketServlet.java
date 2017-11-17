import javax.websocket.OnMessage;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;

@ServerEndpoint("/test")
public class GameWebSocketServlet {
    @OnMessage
    public void onMessage(String message, Session session)
            throws IOException, InterruptedException {
        System.out.println("客户端说：" + message);
        Game g =  new Game();
        g.game();
        while(true){
            session.getBasicRemote().sendText("world");
            Thread.sleep(2000);
        }
    }

}
