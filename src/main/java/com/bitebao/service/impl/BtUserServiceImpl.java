package com.bitebao.service.impl;


import com.bitebao.entity.BtUser;
import com.bitebao.repository.BtUserRepository;
import com.bitebao.service.BtUserService;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public class BtUserServiceImpl implements BtUserService {


    private final BtUserRepository btUserRepository;

    public BtUserServiceImpl(BtUserRepository btUserRepository) {
        this.btUserRepository = btUserRepository;
    }

    @Override
    public BtUser findByAccount(String account) {
        return btUserRepository.findByAccount(account);
    }


}
