var member = (function () {
    var stateMap = {//state是聲明的意思也是宣告的意思，會因為程式邏輯而改變的全域變數，且是共用的變數，請放在stateMap，
            pageAdData: null,
            nowPage: null
        }, init, initMemberInfo,
        //初始化統一命名init
        init = function () {
            initMemberInfo();
        };

    initMemberInfo = function () {
        let memberData = {
            account: 'qoooqoo884'
        };
        $.get("/rest/mvVideo/findGridVideoList", memberData, function (response) {
            let memberInfo = response.result;
            console.log('回傳資訊' + memberInfo);
        });

    };


    //需要開放成public的function寫在這，key是對外的名稱
    return {
        init: init
    }
})();