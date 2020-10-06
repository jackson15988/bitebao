package com.bitebao.entity;

import com.bitebao.entity.base.BaseEntity;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "BT_USER")
public class BtUser extends BaseEntity {

    @Column(name = "ACCOUNT")
    private String account;

    @Column(name = "PHONE_NUMBER")
    private String phoneNumber;

    @Column(name = "AUTHENTICATION")
    private String authentication;

    @Column(name = "NIKE_NAME")
    private String nikeName;

    //會員到期時間
    @Column(name = "MEMBER_EXPIRY_DATE", columnDefinition = "DATETIME")
    @Temporal(TemporalType.TIMESTAMP)
    private Date memberExpiryDate;

    //會員激活狀態
    @Column(name = "ACTIVATION_STATUS")
    private Integer activationStatus;

    @Column(name = "PASSWORD")
    private String password;

    @Column(name = "IS_ADMIN")
    private String isAdmin;

    @Column(name = "EMAIL")
    private String email;

}
