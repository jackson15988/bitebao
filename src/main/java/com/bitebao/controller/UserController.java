package com.bitebao.controller;

import com.bitebao.dto.SuccessResponseDto;
import com.bitebao.entity.BtUser;
import com.bitebao.service.BtUserService;
import com.bitebao.utils.MD5Utils;
import com.bitebao.utils.ResponseUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;


@RestController
@RequestMapping("/admin/user")
public class UserController {

    private BtUserService btUserService;

    public UserController(BtUserService btUserService) {
        this.btUserService = btUserService;
    }


    //驗證登入API
    @RequestMapping(value = "/doLogin", method = RequestMethod.POST)
    public ResponseEntity<SuccessResponseDto> login(BtUser user) {
        System.out.println("POJO: " + user.getAccount());
        boolean successfully = false;
        BtUser userObj = btUserService.findByAccount(user.getAccount());
        if (userObj != null) {
            String md5Str = MD5Utils.encode(user.getPassword());
            if (Objects.equals(md5Str, userObj.getPassword())) {
                successfully = true;
            } else {

            }
        }
        return ResponseUtil.successOutputResult(true, "success");
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
