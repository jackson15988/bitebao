package com.bitebao.dto;

import lombok.Data;

@Data
public class SuccessResponseDto {

    private String code;

    private String message;

    private Object result;
}
