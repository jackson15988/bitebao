var passwordSetting = (function () {
    var configMap = {
        getMySelfUserDataApi: 'rest/user/getMySelfUserData',
        editApi: 'rest/user/updatePassword',
    }, stateMap = {}, jqueryMap = {
        $userName: $("#userName"),
        $checkoutForm: $("#checkout-form")
    }, init, getMySelfUserData, sendFormHandler;

    getMySelfUserData = function () {
        $.get(configMap.getMySelfUserDataApi, null).then(function (response) {
            if ("0" === response.code) {
                jqueryMap.$userName.val(response.result.userName);
            }
        });
    };

    sendFormHandler = function () {
        var postData = {
            oldPassword: jqueryMap.$checkoutForm.find("input[name='oldPassword']").val(),
            newPassword: jqueryMap.$checkoutForm.find("input[name='newPassword']").val(),
            repeatPassword: jqueryMap.$checkoutForm.find("input[name='repeatPassword']").val()
        };


        $.patch(configMap.editApi, postData).then(function (response) {
            if (response.code === "0") {
                swal({text: "修改成功", type: "success"});
                //修改成功清除输入过的值
                jqueryMap.$checkoutForm.find("input[name='oldPassword']").val("");
                jqueryMap.$checkoutForm.find("input[name='newPassword']").val("");
                jqueryMap.$checkoutForm.find("input[name='repeatPassword']").val("");
            } else {
                var errorText = "";
                if (response.message.indexOf("{") === -1) {
                    errorText = response.message;
                } else {
                    errorText = "资料格式有误，请检查输入资料";
                    mv.showErrorMsg(response, "checkout-form"); //依照回传的错误id来显示错误提示
                }
                swal({text: errorText, type: "error"});
            }
        });
    };

    init = function () {
        getMySelfUserData();
    };

    return {
        init: init,
        sendFormHandler: sendFormHandler
    }
})();