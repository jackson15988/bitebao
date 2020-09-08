package com.bitebao.exection;


import com.bitebao.enums.ExceptionEnum;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;


public class GeneralException extends Exception {
    private ExceptionEnum exceptionEnum;
    private JsonNode data;

    public GeneralException(ExceptionEnum exceptionEnum) {
        super(exceptionEnum.getMessage());
        this.exceptionEnum = exceptionEnum;
    }

    /**
     * 不要給ObjectNode
     */
    public GeneralException(ExceptionEnum exceptionEnum, Object object) {
        super(exceptionEnum.getMessage());
        this.exceptionEnum = exceptionEnum;
        this.data = new ObjectMapper().valueToTree(object);
    }

    public ExceptionEnum getExceptionEnum() {
        return exceptionEnum;
    }

    public JsonNode getData() {
        return data;
    }

}
