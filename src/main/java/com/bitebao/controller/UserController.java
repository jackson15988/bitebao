package com.bitebao.controller;

import com.bitebao.dto.SuccessResponseDto;


import com.bitebao.dto.UserLoginPswDto;
import com.bitebao.utils.ResponseUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;


/*@Api(tags = "MvWatermarkController", description = "影片logo相關Api")*/
@RestController
@RequestMapping("/admin/user")
public class UserController {


    @RequestMapping(value = "/doLogin", method = RequestMethod.POST)
    public ResponseEntity<SuccessResponseDto> login(UserLoginPswDto user) {
        System.out.println("POJO: " + user.getAccount());
        return ResponseUtil.successOutputResult(null);
    }
}
