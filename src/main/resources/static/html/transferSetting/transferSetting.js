var transferSetting = (function () {
    var configMap = {
            caption_html:
                '<div style="margin: 0% auto ; width: 200px;  float:left;position:relative;>"' +
                '   <label class="input">转账记录</label>' +
                ' </div>' +
                '<div style="margin: 0% auto ; width: 200px;  float:left;position:relative; left:35%">' +
                ' <button class="btn btn-primary" type="button" onclick="transferSetting.onQuerySubmitClick()">查詢</button>&nbsp;&nbsp;' +
                ' <button class="btn btn-danger" type="button" onclick="transferSetting.clearQueryData()">清除</button>' +
                ' </div>' +
                '<div style="margin:0%;margin-right:20px;float:right">' +
                '<input type="button" class="btn btn-primary" value="转账" id="doAddAction" onclick="transferSetting.onAddClick(this)";">' +
                '</div>',
            addHtml:
                '<div class="form-row">' +
                '   <div style="color: red; text-align: center;margin-top: 10px;">' +
                '       <span class="noticeMessage"></span>' +
                '   </div>' +
                '   <div class="input-group">' +
                '       <span class="input-group-addon"><span style="color: red">＊</span>转账金额</span>' +
                '       <input placeholder="最少1元，且金额只取到小数点第2位" type="text" maxlength="12" class="form-control" name="amount" onkeyup="value=value.replace(/[^\\d^\\.]+/g,\'\')" >' +
                '   </div>' +
                '   <div class="input-group payExSelectContainer">' +
                '       <span class="input-group-addon"><span style="color: red">＊</span>付款虚户号</span>' +
                '   </div>' +
                '   <div class="input-group reCvExSelectContainer">' +
                '       <span class="input-group-addon"><span style="color: red">＊</span>收款虚户号</span>' +
                '   </div>' +
                '</div>',
            detailHtml:
                ' <div class="table-responsive">' +
                '<table class="table table-bordered table-striped " id="detail-table" style="table-layout: fixed">' +
                '<tbody><tr><td style="text-align: right">订单号：</td><td class="detailOrderNo"></td>' +
                '<td style="text-align: right">申请時間：</td><td class="detailCreateDate"></td></tr>' +
                '<tr><td style="text-align: right">订单状态：</td><td class="detailOrderType"></td>' +
                '<td style="text-align: right">更新時間：</td><td class="detailUpdateDate"></td></tr>' +
                '<tr><td style="text-align: right">转账金额(元)：</td><td class="detailAmount"></td>' +
                '<td style="text-align: right">商户号(付款方)：</td><td class="detailMerchantNo"></td></tr>' +
                '<tr><td style="text-align: right">付款虚户号：</td><td class="detailPayExAcctNo"></td>' +
                '<td style="text-align: right">收款虚户号：</td><td class="detailReCvExAcctNo"></td></tr>' +
                '</tbody></table>' +

                '<table class="table table-bordered table-striped " id="recordTable" style="table-layout: fixed"></table>' +
                '</div>',
            recordTableHeaderHtml: '<tr><td colspan="4" style="text-align:center">操作记录</td></tr>' +
                '<tr><td style="text-align: center">状态</td><td style="text-align: center">备注</td><td style="text-align: center">时间</td><td style="text-align: center">操作者</td></tr>',
            recordTableContentHtml: '<tr><td class="recordOrderType" style="text-align: center"></td>' +
                '<td class="recordNote" style="text-align: center"></td><td class="recordCreateDate" style="text-align: center"></td>' +
                '<td class="recordCreateUser" style="text-align: center"></td></tr>',
            optionHtml: '<option></option>',
            addDialogTitle: '转账',
            detailDialogTitle: '转账详细记录',
            formQueryApi: 'rest/transfer/findByPage',
            addApi: 'rest/transfer/transfers',
            findAllVirtualAccountApi: 'rest/virtual/findAllVirtualAccountForSelect2',
            findAllEnableVirtualAccountApi: 'rest/virtual/findAllEnableVirtualAccountForSelect2',
            findByOrderNoApi: 'rest/transfer/transfers',
            getOrderTypeApi: 'rest/transfer/findOrderType',
            getFlashGridTimeApi: 'rest/systemConfig/findFlashGridTime',
            getVirtualAccountByIdApi: 'rest/virtual/findVirtualAccountById',
        }, stateMap = {
            addDialog: null,
            detailDialog: null,
            addDialogPayExSelect2: null,
            addDialogReCvExSelect2: null,
            jqGridOption: {},
            bankMap: {},
            jqGridModule: null,
            queryPayExNoSelect2: null,
            queryReCvExNoSelect2: null,
            flashTime: "",
            intervalID: ""
        }, jqueryMap = {
            $jqGrid: $("#jqgrid"),
            $addContent: $(configMap.addHtml),
            $detailContent: $(configMap.detailHtml),
            $bankQueryInputSelect2: $(".bankQueryInputSelect2"),
            $flashGridTime: $("#flashGridTime")
        }, init, initJqGrid, getCaption, onAddClick, addQueryTopEvent, onAddSubmitClick, reRenderSelect2,
        onDetailClick, onDetailSubmitClick, initBankOption, initDateTimePicker, setJqueryMap,
        initOrderTypeOption, clearQueryData, onQuerySubmitClick, changeFlashGridTime, initVirtualAccountSelect2,
        getAllVirtualAccount,
        getAllEnableVirtualAccount, initEnableVirtualAccountSelect2, changeVirtualAccount;

    setJqueryMap = function ($container) {
        jqueryMap.$container = $container;
    };


    addQueryTopEvent = function () {
        licoSetting.onClearForm();
        $('#queryForm').on('click', function () {
            stateMap.jqGridOption.url = configMap.formQueryApi + "?name=" + $("#queryInput").val();
            stateMap.jqGridModule.setJqGridParam("url", stateMap.jqGridOption.url);
            stateMap.jqGridModule.reloadAndGoFirstPage();
        });
        $('#clearForm').on('click', function () {
            stateMap.jqGridOption.url = configMap.formQueryApi;
            stateMap.jqGridModule.setJqGridParam("url", stateMap.jqGridOption.url);
            stateMap.jqGridModule.reloadAndGoFirstPage();
        });
    };
    getCaption = function () {
        return configMap.caption_html;
    };

    onAddClick = function () {
        jqueryMap.$addContent.find("input[name='amount']").val("");
        stateMap.addDialogReCvExSelect2.reInit();
        stateMap.addDialogPayExSelect2.reInit();
        if (stateMap.addDialogPayExSelect2.getValue().length > 0) { //确定有虚户可选才去找余额
            changeVirtualAccount(stateMap.addDialogPayExSelect2.getValue());
        }
        stateMap.addDialog.open(jqueryMap.$addContent.find(".payExSelectContainer"),);
    };

    onDetailClick = function (orderNo) {
        jqueryMap.$detailContent.parents("#moduleDialog").find("#submitBtn").hide();
        jqueryMap.$detailContent.parents("#moduleDialog").find("#cancelBtn").text("关闭");
        stateMap.jqGridModule.reload();
        let $recordTable = $("#recordTable");
        $('#recordTable tbody').empty();
        var data = {orderNo: orderNo};
        $.get(configMap.findByOrderNoApi, data).then(function (response) {
            if ("success" === response.message) {
                let result = response.result;
                let transferOrderRecordList = result.transferOrderRecord;

                let orderTypeText = commonUtil.getTransferOrderTypeText(result.orderType);
                jqueryMap.$detailContent.find(".detailOrderNo").html(result.orderNo);
                jqueryMap.$detailContent.find(".detailCreateDate").html(result.createDate);
                jqueryMap.$detailContent.find(".detailOrderType").html(orderTypeText);
                jqueryMap.$detailContent.find(".detailUpdateDate").html(result.updateDate);
                jqueryMap.$detailContent.find(".detailAmount").html(result.amount);
                jqueryMap.$detailContent.find(".detailMerchantNo").html(result.merchantNo);
                jqueryMap.$detailContent.find(".detailPayExAcctNo").html(result.payExAcctNo);
                jqueryMap.$detailContent.find(".detailReCvExAcctNo").html(result.reCvExAcctNo);

                if (transferOrderRecordList) {
                    $recordTable.append(configMap.recordTableHeaderHtml);
                    transferOrderRecordList.forEach(function (orderRecord, index) {
                        let $recordTableContent = $(configMap.recordTableContentHtml);
                        $recordTableContent.find(".recordOrderType").html(orderTypeText);
                        $recordTableContent.find(".recordNote").html(orderRecord.note);
                        $recordTableContent.find(".recordCreateDate").html(orderRecord.createDate);
                        $recordTableContent.find(".recordCreateUser").html(orderRecord.createUser);
                        $recordTable.append($recordTableContent[0]);
                    });
                }
            }
        });
        stateMap.detailDialog.open();
    };


    onAddSubmitClick = function () {
        let amount = jqueryMap.$addContent.find("input[name='amount']").val();
        let payExAcctNo = stateMap.addDialogPayExSelect2.getValue();
        let recvExAcctNo = stateMap.addDialogReCvExSelect2.getValue();

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
            $.post(configMap.addApi, data).then(function (response) {
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
                stateMap.addDialog.close();
            });
        } else {
            swal({text: errorMessage, type: "error"});
            return false;
        }

    };


    onDetailSubmitClick = function () {
    };

    onQuerySubmitClick = function () {
        let orderNo = $("#orderNoQueryInput").val() || '';
        let orderType = $("#orderTypeQueryInput").find(":selected").val();
        let amountMin = $("#amountMinQueryInput").val() || '';
        let amountMax = $("#amountMaxQueryInput").val() || '';
        let dateRange = stateMap.dateRangePicker.getDate();
        let startDate = dateRange.startDate;
        let endDate = dateRange.endDate;
        let payExAcctNo = stateMap.queryPayExNoSelect2.getValue();
        let reCvExAcctNo = stateMap.queryReCvExNoSelect2.getValue();

        let searchCondition = {
            orderNo: orderNo,
            orderType: orderType,
            amountMin: amountMin,
            amountMax: amountMax,
            startDate: startDate,
            endDate: endDate,
            payExAcctNo: payExAcctNo,
            reCvExAcctNo: reCvExAcctNo
        };

        stateMap.jqGridModule.setJqGridParam("postData", {"searchCondition": JSON.stringify(searchCondition)});
        stateMap.jqGridModule.reloadAndGoFirstPage();
    };

    //清除搜索条件
    clearQueryData = function () {
        //清除所有query select2的值
        stateMap.queryReCvExNoSelect2.reInit();
        stateMap.queryPayExNoSelect2.reInit();

        $("#query1").find("input").each(function (k, v) {
            $(v).val('');
        });
        $("#query2").find("input").each(function (k, v) {
            $(v).val('');
        });
        $("#orderTypeQueryInput option:first").prop("selected", 'selected');

        onQuerySubmitClick(); //无查询条件重新查询
    };

    //设定查询订单状态的下拉式选单
    initOrderTypeOption = function () {
        $.get(configMap.getOrderTypeApi).then(function (response) {
            let result = response.result;
            $.each(result, function (value, text) {
                let $versionOption = $(configMap.optionHtml);
                $versionOption.val(value);
                $versionOption.text(text);
                $("#orderTypeQueryInput").append($versionOption);
            });
        });
    };

    initJqGrid = function () {
        stateMap.jqGridOption = {
            columnNames: ['订单号', '状态', '转账金额(元)', '付款虚户号', '收款虚户号', '商户号(付款方)', '建立时间', '操作'],
            columnModel: [
                {
                    name: "orderNo", index: "orderNo", width: 15, align: 'center'
                },
                {
                    name: "orderType", index: "orderType", width: 5, align: 'center',
                    formatter: function (cellValue, options, rowObject) {
                        let orderTypeHtml = commonUtil.getTransferOrderTypeText(rowObject.orderType);
                        return orderTypeHtml;
                    }
                },
                {
                    name: "amount", index: "amount", width: 10, align: 'center'
                },
                {
                    name: "payExAcctNo", index: "payExAcctNo", width: 15, align: 'center', sortable: true
                },
                {
                    name: "reCvExAcctNo", index: "reCvExAcctNo", width: 15, align: 'center', sortable: true
                },

                {
                    name: "merchantNo", index: "merchantNo", width: 10, align: 'center', sortable: true
                },
                {
                    name: "createDate", index: "createDate", width: 10, align: 'center', sortable: true
                },
                {
                    name: 'operation',
                    index: 'operation',
                    sortable: false,
                    title: false,
                    align: 'center',
                    classes: 'white-space-no',
                    width: 8,
                    formatter: function (cellValue, options, rowObject) {
                        var orderNo = rowObject.orderNo;
                        return "<button class='btn btn-sm btn-info'  onclick = \"transferSetting.onDetailClick('" + orderNo + "')\">详细</button>"
                    }
                }
            ],
            caption: getCaption(),
            url: configMap.formQueryApi,
            pager: '#pjqgrid',
            sortName: 'createDate',
            sortOrder: "desc"
        };

        stateMap.jqGridModule = new jqGridModule(jqueryMap.$jqGrid, stateMap.jqGridOption);
    };

    initVirtualAccountSelect2 = function (response) {
        stateMap.queryPayExNoSelect2 = autoPayAtCommon.initVirtualAccountSelect2(jqueryMap.$container.find(".payExNoSelect2Container"), response.result, true, false, null);
        stateMap.queryReCvExNoSelect2 = autoPayAtCommon.initVirtualAccountSelect2(jqueryMap.$container.find(".reCvExNoSelect2Container"), response.result, true, false, null);
    };

    initEnableVirtualAccountSelect2 = function (response) {
        stateMap.addDialogPayExSelect2 = autoPayAtCommon.initVirtualAccountSelect2(jqueryMap.$addContent.find(".payExSelectContainer"), response.result, false, true, changeVirtualAccount);
        stateMap.addDialogReCvExSelect2 = autoPayAtCommon.initVirtualAccountSelect2(jqueryMap.$addContent.find(".reCvExSelectContainer"), response.result, false, false, changeVirtualAccount);
    };

    getAllVirtualAccount = function () {
        return $.get(configMap.findAllVirtualAccountApi);
    };

    getAllEnableVirtualAccount = function () {
        return $.get(configMap.findAllEnableVirtualAccountApi);
    };


    initDateTimePicker = function () {
        stateMap.dateRangePicker = new dateRangePickerModule(jqueryMap.$container.find("input[name='withdrawDateQueryInput']"));
        jqueryMap.$container.find("input[name='withdrawDateQueryInput']").val("");
    };

    changeVirtualAccount = function (id) {
        $.get(configMap.getVirtualAccountByIdApi + "?id=" + id, null).then(function (response) {
            if ("0" === response.code) {
                let result = response.result;
                let noticeMessage = "付款虚户号：" + result.cardNo + "(" + result.merchantName + ")" + "，目前余额：" + result.balance + "元";
                jqueryMap.$addContent.find(".noticeMessage").text(noticeMessage);
            }
        });
    };

    init = function ($container) {
        setJqueryMap($container);
        initJqGrid();
        addQueryTopEvent();
        stateMap.addDialog = new dialog({
            title: configMap.addDialogTitle,
            width: 800,
            height: 400
        }, {
            content: jqueryMap.$addContent, submitHandler: onAddSubmitClick
        });

        stateMap.detailDialog = new dialog({
            title: configMap.detailDialogTitle,
            width: 800,
            height: 600
        }, {
            content: jqueryMap.$detailContent, submitHandler: onDetailSubmitClick
        });

        initOrderTypeOption();
        if (!stateMap.dateRangePicker) {
            initDateTimePicker();
        }
        getAllVirtualAccount().then(initVirtualAccountSelect2); //设定查询的虚户select2(不分状态抓所有的虚户)
        getAllEnableVirtualAccount().then(initEnableVirtualAccountSelect2); //设定新增的虚户select2(只抓启用的虚户)
    };
    return {
        init: init,
        onAddClick: onAddClick,
        onDetailClick: onDetailClick,
        onQuerySubmitClick: onQuerySubmitClick,
        clearQueryData: clearQueryData,
        changeFlashGridTime: changeFlashGridTime
    }
})
();