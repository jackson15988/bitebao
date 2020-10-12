package com.bitebao.entity;


import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.sql.In;

import javax.persistence.*;
import java.math.BigDecimal;

@Table(name = "BT_ROBOT_SETTING")
@Data
@Entity
public class BtRobot {





    @Column(name = "LOAN_CURRENCY")
    private String loanCurrency;


    @Column(name = "LOAN_PLATFORM")
    private String loanPlatform;

    @Column(name = "MINIMUM_INTERESTRATE")
    private Integer minimum_interestrate;


    @Column(name = "RESERVED_AMOUNT")
    private BigDecimal reserved_amount;


    @Column(name = "LOAN_PERIOD")
    private BigDecimal loan_period;



    @OneToOne
    @Id
    @JoinColumn(name = "BT_USER_ACCOUNT")
    private BtUser btUser;





}
