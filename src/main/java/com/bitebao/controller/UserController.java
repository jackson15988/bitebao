package com.bitebao.controller;

import com.bitebao.bo.UserBo;
import com.bitebao.dto.SuccessResponseDto;
import com.bitebao.entity.BtUser;
import com.bitebao.service.BtUserService;
import com.bitebao.utils.HostAddressUtils;
import com.bitebao.utils.MD5Utils;
import com.bitebao.utils.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;

import javax.servlet.http.HttpServletRequest;
import java.util.Objects;


@RestController
@RequestMapping("/admin/user")
public class UserController {

    Logger log = LoggerFactory.getLogger(getClass());

    private BtUserService btUserService;

    public UserController(BtUserService btUserService) {
        this.btUserService = btUserService;
    }


    //驗證登入API
    @RequestMapping(value = "/doLogin", method = RequestMethod.POST)
    public String login(BtUser user, SessionStatus sessionStatus, HttpServletRequest request) {
        System.out.println("POJO: " + user.getAccount());
        boolean successfully = false;
        String loginIp = HostAddressUtils.getRealIPAddresses(request);
        log.info("取得登入IP位置:" + loginIp);
        BtUser userObj = btUserService.findByAccount(user.getAccount());
        if (userObj != null) {
            String md5Str = MD5Utils.encode(user.getPassword());
            if (Objects.equals(md5Str, userObj.getPassword())) {

                return "redirect:/home";
            }
        }
        return "login";
    }

    //找尋使用者資訊
    @GetMapping("/findUserInfoByAccount")
    public ResponseEntity<SuccessResponseDto> findUserInfoByAccount(
            @RequestParam(value = "account", defaultValue = "") String account) {
        //有商戶號就撈出商戶號有的頻道
        BtUser BtUser = btUserService.findByAccount(account);
        return ResponseUtil.successOutputResult(BtUser, "success");
    }


    @GetMapping("/doLogout")
    public String doLogout(HttpServletRequest request) {
        String result = UserBo.doLogOut(request);
        if ("success".equals(result)) {
            return "redirect:/";
        } else {
            return "rediret:/error";
        }
    }

    @PostMapping("/editMember")
    public String editMember(BtUser user, BindingResult result, Model model) {
        System.out.print("取得user資訊:" + user);
        return "register";
    }

    /*

     */

   /* @GetMapping(path = "/updateExposureById")
    public ResponseEntity<SuccessResponseDto> updateExposureById(
            @RequestParam(value = "id", defaultValue = "") Integer id) {
        return ResponseUtil.successOutputResult(mvVideoAdService.updateExposurePlusOne(id), "success");
    }*/


}
