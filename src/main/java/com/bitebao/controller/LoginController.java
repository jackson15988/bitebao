package com.bitebao.controller;

import com.bitebao.bo.UserBo;
import com.bitebao.entity.BtUser;
import com.bitebao.mondel.LoginObj;
import com.bitebao.service.BtUserService;
import com.bitebao.utils.HostAddressUtils;
import com.bitebao.utils.LogUtils;
import com.bitebao.utils.MD5Utils;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.support.SessionStatus;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@Controller
public class LoginController {
    private Logger log = LogUtils.loginLog;

    @Autowired
    BtUserService btUserService;

    @PostMapping(value = "/doLogin")
    public String loginCheck(@Valid @ModelAttribute LoginObj loginObj, // 下一個一定要是 BindingResult
                             BindingResult bindingResult,
                             SessionStatus sessionStatus, HttpServletRequest request, Model model) {
        try {
            String loginIp = HostAddressUtils.getRealIPAddresses(request);
            log.info("取得登入IP位置:" + loginIp);
            BtUser userObj = btUserService.findByAccount(loginObj.getAccount());
            if (userObj != null) {
                String md5Pssword = MD5Utils.encode(loginObj.getPassword());
                boolean isPass = UserBo.checkLoginInfo(request, userObj, md5Pssword);
                if (isPass) {
                    return "redirect:/home";
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


    @GetMapping("/doLogOut")
    public String doLogout(HttpServletRequest request) {
        String result = UserBo.doLogOut(request);
        if ("success".equals(result)) {
            return "redirect:/login";
        } else {
            return "rediret:/error";
        }
    }

}
