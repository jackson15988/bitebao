package com.bitebao.entity;

import com.bitebao.entity.base.BaseEntity;
import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "bt_user")
public class BtUser extends BaseEntity {

    @Column(name = "ACCOUNT")
    private String account;

    @Column(name = "PHONE_NUMBER")
    private String phoneNumber;

    @Column(name = "AUTHENTICATION")
    private String authentication;

    @Column(name = "NIKE_NAME")
    private String nikeName;

}
