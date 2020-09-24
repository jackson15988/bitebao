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
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.support.SessionStatus;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/admin/user")
public class UserController {

    private Logger log = LogUtils.loginLog;

    private BtUserService btUserService;

    public UserController(BtUserService btUserService) {
        this.btUserService = btUserService;
    }


    //驗證登入API
    @RequestMapping(value = "/doLogin", method = RequestMethod.POST)
    public String login(BtUser user, HttpServletRequest request, Model model) {
        System.out.println("POJO: " + user.getAccount());
        try {
            String loginIp = HostAddressUtils.getRealIPAddresses(request);
            log.info("取得登入IP位置:" + loginIp);
            BtUser userObj = btUserService.findByAccount(user.getAccount());
            if (userObj != null) {
                String md5Pssword = MD5Utils.encode(user.getPassword());
                boolean isPass = UserBo.checkLoginInfo(request, userObj, md5Pssword);
                if (isPass) {
                    return "redirect:/#home";
                }
            }
        } catch (Exception e) {
            log.error(e.getMessage(), e);
            Map<String, String> exceptionMap = new HashMap<>();
            exceptionMap.put("code", "500");
            exceptionMap.put("msg", e.getMessage());
            model.addAttribute("exMap", exceptionMap);
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
