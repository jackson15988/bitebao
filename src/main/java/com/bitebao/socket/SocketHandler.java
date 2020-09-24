package com.bitebao.socket;


import com.bitebao.socket.dto.ReceiveCmdDto;
import com.bitebao.socket.service.SocketService;
import com.corundumstudio.socketio.AckRequest;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.annotation.OnConnect;
import com.corundumstudio.socketio.annotation.OnDisconnect;
import com.corundumstudio.socketio.annotation.OnEvent;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
@Component
public class SocketHandler {


    private final SocketService socketService;

/*    @Autowired
    UserOnlineService userOnlineService;*/

    //当客户端发起连接时调用
    @OnConnect
    public void onConnect(SocketIOClient client) {
        Map<String, List<String>> urlParams = client.getHandshakeData().getUrlParams();
        log.info("此次連線帳號為 Connection Account ID : " + urlParams.get("userName") + "取得id" + urlParams.get("id"));
        log.info("onConnect :sessionId:" + client.getSessionId() + "  clientAddr:" + client.getRemoteAddress());
        List<String> userId = urlParams.get("id");
        String sessionId = client.getSessionId().toString();
        try {
            /* userOnlineService.updateOnlineUser(Integer.valueOf(userId.get(0)), sessionId);*/
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    //客户端断开连接时调用，刷新客户端信息
    @OnDisconnect
    public void onDisConnect(SocketIOClient client) {
        Map<String, List<String>> urlParams = client.getHandshakeData().getUrlParams();
        List<String> userId = urlParams.get("id");
        /*  userOnlineService.deleteOnlineUserSession(client.getSessionId().toString());*/
        log.info("onDisconnect:" + client.getSessionId());
    }

    @OnEvent("message")
    public void message(SocketIOClient client, ReceiveCmdDto receiveCmdDto, AckRequest ackRequest) {
        log.info("onEvent message ReceiveCmdDto: " + receiveCmdDto.toString());
        executeCmd(receiveCmdDto);
    }

    private void executeCmd(ReceiveCmdDto receiveCmdDto) {
        log.debug("server cmd -> " + receiveCmdDto.getCmd().toString());
        switch (receiveCmdDto.getCmd()) {
            case TEST:
                socketService.publishToAllClient();
                break;
            default:
                break;
        }
    }

}