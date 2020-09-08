package com.bitebao.enums;


public enum ExceptionEnum {
    //header
    TERMINAL_ERROR("E001", "装置代码错误"),

    //Register
    ACCOUNT_INVALID("E101", "帐号长度必须介于6-20个字元，不得使用特殊字元，且需英数混合"),
    ACCOUNT_ALREADY_USED("E102", "账号名称已被使用"),
    PASSWORD_INVALID("E103", "密码长度必须介于6-20个字元，不得使用特殊字元"),
    PHONE_NUM_INVALID("E104", "不是有效的手机号"),
    PHONE_NUM_ALREADY_USED("E105", "手机已注册过账号"),
    PASSWORD_NOT_SAME("E106", "兩次密码不一样"),

    //OTP
    OTP_INCORRECT("E201", "验证码错误"),
    OPT_REQUIRE_ERROR("E202", "验证码获取错误"),
    OTP_INVALID("E203", "不是有效的验证码"),
    OTP_PHONE_NUM_RETRY_LOCKED("E211", "该手机号码已发送验证，请稍后再尝试"),

    //Login
    ACCOUNT_OR_PHONE_NUM_ERROR("E301", "帐号或手机号错误"),
    PASSWORD_ERROR("E302", "密码错误"),
    ACCOUNT_DISABLE("E399", "帐号未启用"),

    //打getNewToken Token 錯誤代碼
    TOKEN_INVALIDATE("E400", "权限不足，请登入后再尝试"),//權限不足: 需要有token驗證但沒有token
    TOKEN_ALREADY_LOGGED_IN_ON_ANOTHER_DEVICE("E401", "已被其他装置登入，请重新登入"),
    TOKEN_PSW_CHANGED("E402", "密码已变更，请重新登入"),
    TOKEN_DISABLE("E409", "此帐号已被停用，详情请联系客服"),
    //--------------ajaxError額外處理--------------↓↓↓
    //前端統一顯示錯誤為「请重新登入」
    TOKEN_FAKE("E421", "伪造的token"),
    TOKEN_STOLEN("E422", "token被窃取"),
    TOKEN_NOT_EXISTED("E441", "db查无此token"),
    TOKEN_REFRESH_EXPIRED("E498", "refreshToken过期"),
    //前端統一為「更改密码逾期，请重新尝试」
    TOKEN_FORGET_PSW_EXPIRED("E451", "forgetPswToken过期"),
    TOKEN_FORGET_PSW_ERROR("E452", "forgetPswToken无法解密"),
    //-----前端不顯示錯誤-----↓↓
    TOKEN_ACCESS_EXPIRED("E499", "accessToken过期"),//另外打API

    //----------------------↑↑
    //--------------------------------------------↑↑↑
    //MerchantToken
    MERCHANT_SIGN_ERROR("E511", "签名错误"),
    MERCHANT_DATA_ERROR("E512", "商户资料错误"),
    MERCHANT_DOMAIN_ERROR("E513", "商户网域错误"),
    MERCHANT_TOKEN_REQUIRED("E521", "请带入merchantToken"),
    MERCHANT_TOKEN_EXPIRED("E522", "merchantToken过期"),

    //Cache
    CACHE_NAME_ERROR("E801", "CacheName错误"),

    //System Config
    CONFIG_NOT_EXISTED("E901", "简讯相关配置有误，请联系客服"),
    VISITOR_NOT_ALLOW_RES("E902", "观看权限不足，请登入后再观看"),
    MEMBER_NOT_ALLOW_RES("E903", "观看权限不足，请提高会员等级后再观看"),


    //共用
    UNKNOWN_ERROR("-1", "系统忙碌中，请稍后再试");

    private String code;
    private String message;

    ExceptionEnum(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public String getCode() {
        return code;
    }

    public String getMessage() {
        return message;
    }
}
