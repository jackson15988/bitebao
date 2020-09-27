package com.bitebao.service;


import com.bitebao.entity.BtUser;
import com.bitebao.repository.BtUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.util.Objects;

@Service
public class BtUserService {

    @Autowired
    BtUserRepository btuserRepository;


    public static boolean checkLoginInfo(HttpServletRequest request, BtUser user, String password) {
        boolean isCheckPass = false;
        if (Objects.equals(password, user.getPassword())) {
            user.setPassword("");
            request.getSession().setAttribute("userSession", user);
            isCheckPass = true;
        }
        return isCheckPass;
    }

    public BtUser findByAccount(String account) {
        return btuserRepository.findByAccount(account);
    }

    public BtUser updateUserInfo(HttpServletRequest request, BtUser user) {


        return btuserRepository.save(user);
    }


    ;
}
