package com.bitebao.bo;

import com.bitebao.entity.BtUser;

import javax.servlet.http.HttpServletRequest;
import java.util.logging.Logger;

public class UserBo {


    /**
     * 登出機制的註銷邏輯
     *
     * @param request
     * @return
     */
    public static String doLogOut(HttpServletRequest request) {
        BtUser btUser = (BtUser) request.getSession().getAttribute("userSession");
        request.getSession().invalidate();
        try {
            //登出日誌的機制
            /* systemLogService.addSysLog(SystemLogEnums.userLogout, mvUser, mvUser.getUserName());*/
        } catch (Exception e) {
            /* logger.error(e.getMessage(), e);*/
        }
        return "success";
    }
}
