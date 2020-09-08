package com.bitebao.exection;

import com.bitebao.enums.ExceptionEnum;
import com.fasterxml.jackson.databind.JsonNode;


public class TokenException extends GeneralException {
    public TokenException(ExceptionEnum exceptionEnum) {
        super(exceptionEnum);
    }

    public TokenException(ExceptionEnum exceptionEnum, JsonNode data) {
        super(exceptionEnum, data);
    }
}
