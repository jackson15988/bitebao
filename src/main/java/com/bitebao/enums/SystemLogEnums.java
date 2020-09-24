package com.bitebao.enums;

import java.util.stream.IntStream;

/**
 * 定義系統日誌操作事件
 * <p>
 * copy from dsbAdmin
 */
public enum SystemLogEnums {
    addUser("1", "新增管理员：%s"),
    updateUser("2", "%s"),
    deleteUser("3", "删除管理员：%s"),
    userLogin("4", "管理员 %s 登入"),
    userLogout("5", "管理员 %s 登出"),
    userToLogout("6", "强制登出管理员：%s"),
    passwordError("7", "%s"),
    googleVerify("8", "%s"),
    systemConfigModify("9", "%s"),
    ROLE_MODIFY("10", "%s"),
    FRONT_USER_MODIFY("11", "%s"),
    addSuperUser("12", "新增超级管理员：%s"),
    deleteSuperUser("13", "删除超级管理员：%s"),
    addBank("14", "新增银行：%s"),
    updateBank("15", "更新银行：%s"),
    deleteBank("16", "删除银行：%s"),
    other("20", "%s");


    private final String kind;
    private final String msg;

    private SystemLogEnums(String kind, String msg) {
        this.kind = kind;
        this.msg = msg;
    }

    public String getKind() {
        return kind;
    }

    public String getMsg(String... replacements) {
        int num = getNumOfWordsToReplace();
        String message = null;

        try {
            if (replacements.length == 0) {
                Object[] emptyStrArray = IntStream.range(0, num).boxed().map(i -> " ")
                        .toArray(size -> new Object[size]);
                message = String.format(msg, emptyStrArray);
            } else {
                message = String.format(msg, replacements);
            }
        } catch (Exception e) {
            message = msg;
        }

        return message;
    }

    private int getNumOfWordsToReplace() {
        int cnt = 0;
        int index = msg.indexOf("%s");
        while (index != -1) {
            cnt++;
            index = msg.indexOf("%s", index + 1);
        }

        return cnt;
    }

}
