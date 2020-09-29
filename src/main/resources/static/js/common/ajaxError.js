$(function () {
    var withoutShowPopupUrls = [];
    $(document).ajaxError(function (event, jqxhr, settings, thrownError) {
        var url = settings.url;
        var errorData = jqxhr.responseJSON;
        if (!errorData && jqxhr.responseText) {
            errorData = JSON.parse(jqxhr.responseText);
        }
        var errorCode = errorData.code;
        if (errorData) {
            var isShowPopup = true;
            withoutShowPopupUrls.some(function (withoutShowPopupUrl) {
                if (url.indexOf(withoutShowPopupUrl) !== -1) {
                    isShowPopup = false;
                    return true;//若有找到則回傳true，終止迴圈
                }
            });
            if (isShowPopup) {
                swal({text: errorData.message, type: "error"}).then(function () {
                    if (errorCode === "U101") {
                        goLoginPage();
                    }
                });
                if (errorCode === "U101") {
                    setTimeout(function () {
                        goLoginPage();
                    }, 5000)
                }
            }
        }
    });
    var goLoginPage = function () {
        window.location.href = window.contextPath + '/login.html';
    };
});