package com.bitebao.controller;

import com.bitebao.dto.SuccessResponseDto;
import com.bitebao.dto.UserLoginPswDto;
import com.bitebao.utils.ResponseUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/admin/user")
public class UserController {

    //驗證登入API
    @RequestMapping(value = "/doLogin", method = RequestMethod.POST)
    public ResponseEntity<SuccessResponseDto> login(UserLoginPswDto user) {
        System.out.println("POJO: " + user.getAccount());
        return ResponseUtil.successOutputResult(null);
    }
}
