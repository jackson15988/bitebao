package com.bitebao.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController implements ErrorController {


    @GetMapping(path = {"/"})
    public String index() {
        return "login";
    }

    //首頁
    @GetMapping(path = "/home")
    public String search() {
        return "home";
    }

    //系統設定配置頁面
    @GetMapping(path = "/systemConfig")
    public String loginPsw() {
        return "systemConfig";
    }

    //會員設置
    @GetMapping(path = "/memberProfile")
    public String memberProfile() {
        return "memberProfile";
    }

    //即時報酬分析
    @GetMapping(path = "/dashboard")
    public String dashboard() {
        return "dashboard";
    }


    @GetMapping(path = "/register")
    public String register() {
        return "register";
    }

    @GetMapping(path = "/more")
    public String more() {
        return "more";
    }

    @GetMapping(path = "/videoPlay")
    public String video_play() {
        return "videoPlay";
    }

    //錯誤頁面導向一率 404頁面
    @GetMapping(path = "/error")
    public String error_page() {
        return "/404";
    }


    @Override
    public String getErrorPath() {
        return "/error";
    }


}


