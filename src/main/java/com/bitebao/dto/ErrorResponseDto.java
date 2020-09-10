package com.bitebao.dto;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;

@Data
public class ErrorResponseDto {

    private String code;

    private String message;

    private JsonNode jsonData;


}
