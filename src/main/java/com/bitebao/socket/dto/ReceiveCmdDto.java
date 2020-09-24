package com.bitebao.socket.dto;


import com.bitebao.socket.emums.CmdEnum;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class ReceiveCmdDto {
    private CmdEnum cmd;
}
