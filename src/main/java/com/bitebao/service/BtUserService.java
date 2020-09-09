package com.bitebao.service;

import com.bitebao.entity.BtUser;

public interface BtUserService {

    //找尋帳號
    BtUser findByAccount(String account);

}
