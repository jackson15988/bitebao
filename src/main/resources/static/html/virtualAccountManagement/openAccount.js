var openAccount = (function () {
    var configMap = {
            openAccountHtml:
                '<form id="editDialogForm" class="smart-form" autocomplete="off">' +
                '<fieldset>' +
                '<div class="row">' +
                '<section class="col-xs-12 col-sm-12 col-md-12 col-lg-10">' +
                '   <div class="input-group" id="bankAcctName">' +
                '       <span class="input-group-addon"><span style="color: red">＊</span>姓名</span>' +
                '       <input class="form-control" name="bankAcctName">' +
                '   </div></section></div>' +
                '<div class="row">' +
                '<section class="col-xs-12 col-sm-12 col-md-12 col-lg-10">' +
                '   <div class="input-group" id="mobile">' +
                '       <span class="input-group-addon"><span style="color: red">＊</span>手机号码</span>' +
                '       <input class="form-control" name="mobile">' +
                '   </div></section></div>' +
                '<div class="row">' +
                '<section class="col-xs-12 col-sm-12 col-md-12 col-lg-10">' +
                '   <div class="input-group" id="certNo">' +
                '       <span class="input-group-addon"><span style="color: red">＊</span>身份证号</span>' +
                '       <input class="form-control" name="certNo">' +
                '   </div></section></div>' +
                '<div class="row">' +
                '   <section class="col-xs-12 col-sm-12 col-md-12 col-lg-10">' +
                '       <div class="input-group">' +
                '           <span class="input-group-addon"><span style="color: red">＊</span>身份证正面</span>' +
                '           <input class="input-group" name="frontPhotoUpload" id="frontPhotoUpload" type="file" accept="image/*">' +
                '       </div>' +
                '       <div class="previewPhotoBlock">' +
                '       </div>' +
                '   </section>' +
                '</div>' +
                '<div class="row">' +
                '   <section class="col-xs-12 col-sm-12 col-md-12 col-lg-10">' +
                '       <div class="input-group">' +
                '           <span class="input-group-addon"><span style="color: red">＊</span>身份证背面</span>' +
                '           <input class="input-group" name="backPhotoUpload" id="backPhotoUpload" type="file" accept="image/*">' +
                '       </div>' +
                '       <div class="previewPhotoBlock">' +
                '       </div>' +
                '   </section>' +
                '</div>' +
                '</fieldset></form>',
            openAccountTitle: '手动开户',
            getShortMsgServiceCodeApi: 'rest/virtual/getShortMsgServiceCode'
        }, stateMap = {
            openAccountDialog:null
        }, jqueryMap = {
            $openAccountContent: $(configMap.openAccountHtml)
        }, init, onOpenAccountClick, onOpenAccountSubmitClick;

    //开启开户dialog
    onOpenAccountClick = function () {
        //清除放圖片位置的資料
        jqueryMap.$openAccountContent.find('.previewPhotoBlock').empty();
        jqueryMap.$openAccountContent.find("input").val("");

        var $frontPhotoUpload = jqueryMap.$openAccountContent.find("#frontPhotoUpload");
        var $backPhotoUpload = jqueryMap.$openAccountContent.find("#backPhotoUpload");

        $frontPhotoUpload.change(uploadPicEvent);
        $backPhotoUpload.change(uploadPicEvent);
        stateMap.openAccountDialog.open();
    };

    // 開戶資料送出
    onOpenAccountSubmitClick = function () {
        stateMap.openAccountDialog.close();
        var bankAcctName = jqueryMap.$openAccountContent.find("input[name='bankAcctName']").val();
        var certNo = jqueryMap.$openAccountContent.find("input[name='certNo']").val();
        var mobile = jqueryMap.$openAccountContent.find("input[name='mobile']").val();
        let formData = new FormData();
        formData.append("bankAcctName", bankAcctName);
        formData.append("certNo", certNo);
        formData.append("mobile", mobile);

        var frontPic = jqueryMap.$openAccountContent.find("input[name='frontPhotoUpload']").prop('files');
        var backPic = jqueryMap.$openAccountContent.find("input[name='backPhotoUpload']").prop('files');
        var frontPicSize = frontPic.length;
        var backPicSize = backPic.length;
        if (frontPicSize === 0 || backPicSize === 0) {
            return;
        }

        var backFileLoop;
        var frontFileLoop;

        for (let loopIndex = 0; loopIndex < frontPicSize; loopIndex++) {
            frontFileLoop = frontPic[loopIndex];
        }

        for (let loopIndex = 0; loopIndex < frontPicSize; loopIndex++) {
            backFileLoop = backPic[loopIndex];
        }

        let validExt = [".jpg", ".jpeg", ".png", ".gif"];
        let frontFileExt = frontFileLoop.name;
        let backFileExt = backFileLoop.name;
        frontFileExt = frontFileExt.substring(frontFileExt.lastIndexOf('.'));
        backFileExt = backFileExt.substring(backFileExt.lastIndexOf('.'));

        if (validExt.indexOf(frontFileExt) < 0) {
            swal({text: "图片文件格式错误，可接受的格式有：" + frontFileExt.toString(), type: "error"});
            return false;
        } else { //图片格式确认没问题才放入formData
            formData.append("frontPhotoFile", frontFileLoop);
        }

        if (validExt.indexOf(backFileExt) < 0) {
            swal({text: "图片文件格式错误，可接受的格式有：" + backFileExt.toString(), type: "error"});
            return false;
        } else { //图片格式确认没问题才放入formData
            formData.append("backPhotoFile", backFileLoop);
        }

        $.ajax({
            type: "POST",
            enctype: 'multipart/form-data',
            url: configMap.getShortMsgServiceCodeApi,
            data: formData,
            processData: false,
            contentType: false,
            cache: false,
            async: false,
            headers: {'terminal': '3'},
            success: function (resp) {
                console.log('接到验证码回传resp: ');
                console.log(resp);
            }
        });

    };

    //启动此JS
    init = function () {
        stateMap.openAccountDialog = new dialog({
            title: configMap.openAccountTitle,
            width: 600,
            height: 650
        }, {
            content: jqueryMap.$openAccountContent, submitHandler: onOpenAccountSubmitClick
        });
    };

    //此JS可呼叫的方法
    return {
        init: init,
        onOpenAccountClick: onOpenAccountClick
    }
})();