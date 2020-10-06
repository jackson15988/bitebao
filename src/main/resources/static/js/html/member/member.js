var member = (function () {
    var stateMap = {//state是聲明的意思也是宣告的意思，會因為程式邏輯而改變的全域變數，且是共用的變數，請放在stateMap，
            pageAdData: null,
            nowPage: null
        }, init, initMemberInfo,
        //初始化統一命名init
        init = function () {
        console.log('執行');
            initMemberInfo();
        };

    initMemberInfo = function () {
        let userData = indexJs.getUserInfo();
        let memberData = {
            account: userData.account,
        };
        $.get("/bitebao/admin/user/findUserInfoByAccount", memberData, function (response) {
            let memberInfo = response.result;
            $("#memberProfileForm").find("#account").val(memberInfo.account);
            $("#memberProfileForm").find('#nikeName').val(memberInfo.nikeName);
            $("#memberProfileForm").find('#email').val(memberInfo.email);
            console.log('回傳資訊' + memberInfo);
        });

    };

    //需要開放成public的function寫在這，key是對外的名稱
    return {
        init: init
    }
})();