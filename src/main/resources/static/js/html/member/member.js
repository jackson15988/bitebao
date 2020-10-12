var member = (function () {
    var stateMap = {//state是聲明的意思也是宣告的意思，會因為程式邏輯而改變的全域變數，且是共用的變數，請放在stateMap，
            pageAdData: null,
            nowPage: null
        }, init, initMemberInfo, editMemberInfo,
        //初始化統一命名init
        init = function () {
            console.log('執行');
            initMemberInfo();


            //註冊 id 事件 ....
            $("#memberSubmit").on('click', editMemberInfo);

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



    editMemberInfo = function () {
        let params = $('#memberProfileForm').serialize();
  /*      console.log('發送出的 的 序列化' + params);
        $.post("/bitebao/admin/user/editMember", params, function (response) {
            let memberInfo = response.result;
            console.log('編輯會員資料');

        });
*/
        var formData = new FormData($("#memberProfileForm-add")[0]);
        $.ajax({
            //介面地址
            url: '/bitebao/admin/user/editMember' ,
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                //成功的回撥
                if(data.code == 300){

                }

            },
            error: function (returndata) {
                //請求異常的回撥
                // modals.warn("網路訪問失敗，請稍後重試!");
            }
        });
    };


    //需要開放成public的function寫在這，key是對外的名稱
    return {
        init: init,
        editMemberInfo: editMemberInfo
    }
})();