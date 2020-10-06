package com.bitebao.controller;

import com.bitebao.bo.UserBo;
import com.bitebao.dto.SuccessResponseDto;
import com.bitebao.entity.BtUser;
import com.bitebao.service.BtUserService;
import com.bitebao.utils.HostAddressUtils;
import com.bitebao.utils.LogUtils;
import com.bitebao.utils.MD5Utils;
import com.bitebao.utils.ResponseUtil;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.util.ObjectUtils;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/admin/user")
public class UserController {

    private Logger log = LogUtils.loginLog;

    @Autowired
    BtUserService btUserService;


    //找尋使用者資訊
    @GetMapping("/findUserInfoByAccount")
    public ResponseEntity<SuccessResponseDto> findUserInfoByAccount(
            @RequestParam(value = "account", defaultValue = "") String account) {
        //有商戶號就撈出商戶號有的頻道
        BtUser BtUser = btUserService.findByAccount(account);
        return ResponseUtil.successOutputResult(BtUser, "success");
    }


    @PostMapping("/editMember")
    public ResponseEntity<SuccessResponseDto> editMember(BtUser user, BindingResult result, Model model, HttpServletRequest request) {
        try {
            btUserService.updateUserInfo(request, user);
        } catch (Exception e) {

        }
        System.out.print("取得user資訊:" + user);
        return ResponseUtil.successOutputResult("success");
    }


    /**
     * 找尋所有的客戶進行管理機制
     *
     * @param user
     * @param result
     * @param model
     * @param request
     * @return
     */
    @GetMapping("/findAllMember")
    public ResponseEntity<SuccessResponseDto> findAllMember(BtUser user, BindingResult result, Model model, HttpServletRequest request) {
        System.out.print("取得user資訊:" + user);
        return ResponseUtil.successOutputResult(btUserService.findAllMember(), "success");
    }
    /*

     */

   /* @GetMapping(path = "/updateExposureById")
    public ResponseEntity<SuccessResponseDto> updateExposureById(
            @RequestParam(value = "id", defaultValue = "") Integer id) {
        return ResponseUtil.successOutputResult(mvVideoAdService.updateExposurePlusOne(id), "success");
    }*/


}
