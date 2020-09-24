package com.bitebao.service;

import com.bitebao.entity.BtUser;

import javax.servlet.http.HttpServletRequest;

public interface BtUserService {

    //找尋帳號
    BtUser findByAccount(String account);


}
