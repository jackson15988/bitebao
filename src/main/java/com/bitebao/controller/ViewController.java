package com.bitebao.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController implements ErrorController {

    @GetMapping(path = {"/"})
    public String login() {
        return "login";
    }

    @GetMapping(path = {"/home"})
    public String home() {
        return "home";
    }

    @GetMapping(path = "/search")
    public String search() {
        return "search";
    }


    @GetMapping(path = "/loginPsw")
    public String loginPsw() {
        return "loginPsw";
    }

    @GetMapping(path = "/loginOtp")
    public String loginOtp() {
        return "loginOtp";
    }

    @GetMapping(path = "/loginForgetPsw")
    public String loginForgetPsw() {
        return "loginGetPsw";
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


    @GetMapping(path = "/error")
    public String error_page() {
        return "/404";
    }


    @Override
    public String getErrorPath() {
        return "/error";
    }


}


