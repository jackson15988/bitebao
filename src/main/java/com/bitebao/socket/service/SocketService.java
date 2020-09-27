package com.bitebao.socket.service;


import com.bitebao.socket.dto.SendCmdDto;
import com.bitebao.socket.emums.CmdEnum;
import com.bitebao.utils.LogUtils;
import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.UUID;

@RequiredArgsConstructor
@Slf4j
@Service
public class SocketService {

  /*  private org.slf4j.Logger logger = LogUtils.socketLog;

    private final SocketIOServer socketIOServer;
    private final ObjectMapper objectMapper;


    public void publishToAllClient() {
        ObjectNode objectNode = objectMapper.createObjectNode();
        objectNode.put("test", 123);
        SendCmdDto sendMessageDto = new SendCmdDto();
        sendMessageDto.setCmd(CmdEnum.TEST);
        sendMessageDto.setJsonResult(objectNode);

        socketIOServer.getAllClients().forEach(socketIOClient -> {
            socketIOClient.sendEvent("message", sendMessageDto);
        });
    }

    *//**
     * 推播新交易紀錄
     *
     * @author Zora
     *//*
    public void sendNewTransactionRecordMessage(Integer userId, String sessionId) {
        ObjectNode objectNode = objectMapper.createObjectNode();
        objectNode.put("userId", userId);
        objectNode.put("sessionId", sessionId);
        SendCmdDto sendMessageDto = new SendCmdDto();
        sendMessageDto.setCmd(CmdEnum.NEW_TRANSACTION_RECORD);
        sendMessageDto.setJsonResult(objectNode);
        logger.info("推播新交易紀錄任務UserId為:" + userId + " 此次要推播新交易紀錄的SessionId為:" + sessionId);
        SocketIOClient targetClient = socketIOServer.getClient(UUID.fromString(sessionId));
        if (targetClient == null) {
            logger.error("sessionId=" + sessionId + "在server中获取不到client");
        } else {
            targetClient.sendEvent("message", sendMessageDto);
        }

    }

    *//**
     * 強制剔除下線之功能
     *
     * @author Ryan
     *//*
    public void forceKickOut(Integer userId, String sessionId) {
        ObjectNode objectNode = objectMapper.createObjectNode();
        objectNode.put("userId", userId);
        objectNode.put("sessionId", sessionId);
        SendCmdDto sendMessageDto = new SendCmdDto();
        sendMessageDto.setCmd(CmdEnum.ForceKickOut);
        sendMessageDto.setJsonResult(objectNode);
        logger.info("執行強制踢出任務UserId為:" + userId + " 此次要強制踢出下線的SessionId為:" + sessionId);
        SocketIOClient targetClient = socketIOServer.getClient(UUID.fromString(sessionId));
        if (targetClient == null) {
            logger.error("sessionId=" + sessionId + "在server中获取不到client");
        } else {
            targetClient.sendEvent("message", sendMessageDto);
        }
    }*/
}
