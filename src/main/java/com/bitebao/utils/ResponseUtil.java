package com.bitebao.utils;

import com.bitebao.dto.ErrorResponseDto;
import com.bitebao.dto.SuccessResponseDto;
import com.bitebao.enums.ExceptionEnum;
import com.bitebao.exection.GeneralException;
import com.bitebao.exection.TokenException;
import com.fasterxml.jackson.databind.JsonNode;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public class ResponseUtil {


    public static ResponseEntity<ErrorResponseDto> errorOutputResult(GeneralException exception, HttpStatus httpStatus) {
        ExceptionEnum exceptionEnum = exception.getExceptionEnum();
        String code = exceptionEnum.getCode();
        String message = exceptionEnum.getMessage();
        JsonNode exceptionData = exception.getData();

        // token相關的只在token的logFile，其他的都會在一般logFile印簡單訊息
        if (exception instanceof TokenException) {
            /*            LogUtils.tokenExceptionSimpleLog.error("code = {}, message = {}", code, message);*/
        } else {
            /*      LogUtils.exceptionSimpleLog.error("code = {}, message = {}", code, message);*/
        }
        // 已預期的錯誤，不再印詳細訊息
        /*       LogUtils.exceptionLog.error("code = {}, message = {}, data = {}", code, message, exceptionData);*/

        ErrorResponseDto errorResponseDto = new ErrorResponseDto();
        errorResponseDto.setCode(code);
        errorResponseDto.setMessage(message);
        if (exceptionData != null) {
            errorResponseDto.setJsonData(exceptionData);
        }
        return new ResponseEntity<>(errorResponseDto, httpStatus);
    }

    public static ResponseEntity<ErrorResponseDto> errorOutputResult(Exception exception, HttpStatus httpStatus) {
     /*   LogUtils.exceptionSimpleLog.error("unexpected exception, message = {}, className = {}", exception.getMessage(), exception.getClass().getName());
        LogUtils.exceptionLog.error("unexpected exception", exception);*/

        ErrorResponseDto errorResponseDto = new ErrorResponseDto();
        errorResponseDto.setCode(ExceptionEnum.UNKNOWN_ERROR.getCode());
        errorResponseDto.setMessage(ExceptionEnum.UNKNOWN_ERROR.getMessage());
        return new ResponseEntity<>(errorResponseDto, httpStatus);
    }

    public static ResponseEntity<SuccessResponseDto> successOutputResult(Object result) {
        return successOutputResult(result, "success");
    }

    public static ResponseEntity<SuccessResponseDto> successOutputResult(Object result, String successMessage) {
        SuccessResponseDto successResponseDto = new SuccessResponseDto();
        successResponseDto.setCode("0");
        successResponseDto.setMessage(successMessage);
        successResponseDto.setResult(result);
        return new ResponseEntity<>(successResponseDto, HttpStatus.OK);
    }
}