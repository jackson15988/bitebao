package com.bitebao.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LogUtils {

    /*
        -沒特別需求的話，在欲使用log的class上宣告@Slf4j，該class內就可以用log.info("");
        ex: MvSuperUserController
        -有特別需求的話，在LogUtils新增變數如下
            public static Logger testLog = LoggerFactory.getLogger("testLog");
            並在欲使用log的class新增變數如下
            private Logger logger = LogUtils.testLog;
            #除非該class的method都是static，不然不用static
        ex: WebServerSessionManager
    */

    public static Logger myVideoCenterLog = LoggerFactory.getLogger("myVideoCenter");

    public static Logger transLog = LoggerFactory.getLogger("myVideoCenter");

    public static Logger systemLog = LoggerFactory.getLogger("systemLog");

    public static Logger exceptionLog = LoggerFactory.getLogger("exceptionLog");

    public static Logger superUserLog = LoggerFactory.getLogger("superUserLog");

    public static Logger socketLog = LoggerFactory.getLogger("socketLog");

    public static Logger userOnline = LoggerFactory.getLogger("userOnline");

    public static Logger excel = LoggerFactory.getLogger("excel");

}
