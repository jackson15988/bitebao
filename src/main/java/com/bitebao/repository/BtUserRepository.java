package com.bitebao.repository;

import com.bitebao.entity.BtUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BtUserRepository extends JpaRepository<BtUser, Integer> {

    BtUser findByAccount(String account);

}
