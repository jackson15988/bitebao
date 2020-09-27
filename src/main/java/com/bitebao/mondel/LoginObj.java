package com.bitebao.mondel;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginObj {

    @NotEmpty(message = "请填入登入账号")
    private String account;

    @NotEmpty(message = "请填入登入密码")
    private String password;


}
