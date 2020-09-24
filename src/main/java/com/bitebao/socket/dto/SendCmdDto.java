package com.bitebao.socket.dto;


import com.bitebao.socket.emums.CmdEnum;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;

import java.io.Serializable;

@Data
public class SendCmdDto implements Serializable {
    private CmdEnum cmd;
    private String message;
    private JsonNode jsonResult;

}
