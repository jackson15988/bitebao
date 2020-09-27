var login = (function () {
    var stateMap = {//state是聲明的意思也是宣告的意思，會因為程式邏輯而改變的全域變數，且是共用的變數，請放在stateMap，
        pageAdData: null,
        nowPage: null
    }, init, findCarouseAdlList, findPageAdlList, onScrollToBottom;
    //初始化統一命名init
    init = function () {


      /*  $("#login").click(function () {
            $.ajax({
                type: "POST",      //提交的方法
                url: "/admin/user/doLogin", //提交的地址
                data: $('#loginForm').serialize(), //序列化表單值輸出
                async: false,
                error: function (request) {  //失敗的話
                    console.log('提交失敗 error');
                },
                success: function (data) {  //成功
                    console.log('返回:' + data);
                }
            });
        });*/

    };


    //需要開放成public的function寫在這，key是對外的名稱
    return {
        init: init
    }
})();