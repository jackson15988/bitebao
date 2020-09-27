package com.bitebao.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ViewController implements ErrorController {

    @GetMapping(path = {"/", "/login"})
    public String login() {
        return "login";
    }

    @GetMapping(path = {"/home"})
    public String home() {
        return "home";
    }

    @GetMapping(path = {"/memberProfile"})
    public String memberProfile() {
        return "memberProfile";
    }

    @GetMapping(path = {"/memberMgmt"})
    public String memberMgmt() {
        return "memberMgmt";
    }

    @GetMapping(path = {"/systemConfig"})
    public String systemConfig() {
        return "systemConfig";
    }


    @Override
    public String getErrorPath() {
        return "/error";
    }


}


