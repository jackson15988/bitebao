package com.bitebao.bo;

import com.bitebao.entity.BtUser;
import com.bitebao.enums.SystemLogEnums;
import lombok.extern.slf4j.Slf4j;

import javax.servlet.http.HttpServletRequest;
import java.util.logging.Logger;


@Slf4j
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
      /*       systemLogService.addSysLog(SystemLogEnums.userLogout, mvUser, mvUser.getUserName());*/
        } catch (Exception e) {
            /* logger.error(e.getMessage(), e);*/
        }
        return "success";
    }
}
