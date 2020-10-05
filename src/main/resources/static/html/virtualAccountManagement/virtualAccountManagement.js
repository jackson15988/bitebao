var virtualAccountManagement = (function () {
    var configMap = {
            caption_html:
                '<div>' +
                '   <div style="margin:0%auto;width:200px;float:left;position:relative;">' +
                '       <label class="input"></label>' +
                '   </div>' +
                '   <div style="margin: 0% auto ; width: 200px;  float:left;position:relative; left:35%">' +
                '       <button class="btn btn-primary" id="queryForm" onclick="virtualAccountManagement.queryData(true)">查询</button>' +
                '       <button class="btn btn-danger" id="clearForm" onclick="virtualAccountManagement.clearQueryData()">清除</button>' +
                '   </div>' +
                '   <div style="margin: 0% 20px 0% 0%;float:right">' +
                // '       <button class="btn btn-primary" type="button" id="openAccount" onclick="openAccount.onOpenAccountClick(this)">开户</button>' +
                '       <button class="btn btn-primary" type="button" id="doSynchronizeAllAction" onclick="virtualAccountManagement.onAllSynchronizeSubmitClick()">同步所有虛戶</button>' +
                '       <button class="btn btn-primary" type="button" id="doAddAction" onclick="virtualAccountManagement.onAddClick(this)">新增</button>' +
                '       <button class="btn btn-primary" type="button" id="excelUpload" onclick="virtualAccountManagement.excelUploadClick(this)">EXCEL上传</button>' +
                '   </div>' +
                '</div>',
            addHtml:
                '<form id="addDialogForm" class="smart-form" autocomplete="off">' +
                '<fieldset>' +
                '<div class="row">' +
                '<section class="col-xs-12 col-sm-12 col-md-12 col-lg-10">' +
                '   <div class="input-group" id="merchantNo">' +
                '       <span class="input-group-addon"><span style="color: red">＊</span>商户号</span>' +
                '       <input class="form-control" name="merchantNo" type="text"  autocomplete="off" maxlength="20">' +
                '   </div></section></div>' +
                '<div class="row">' +
                '<section class="col-xs-12 col-sm-12 col-md-12 col-lg-10">' +
                '   <div class="input-group" id="merchantName">' +
                '       <span class="input-group-addon">商户名称</span>' +
                '       <input class="form-control" name="merchantName" type="text"  autocomplete="off" maxlength="20">' +
                '   </div></section></div>' +
                '<div class="row">' +
                '<section class="col-xs-12 col-sm-12 col-md-12 col-lg-10">' +
                '   <div class="input-group" id="md5Key">' +
                '       <span class="input-group-addon"><span style="color: red">＊</span>商户密钥</span>' +
                '       <input class="form-control" name="md5Key" type="text"  autocomplete="off" >' +
                '   </div>' +
                '</section>' +
                '</div>' +
                '<div class="row">' +
                '<section class="col-xs-12 col-sm-12 col-md-12 col-lg-10">' +
                '   <div class="input-group" id="apiPassword">' +
                '       <span class="input-group-addon"><span style="color: red">＊</span>交易密码</span>' +
                '       <input class="form-control" type="password"  autocomplete="off" maxlength="20" name="apiPassword">' +
                '   </div>' +
                '</section>' +
                '</div>' +
                '<div class="row">' +
                '<section class="col-xs-12 col-sm-12 col-md-12 col-lg-10">' +
                '   <div class="input-group" id="bankName">' +
                '       <span class="input-group-addon">虚户银行</span>' +
                '       <input class="form-control" name="bankName" type="text"  autocomplete="off" maxlength="50">' +
                '   </div></section></div>' +
                '<div class="row">' +
                '<section class="col-xs-12 col-sm-12 col-md-12 col-lg-10">' +
                '   <div class="input-group" id="userName">' +
                '       <span class="input-group-addon">虚户户名</span>' +
                '       <input class="form-control" name="userName" type="text"  autocomplete="off" maxlength="50">' +
                '   </div></section></div>' +
                '<div class="row">' +
                '<section class="col-xs-12 col-sm-12 col-md-12 col-lg-10">' +
                '   <div class="input-group" id="accountStatus">' +
                '       <span class="input-group-addon">虚户状态</span>' +
                '       <label class="form-check-label">' +
                '       <input class="form-check-input" type="radio" name="accountStatus" id="accountStatus1" checked>启用</label>' +
                '       <label class="form-check-label">' +
                '       <input class="form-check-input" type="radio" name="accountStatus" id="accountStatus2" >停用</label>' +
                '   </div></section></div>' +
                '<div class="row">' +
                '<section class="col-xs-12 col-sm-12 col-md-12 col-lg-10">' +
                '   <div class="input-group" id="accountType">' +
                '       <span class="input-group-addon">虚户类型</span>' +
                '       <label class="form-check-label">' +
                '       <input class="form-check-input" type="radio" name="accountType" id="accountType0" checked>收款</label>' +
                '       <label class="form-check-label" for="accountType1">' +
                '       <input class="form-check-input" type="radio" name="accountType" id="accountType1" >代付</label>' +
                '   </div></section></div>' +
                '<div class="row">' +
                '<section class="col-xs-12 col-sm-12 col-md-12 col-lg-10">' +
                '   <div class="input-group" id="assignedMerchantId">' +
                '       <span class="input-group-addon">分配商户ID</span>' +
                '       <input class="form-control" name="assignedMerchantId" type="text"  autocomplete="off" maxlength="50">' +
                '   </div></section></div>' +
                '<div class="row">' +
                '<section class="col-xs-12 col-sm-12 col-md-12 col-lg-10">' +
                '   <div class="input-group" id="note">' +
                '       <span class="input-group-addon">备注</span>' +
                '       <input class="form-control" name="note" type="text"  autocomplete="off" maxlength="255">' +
                '   </div></section></div>' +
                '</fieldset></form>',
            editHtml:
                '<form id="editDialogForm" class="smart-form" autocomplete="off">' +
                '<fieldset>' +
                '<div class="row">' +
                '<section class="col-xs-12 col-sm-12 col-md-12 col-lg-10">' +
                '   <div class="input-group" id="merchantNo">' +
                '       <span class="input-group-addon"><span style="color: red">＊</span>商户号</span>' +
                '       <input class="form-control" name="merchantNo" type="text"  autocomplete="off" maxlength="20">' +
                '   </div></section></div>' +
                '<div class="row">' +
                '<section class="col-xs-12 col-sm-12 col-md-12 col-lg-10">' +
                '   <div class="input-group" id="merchantName">' +
                '       <span class="input-group-addon">商户名称</span>' +
                '       <input class="form-control" name="merchantName" type="text"  autocomplete="off" maxlength="20">' +
                '   </div>' +
                '</section>' +
                '</div>' +
                '<div class="row">' +
                '<section class="col-xs-12 col-sm-12 col-md-12 col-lg-10">' +
                '   <div class="input-group" id="md5Key">' +
                '       <span class="input-group-addon"><span style="color: red">＊</span>商户密钥</span>' +
                '       <input class="form-control" name="md5Key" type="text"  placeholder="不改变留空白" autocomplete="off" >' +
                '   </div>' +
                '</section>' +
                '</div>' +
                '<div class="row">' +
                '<section class="col-xs-12 col-sm-12 col-md-12 col-lg-10">' +
                '   <div class="input-group" id="apiPassword">' +
                '       <span class="input-group-addon"><span style="color: red">＊</span>交易密码</span>' +
                '       <input class="form-control" type="password" placeholder="不改变留空白"  autocomplete="off"  maxlength="20" name="apiPassword">' +
                '   </div>' +
                '</section>' +
                '</div>' +
                '<div class="row">' +
                '<section class="col-xs-12 col-sm-12 col-md-12 col-lg-10">' +
                '   <div class="input-group" id="bankName">' +
                '       <span class="input-group-addon">虚户银行</span>' +
                '       <input class="form-control" name="bankName" type="text"  autocomplete="off" maxlength="50">' +
                '   </div></section></div>' +
                '<div class="row">' +
                '<section class="col-xs-12 col-sm-12 col-md-12 col-lg-10">' +
                '   <div class="input-group" id="userName">' +
                '       <span class="input-group-addon">虚户户名</span>' +
                '       <input class="form-control" name="userName" type="text"  autocomplete="off" maxlength="50">' +
                '   </div></section></div>' +
                '<div class="row">' +
                '<section class="col-xs-12 col-sm-12 col-md-12 col-lg-10">' +
                '   <div class="input-group" id="accountStatus">' +
                '       <span class="input-group-addon">虚户状态</span>' +
                '       <label class="form-check-label">' +
                '       <input class="form-check-input" type="radio" name="accountStatus" id="accountStatus1" value="启用" >启用</label>' +
                '       <label class="form-check-label">' +
                '       <input class="form-check-input" type="radio" name="accountStatus" id="accountStatus2" value="停用">停用</label>' +
                '   </div></section></div>' +
                '<div class="row">' +
                '<section class="col-xs-12 col-sm-12 col-md-12 col-lg-10">' +
                '   <div class="input-group" id="accountType">' +
                '       <span class="input-group-addon">虚户类型</span>' +
                '       <label class="form-check-label">' +
                '       <input class="form-check-input" type="radio" name="accountType" id="accountType0" value="收款" >收款</label>' +
                '       <label class="form-check-label">' +
                '       <input class="form-check-input" type="radio" name="accountType" id="accountType1" value="代付">代付</label>' +
                '   </div></section></div>' +
                '<div class="row">' +
                '<section class="col-xs-12 col-sm-12 col-md-12 col-lg-10">' +
                '   <div class="input-group" id="assignedMerchantId">' +
                '       <span class="input-group-addon">分配商户ID</span>' +
                '       <input class="form-control" name="assignedMerchantId" type="text"  autocomplete="off" maxlength="50">' +
                '   </div></section></div>' +
                '<div class="row">' +
                '<section class="col-xs-12 col-sm-12 col-md-12 col-lg-10">' +
                '   <div class="input-group" id="note">' +
                '       <span class="input-group-addon">备注</span>' +
                '       <input class="form-control" name="note" type="text"  autocomplete="off" maxlength="255">' +
                '   </div></section></div>' +
                '</fieldset></form>',
            deleteHtml:
                '<div class="form-row">' +
                '   <div class="input-group">' +
                '       <span>即将删除虚户:<br>' +
                '           <span id="deleteCardNo"></span>' +
                '           (<span id="deleteUserName"></span>)' +
                '           ，將會一併刪除交易紀錄' +
                '       </span>' +
                '   </div>' +
                '   <div class="input-group" id="message"></div></div>',
            transferHtml:
                '<div class="form-row">' +
                '   <div style="color: red; text-align: center;margin-top: 10px;">' +
                '       <span class="noticeMessage"></span>' +
                '   </div>' +
                '   <div class="input-group">' +
                '       <span class="input-group-addon"><span style="color: red">＊</span>转账金额</span>' +
                '       <input placeholder="只取到小数点第2位" type="text" maxlength="12" class="form-control" name="amount" onkeyup="value=value.replace(/[^\\d^\\.]+/g,\'\')" >' +
                '   </div>' +
                '<div class="form-row">' +
                '   <div class="input-group">' +
                '       <span class="input-group-addon"><span style="color: red">＊</span>付款虚户号</span>' +
                '       <input type="text" maxlength="12" class="form-control" name="payExAcctNo" disabled>' +
                '   </div>' +
                '   <div class="input-group reCvExSelectContainer">' +
                '       <span class="input-group-addon"><span style="color: red">＊</span>收款虚户号</span>' +
                '   </div>' +
                '</div>',
            excelUploadHtml:
                '<div class="form-row">' +
                '<form enctype="multipart/form-data" id="upForm">' +
                '<section class="col-xs-12 col-sm-12 col-md-12 col-lg-10">' +
                ' <div class="input-group">' +
                '       <input type="file" name="file" id="file"/></div>' +
                '       <div class="input-group"><a href="./rest/virtual/downloadExcelExample" download>批量上传EXCEL范例下载</a>' +
                '</div></section></form>' +
                '</div>',
            checkboxHtml: "<input type='checkbox'>",
            optionHtml: '<option></option>',
            captionText: '虚户管理',
            addDialogTitle: '新增虚户',
            editDialogTitle: '编辑虚户',
            deleteDialogTitle: '删除虚户',
            synchronizeTitle: '同步虚户',
            transferTitle: '虚户转帐',
            allSynchronizeTitle: '同步所有虚户余额',
            uploadDialogTitle: '批量上传',
            formQueryApi: 'rest/virtual/doQueryAction',
            addApi: 'rest/virtual/addVirtualAccount',
            editApi: 'rest/virtual/updateVirtualAccount',
            deleteApi: 'rest/virtual/deleteVirtualAccountById/',
            getAllVirtualAccountStatusApi: 'rest/virtual/getAllVirtualAccountStatus',
            uploadApi: 'rest/virtual/batchUpdateVirtualAccount',
            syncVirtualAccountApi: 'rest/virtual/syncVirtualAccount',
            findAllAccountApi: 'rest/virtual/findAllVirtualAccountForSelect2',
            findAllEnableVirtualAccountApi: 'rest/virtual/findAllEnableVirtualAccountForSelect2',
            transferApi: 'rest/transfer/transfers',
            getFlashGridTimeApi: 'rest/systemConfig/findFlashGridTime',
            synchronizeAllRecordApi: 'rest/transactionRecord/synchronizeTransactionRecord',
            getShortMsgServiceCodeApi: 'rest/virtual/getShortMsgServiceCode',
            getTransactionAccountTypeApi: 'rest/transactionRecord/findTransactionAccountType'
        }, stateMap = {
            addDialog: null,
            editDialog: null,
            deleteDialog: null,
            upLoadDialog: null,
            transferDialog: null,
            queryVirtualAccountSelect2: null,
            transferDialogReExSelect2: null,
            jqGridOption: {}
        }, jqueryMap = {
            $jqGrid: $("#jqgrid"),
            $statusSelect: $("#statusSelect"),
            $editContent: $(configMap.editHtml),
            $addContent: $(configMap.addHtml),
            $deleteContent: $(configMap.deleteHtml),
            $transferContent: $(configMap.transferHtml),
            $uploadContent: $(configMap.excelUploadHtml),
            $form: $('#form'),
            $flashGridTime: $("#flashGridTime"),
            $accountTypeSelect: $("#accountTypeSelect")
        }, init, initJqGrid, getCaption, onAddClick, onEditClick, onDeleteClick, onEditSubmitClick,
        onAddSubmitClick,
        onDeleteSubmitClick, onSynchronizeSubmitClick, onAllSynchronizeSubmitClick, onTransferSubmitClick,
        addQueryTopEvent, queryData,
        clearQueryData, initDateTimePicker,
        initAccountStatusSelect, getAllVirtualAccount, initVirtualAccountSelect2, onUploadSubmitClick,
        onTransferClick, changeFlashGridTime, getAllEnableVirtualAccount, initEnableVirtualAccountSelect2,
        onHrefThisAccountTransRecordClick, initVirtualAccountTypeOption, excelUploadClick;

    //新增按下确认送出资料
    onAddSubmitClick = function () {
        mv.cleanErrorMsg(); //送出时清除错误提示
        var postData =
            {
                merchantNo: jqueryMap.$addContent.find("input[name='merchantNo']").val(),
                merchantName: jqueryMap.$addContent.find("input[name='merchantName']").val(),
                md5Key: jqueryMap.$addContent.find("input[name='md5Key']").val(),
                bankName: jqueryMap.$addContent.find("input[name='bankName']").val(),
                userName: jqueryMap.$addContent.find("input[name='userName']").val(),
                balance: jqueryMap.$addContent.find("input[name='balance']").val(),
                apiPassword: jqueryMap.$addContent.find("input[name='apiPassword']").val(),
                accountStatus: jqueryMap.$addContent.find("input[name='accountStatus']:checked").val(),
                accountType: jqueryMap.$addContent.find("input[name='accountType']:checked").val(),
                note: jqueryMap.$addContent.find("input[name='note']").val(),
                assignedMerchantId: jqueryMap.$addContent.find("input[name='assignedMerchantId']").val()
            };
        $.post(configMap.addApi, postData).then(function (response) {
            if (response.code === "0") {
                stateMap.addDialog.close();
                queryData(true);
                swal({text: "新增成功", type: "success"});
            } else {
                var errorText = "";
                if ("该虚户已存在" === response.message) {
                    errorText = "该虚户已存在";
                } else {
                    errorText = "资料格式有误，请检查输入资料";
                }
                mv.showErrorMsg(response); //依照回传的错误id来显示错误提示
            }
        });
    };

    //编辑按下确认送出资料
    onEditSubmitClick = function () {
        mv.cleanErrorMsg("editDialogForm"); //送出时清除错误提示
        var id = jqueryMap.$editContent.data("rowData").id;
        var cardNo = jqueryMap.$editContent.data("rowData").cardNo;;
        var postData =
            {
                id: id,
                merchantNo: jqueryMap.$editContent.find("input[name='merchantNo']").val(),
                merchantName: jqueryMap.$editContent.find("input[name='merchantName']").val(),
                cardNo: cardNo,
                bankName: jqueryMap.$editContent.find("input[name='bankName']").val(),
                md5Key: jqueryMap.$editContent.find("input[name='md5Key']").val(),
                userName: jqueryMap.$editContent.find("input[name='userName']").val(),
                balance: jqueryMap.$editContent.find("input[name='balance']").val(),
                apiPassword: jqueryMap.$editContent.find("input[name='apiPassword']").val(),
                accountStatus: jqueryMap.$editContent.find("input[name='accountStatus']:checked").val(),
                accountType: jqueryMap.$editContent.find("input[name='accountType']:checked").val(),
                note: jqueryMap.$editContent.find("input[name='note']").val(),
                assignedMerchantId: jqueryMap.$editContent.find("input[name='assignedMerchantId']").val()
            };

        $.patch(configMap.editApi, postData).then(function (response) {
            if (response.code === "0") {
                stateMap.editDialog.close();
                queryData();
                swal({text: "修改成功", type: "success"});
            } else {
                mv.showErrorMsg(response, "editDialogForm"); //依照回传的错误id来显示错误提示
            }
        });
    };

    //删除按下确认送出资料
    onDeleteSubmitClick = function () {
        var rowData = jqueryMap.$deleteContent.data("rowData");
        $.delete(configMap.deleteApi + rowData.id).then(function (response) {
            if (response.code === "0") {
                stateMap.deleteDialog.close();
                queryData();
                swal({text: "删除成功", type: "success"});
            } else {
                var errorText = "";
                if ("虚户不存在" === response.message) {
                    errorText = "虚户不存在";
                } else {
                    errorText = response.message;
                }
                swal({text: errorText, type: "error"});
            }

            //重新设定查询与转账的虚户select2
            $(".virtualAccountSelect2Container .select2").remove();
            getAllVirtualAccount().then(initVirtualAccountSelect2);
        });
    };

    excelUploadClick = function () {
        mv.cleanErrorMsg(); //展开新增dialog要清除错误提示
        $("#file").val(null);
        stateMap.uploadDialog.open();
    };

    onUploadSubmitClick = function () {
        console.log('开始上传');
        var form = new FormData();
        form.append("file", document.getElementById("file").files[0]);
        $.ajax({
            url: configMap.uploadApi,
            type: 'POST',
            data: form,
            contentType: false,
            processData: false,
            success: function (data) {
                if (data.code == 0) {
                    if (Object.prototype.isPrototypeOf(data.result) && Object.keys(data.result).length === 0) {
                        stateMap.uploadDialog.close();
                        queryData(true);
                        swal({text: "新增成功", type: "success"});
                    } else {
                        stateMap.uploadDialog.close();
                        queryData(true);
                        let $div = $("<div></div>")
                        $.each(data.result, function (k, v) {
                            $div.append("<div class='resultData'>此次新增发生已存有资料位于Excel:" + v + "列，商户号:" + k + "</div>");
                        });
                        swal({
                            text: '',
                            type: 'warning',
                            onOpen: function (e) {
                                $(e).find(".swal2-image").after($div);
                            },
                            onClose: function (e) {
                                $div.remove();
                            },
                        })
                    }
                    //移除原先已經的select2模組
                    $(".virtualAccountSelect2Container .select2").remove();
                    getAllVirtualAccount().then(initVirtualAccountSelect2);
                    //设定查询的虚户select2(不分状态抓所有的虚户)
                }
            }
        })
    };

    //开启新增dialog
    onAddClick = function () {
        mv.cleanErrorMsg(); //展开新增dialog要清除错误提示
        jqueryMap.$addContent.find("input").val("");
        jqueryMap.$addContent.find('#accountStatus1').attr("value", "启用");
        jqueryMap.$addContent.find("input[name='accountStatus'][value='启用']").prop("checked", true);
        jqueryMap.$addContent.find('#accountStatus2').attr("value", "停用");
        jqueryMap.$addContent.find('#accountType0').attr("value", "收款");
        jqueryMap.$addContent.find("input[name='accountType'][value='收款']").prop("checked", true);
        jqueryMap.$addContent.find('#accountType1').attr("value", "代付");
        stateMap.addDialog.open();
    };

    //开启编辑dialog
    onEditClick = function (id) {
        mv.cleanErrorMsg("editDialogForm"); //展开编辑dialog要清除错误提示
        var rowData = jqueryMap.$jqGrid.jqGrid('getRowData', id);
        jqueryMap.$editContent.data("rowData", rowData);
        jqueryMap.$editContent.find("input[name='merchantNo']").val(rowData.merchantNo);
        jqueryMap.$editContent.find("input[name='merchantName']").val(rowData.merchantName);
        jqueryMap.$editContent.find("input[name='bankName']").val(rowData.bankName);
        jqueryMap.$editContent.find("input[name='md5Key']").val(rowData.md5Key);
        jqueryMap.$editContent.find("input[name='userName']").val(rowData.userName);
        jqueryMap.$editContent.find("input[name='balance']").val(rowData.balance);
        jqueryMap.$editContent.find("input[name='note']").val(rowData.note);
        jqueryMap.$editContent.find("input[name='assignedMerchantId']").val(rowData.assignedMerchantId);
        if ("启用" === rowData.accountStatus) {
            jqueryMap.$editContent.find("input[name='accountStatus'][value='启用']").prop("checked", true);
        } else {
            jqueryMap.$editContent.find("input[name='accountStatus'][value='停用']").prop("checked", true);
        }
        if ("收款" === rowData.accountType) {
            jqueryMap.$editContent.find("input[name='accountType'][value='收款']").prop("checked", true);
        } else {
            jqueryMap.$editContent.find("input[name='accountType'][value='代付']").prop("checked", true);
        }

        stateMap.editDialog.open();
    };

    //开启删除dialog
    onDeleteClick = function (id) {
        var rowData = jqueryMap.$jqGrid.jqGrid('getRowData', id);
        jqueryMap.$deleteContent.data("rowData", rowData);
        var $message = jqueryMap.$deleteContent.find("#message");
        $message.html("");
        jqueryMap.$deleteContent.find("#deleteCardNo").html(rowData.cardNo);
        jqueryMap.$deleteContent.find("#deleteUserName").html(rowData.merchantName);
        stateMap.deleteDialog.open();
    };

    //开启转账dialog
    onTransferClick = function (id) {
        jqueryMap.$transferContent.find(".reCvExSelectContainer .select2").remove(); //每次开启前皆清除转账的select2
        getAllEnableVirtualAccount().then(initEnableVirtualAccountSelect2); //设定转账的虚户select2(只抓启用的虚户)
        jqueryMap.$transferContent.find("input").val('');
        let rowData = jqueryMap.$jqGrid.jqGrid('getRowData', id);
        jqueryMap.$transferContent.data("rowData", rowData);
        let accountText = rowData.cardNo + "(" + rowData.merchantName + ")";
        jqueryMap.$transferContent.find("input[name='payExAcctNo']").val(accountText);
        jqueryMap.$transferContent.find(".noticeMessage").text("付款虚户号：" + accountText + "，目前余额：" + rowData.balance + "元");
        if ("启用" === rowData.accountStatus) {
            stateMap.transferDialog.open();
        } else {
            swal({text: "账号状态非启用，无法转账", type: "warning"});
        }
    };

    uploadPicEvent = function () {
        var imgTag = new Image();
        imgTag.setAttribute('width', 200);
        imgTag.setAttribute('id', 'photoFrontPreview');
        var photo = $(this)[0].files[0];
        var reader = new FileReader;
        reader.onload = function (e) {
            imgTag.setAttribute('src', e.target.result);
        };
        reader.readAsDataURL(photo);
        $(this).parent().parent().find('.previewPhotoBlock').empty();
        $(this).parent().parent().find('.previewPhotoBlock').append(imgTag);
    };

    addQueryTopEvent = function () {
        licoSetting.onClearForm();
    };

    getCaption = function () {
        var $caption = $(configMap.caption_html);
        $caption.find("label.input").html(configMap.captionText);
        return $caption[0].outerHTML;
    };

    //生成jqGrid表格
    initJqGrid = function () {
        var disableAccounts = [];
        stateMap.jqGridOption = {
            columnNames: ['ID', '商户号', '商户名称', '分配商户ID', '虚户类型', '虚户银行', '虚户户名', '虚户帐号', '虚户状态', '虚户余额', '余额更新时间', '最后同步交易时间', '建立日期', '备注', '操作'],
            columnModel: [
                {
                    name: "id", index: "id", hidden: true
                },
                {
                    name: "merchantNo", index: "merchantNo", width: 12, sortable: true, align: 'center'
                },
                {
                    name: "merchantName", index: "merchantName", width: 12, sortable: true, align: 'center'
                },
                {
                    name: "assignedMerchantId", index: "assignedMerchantId", width: 12, sortable: true, align: 'center'
                },
                {
                    name: "accountType", index: "accountType", width: 8, sortable: true, align: 'center'
                },
                {
                    name: "bankName", index: "bankName", width: 10, sortable: true, align: 'center'
                },
                {
                    name: "userName", index: "userName", width: 10, sortable: true, align: 'center', hidden: true
                },
                {
                    name: "cardNo", index: "cardNo", width: 15, sortable: true, align: 'center'
                },
                {
                    name: "accountStatus",
                    index: "accountStatus",
                    width: 8,
                    sortable: true,
                    align: 'center',
                    hidden: true,
                    formatter: function (cellValue, options, rowObject) {
                        if (cellValue === "停用") {
                            disableAccounts.push(options.rowId);
                        }
                        return cellValue;
                    }
                },
                {
                    name: "balance", index: "balance", width: 6, sortable: true, align: 'center'
                },
                {
                    name: "updateBalanceDate", index: "updateBalanceDate", width: 12, sortable: true, align: 'center'
                },
                {
                    name: "synchronizeDate", index: "synchronizeDate", width: 12, sortable: true, align: 'center'
                },
                {
                    name: "createDate", index: "createDate", width: 12, sortable: true, align: 'center', hidden: true
                },
                {
                    name: "note", index: "note", width: 12, sortable: true, align: 'center', hidden: true
                },
                {
                    name: 'operation',
                    index: 'operation',
                    sortable: false,
                    title: false,
                    align: 'center',
                    classes: 'white-space-no',
                    width: 30,
                    formatter: function (cellValue, options, rowObject) {
                        var id = options.rowId;
                        return "<button class='btn btn-sm btn-primary'  onclick = \"virtualAccountManagement.onTransferClick('" + id + "')\">转账</button>" +
                            " / <button class='btn btn-sm btn-success' onclick = \"virtualAccountManagement.onEditClick('" + id + "')\">编辑</button>" +
                            " / <button class='btn btn-sm btn-light' onclick = \"virtualAccountManagement.onHrefThisAccountTransRecordClick('" + id + "')\">交易记录</button>" +
                            " / <button class='btn btn-info' onclick = \"virtualAccountManagement.onSynchronizeSubmitClick('" + id + "')\">同步</button>" +
                            " / <button class='btn btn-sm btn-danger' onclick = \"virtualAccountManagement.onDeleteClick('" + id + "')\">删除</button>";
                    }
                }
            ],
            caption: getCaption(),
            url: configMap.formQueryApi,
            pager: '#pjqgrid',
            sortName: 'createDate',
            sortOrder: "desc",
            onGridComplete: function () {
                disableAccounts.forEach(function (rowId) {
                    jqueryMap.$jqGrid.find("#" + rowId).css("background-color", "#FF6F6F")
                })
            }
        };
        stateMap.jqGridModule = new jqGridModule(jqueryMap.$jqGrid, stateMap.jqGridOption);
    };

    onHrefThisAccountTransRecordClick = function (id) {
        self.location.href = '?paramId=' + id + '#transactionRecord';
    };

    // 单笔同步资料送出
    onSynchronizeSubmitClick = function (id) {
        let virtualAccountIdList = [];
        virtualAccountIdList.push(id);
        $.post(configMap.syncVirtualAccountApi, virtualAccountIdList).then(function (response) {
            stateMap.jqGridModule.reload();
            if ("success" === response.message) {
                let balance = response.result.balance;
                let transaction = response.result.transaction;
                if (balance.code === 0 && transaction) {
                    swal({text: "同步成功", type: "success"});
                } else {
                    swal({text: result.message, type: "error"});
                }
            } else {
                let json = JSON.parse(response.message);
                Object.keys(json).forEach(function (id) {
                    swal({text: json[id], type: "error"});
                });
            }
        });
    };

    // 全部同步资料送出
    onAllSynchronizeSubmitClick = function () {
        $.get(configMap.findAllAccountApi).then(function (response) {
            var allAccounts = response.result;
            var allAccountsList = [];
            allAccounts.forEach(account => allAccountsList.push(account.id));
            $.post(configMap.syncVirtualAccountApi, allAccountsList).then(function (response) {
                stateMap.jqGridModule.reload();
                if ("success" === response.message) {
                    let balance = response.result.balance;
                    let transaction = response.result.transaction;
                    if (balance.code === 0 && transaction) {
                        swal({text: "同步成功", type: "success"});
                    } else {
                        swal({text: result.message, type: "error"});
                    }
                } else {
                    let json = JSON.parse(response.message);
                    Object.keys(json).forEach(function (id) {
                        swal({text: json[id], type: "error"});
                    });
                }
            });
        });
    };

    // 单笔转账资料送出
    onTransferSubmitClick = function () {
        var rowData = jqueryMap.$transferContent.data("rowData");
        let amount = jqueryMap.$transferContent.find("input[name='amount']").val();
        let payExAcctNo = rowData.id;
        let recvExAcctNo = stateMap.transferDialogReExSelect2.getValue();

        let checkResult = false;
        let errorMessage = "";
        let reg = new RegExp("^[1-9]\\d{0,7}(\\.\\d{1,3})?$|^0(\\.\\d{1,3})?$"); //允許輸入整數8位，小數3位的金額！不能輸入0開頭的整數

        if (amount === "") {
            errorMessage = '转账金额栏位必填';
        } else if (!reg.test(amount)) {
            errorMessage = "转账金额必须为数字且最多只能输入整数8位，小数3位";
        } else if (payExAcctNo === recvExAcctNo) {
            errorMessage = "付款方与收款方不得相同";
        } else if (payExAcctNo === "All") {
            errorMessage = "请选择付款方";
        } else if (recvExAcctNo === "All") {
            errorMessage = "请选择收款方";
        } else {
            checkResult = true;
        }

        if (checkResult) {
            let data = {
                amount: amount,
                payExAcctNo: payExAcctNo,
                recvExAcctNo: recvExAcctNo
            };
            $.post(configMap.transferApi, data).then(function (response) {
                stateMap.jqGridModule.setJqGridParam("url", stateMap.jqGridOption.url);
                stateMap.jqGridModule.reloadAndGoFirstPage();
                if ("success" === response.message) {
                    let result = response.result;
                    if (result.code === 0) {
                        swal({text: "转账成功", type: "success"});
                    } else {
                        swal({text: result.message, type: "error"});
                    }
                } else {
                    let json = JSON.parse(response.message);
                    Object.keys(json).forEach(function (id) {
                        swal({text: json[id], type: "error"});
                    });
                }
                stateMap.transferDialog.close();
            });
        } else {
            swal({text: errorMessage, type: "error"});
            return false;
        }
    };

    // 查询全部会员
    getAllVirtualAccount = function () {
        return $.get(configMap.findAllAccountApi);
    };

    //查询全部启用虚户
    getAllEnableVirtualAccount = function () {
        return $.get(configMap.findAllEnableVirtualAccountApi);
    };

    //生成上方虚户查询的select2
    initVirtualAccountSelect2 = function (response) {
        stateMap.queryVirtualAccountSelect2 = autoPayAtCommon.initVirtualAccountSelect2($(".virtualAccountSelect2Container"), response.result, true, false, null);
    };

    //生成转账时查询虚户的select2
    initEnableVirtualAccountSelect2 = function (response) {
        stateMap.transferDialogReExSelect2 = autoPayAtCommon.initVirtualAccountSelect2(jqueryMap.$transferContent.find(".reCvExSelectContainer"), response.result, false, false, null);
    };


    //清除搜索条件
    clearQueryData = function () {
        //清除所有select2的值
        stateMap.queryVirtualAccountSelect2.reInit();

        $("#query1").find("input").each(function (k, v) {
            $(v).val('');
        });
        $("#query2").find("input").each(function (k, v) {
            $(v).val('');
        });
        $("#accountStatus")[0].selectedIndex = 0;
        $("#accountTypeSelect option:first").prop("selected", 'selected');
        //再點選 QueryData 一次
        queryData(true);
    };

    // 执行搜索条件搜寻
    queryData = function (isClick) {
        let dateRange = stateMap.dateRangePicker.getDate();
        let searchCondition = {};
        if ($("#selectTime").val() !== '') {
            let startDate = dateRange.startDate || '';
            let endDate = dateRange.endDate || '';
            searchCondition['startTime'] = startDate + ' 00:00:00' || '';
            searchCondition['endTime'] = endDate + ' 23:59:59' || '';
        }
        let merchantNo = $("#merchantNoQueryInput").val();
        let merchantName = $("#merchantName").val();
        let bankName = $("#bankName").val();
        let accountStatus = $("#accountStatus").val();
        let minBalance = $("#balanceMinQueryInput").val();
        let maxBalance = $("#balanceMaxQueryInput").val();
        let virtualAccount = stateMap.queryVirtualAccountSelect2.getValue();
        let accountType = $("#accountTypeSelect").find(":selected").val();
        let note = $("#noteQueryInput").val();
        let assignedMerchantId = $("#assignedMerchantIdQueryInput").val();

        if (merchantNo !== '') {
            searchCondition['merchantNo'] = merchantNo.trim() || '';
        }
        if (merchantName !== '') {
            searchCondition['merchantName'] = merchantName.trim() || '';
        }
        if (bankName !== '') {
            searchCondition['bankName'] = bankName.trim() || '';
        }
        if (accountStatus !== '0') {
            searchCondition['accountStatus'] = accountStatus.trim() || '';
        }
        if (minBalance !== '') {
            searchCondition['minBalance'] = minBalance.trim() || '';
        }
        if (maxBalance !== '') {
            searchCondition['maxBalance'] = maxBalance.trim() || '';
        }
        if (virtualAccount !== 'All' && virtualAccount !== '') {
            searchCondition['virtualAccount'] = virtualAccount.trim() || '';
        }
        if (accountType !== 'All' && accountType !== '') {
            searchCondition['accountType'] = accountType.trim() || '';
        }
        if (note !== '') {
            searchCondition['note'] = note.trim() || '';
        }
        if (assignedMerchantId !== '') {
            searchCondition['assignedMerchantId'] = assignedMerchantId.trim() || '';
        }

        //差虚户余额及虚户银行卡号
        stateMap.jqGridModule.setJqGridParam("postData", {"searchCondition": JSON.stringify(searchCondition)});
        if (isClick) {
            stateMap.jqGridModule.reloadAndGoFirstPage();
        } else {
            stateMap.jqGridModule.reload();
        }
    };

    // 生成虚户状态的select
    initAccountStatusSelect = function () {
        $.ajax({
            url: configMap.getAllVirtualAccountStatusApi,
            data: {},
            success: function (result) {
                if (result != null) {
                    console.log(result);
                    var $kind = $("#accountStatus");
                    $.each(result, function (key, value) {
                        $kind.append('<option id="' + value + '" value="' + key + '">' + value + '</option>');
                    })
                }
            }
        });
    };

    // 上方查询条件的建立时间组成月历的方法
    initDateTimePicker = function () {
        stateMap.dateRangePicker = new dateRangePickerModule(jqueryMap.$form.find("input[name='selectTime']"));
    };

    //设定虚户类型的下拉式选单
    initVirtualAccountTypeOption = function () {
        $.get(configMap.getTransactionAccountTypeApi).then(function (response) {
            let result = response.result;
            $.each(result, function (value, text) {
                let $accountTypeSOption = $(configMap.optionHtml);
                $accountTypeSOption.val(value);
                $accountTypeSOption.text(commonUtil.getVirtualAccountTypeText(text));
                jqueryMap.$accountTypeSelect.append($accountTypeSOption);
            });
        });
    };

    //启动此JS
    init = function () {
        if (!stateMap.dateRangePicker) {
            initDateTimePicker();
        }
        if (!stateMap.jqGridModule) {
            initJqGrid();
        }
        addQueryTopEvent();
        stateMap.addDialog = new dialog({
            title: configMap.addDialogTitle,
            width: 600,
            height: 650
        }, {
            content: jqueryMap.$addContent, submitHandler: onAddSubmitClick
        });
        stateMap.editDialog = new dialog({
            title: configMap.editDialogTitle,
            width: 600,
            height: 650
        }, {
            content: jqueryMap.$editContent, submitHandler: onEditSubmitClick
        });
        stateMap.deleteDialog = new dialog({
            title: configMap.deleteDialogTitle
        }, {
            content: jqueryMap.$deleteContent, submitHandler: onDeleteSubmitClick
        });
        stateMap.uploadDialog = new dialog({
            title: configMap.uploadDialogTitle
        }, {
            content: jqueryMap.$uploadContent, submitHandler: onUploadSubmitClick
        });
        stateMap.transferDialog = new dialog({
            title: configMap.transferTitle,
            width: 800,
            height: 400
        }, {
            content: jqueryMap.$transferContent, submitHandler: onTransferSubmitClick
        });
        initAccountStatusSelect();
        getAllVirtualAccount().then(initVirtualAccountSelect2);//设定查询的虚户select2(不分状态抓所有的虚户)
        initVirtualAccountTypeOption(); //设定虚户类型的下拉式选单
    };

    //此JS可呼叫的方法
    return {
        init: init,
        onAddClick: onAddClick,
        onEditClick: onEditClick,
        onDeleteClick: onDeleteClick,
        queryData: queryData,
        excelUploadClick: excelUploadClick,
        clearQueryData: clearQueryData,
        onTransferClick: onTransferClick,
        changeFlashGridTime: changeFlashGridTime,
        onSynchronizeSubmitClick: onSynchronizeSubmitClick,
        onAllSynchronizeSubmitClick: onAllSynchronizeSubmitClick,
        onHrefThisAccountTransRecordClick: onHrefThisAccountTransRecordClick
    }
})();