package com.bitebao.controller;

import com.bitebao.dto.SuccessResponseDto;
import com.bitebao.dto.UserLoginPswDto;
import com.bitebao.entity.BtUser;
import com.bitebao.service.BtUserService;
import com.bitebao.utils.ResponseUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/admin/user")
public class UserController {

    private BtUserService btUserService;

    public UserController(BtUserService btUserService) {
        this.btUserService = btUserService;
    }


    //驗證登入API
    @RequestMapping(value = "/doLogin", method = RequestMethod.POST)
    public ResponseEntity<SuccessResponseDto> login(UserLoginPswDto user) {
        System.out.println("POJO: " + user.getAccount());
        return ResponseUtil.successOutputResult(null);
    }

    //找尋使用者資訊
    @GetMapping("/findUserInfoByAccount")
    public ResponseEntity<SuccessResponseDto> findUserInfoByAccount(
            @RequestParam(value = "account", defaultValue = "") String account) {
        //有商戶號就撈出商戶號有的頻道
        BtUser BtUser = btUserService.findByAccount(account);
        return ResponseUtil.successOutputResult(BtUser, "success");
    }

   /* @GetMapping(path = "/updateExposureById")
    public ResponseEntity<SuccessResponseDto> updateExposureById(
            @RequestParam(value = "id", defaultValue = "") Integer id) {
        return ResponseUtil.successOutputResult(mvVideoAdService.updateExposurePlusOne(id), "success");
    }*/


}
