var transactionRecord = (function () {
    var configMap = {
            caption_html:
                '<div style="margin: 0% auto ; width: 200px;  float:left;position:relative;>"' +
                '   <label class="input">交易记录</label>' +
                ' </div>' +
                '<div style="margin: 0% auto ; width: 200px;  float:left;position:relative; left:35%">' +
                ' <button class="btn btn-primary" type="button" onclick="transactionRecord.onQuerySubmitClick()">查詢</button>&nbsp;&nbsp;' +
                ' <button class="btn btn-danger" type="button" onclick="transactionRecord.clearQueryData()">清除</button>' +
                ' </div>' +
                '<div style="margin:0%;margin-right:20px;float:right">' +
                '<input type="button" class="btn btn-primary" value="同步" id="doSynchronize" onclick="transactionRecord.onSynchronize()"">' +
                '</div>',
            optionHtml: '<option></option>',
            formQueryApi: 'rest/transactionRecord/findByPage',
            synchronizeApi: 'rest/transactionRecord/synchronizeTransactionRecord',
            findAllVirtualAccountApi: 'rest/virtual/findAllVirtualAccountForSelect2',
            getTransactionTypeApi: 'rest/transactionRecord/findTransactionType',
            getTransactionDebitFlagApi: 'rest/transactionRecord/findTransactionDebitFlag',
            getTransactionStatusApi: 'rest/transactionRecord/findTransactionStatus',
            transactionDetailsTitle: '详细',
        }, stateMap = {
            jqGridOption: null,
            dataMap: {},
            synchronizeCoolDownTimer: null,
            synchronizeCountDown: null,
            jqGridModule: null,
            virtualAccountCardNoSelect2Module: null,
            paramVirtualAccountId: null,
            transactionDetailsDialog: null,
        }, jqueryMap = {
            $jqGrid: $("#jqgrid"),
            $container: null,
            $form: null,
            $transactionType: $("#transactionType"),
            $transactionDebitFlag: $("#transactionDebitFlag"),
            $transactionStatus: $("#transactionStatus"),
            $transactionDetails: $("#detailDialog"),
        }, init, setJqueryMap,
        initJqGrid, getCaption, onQuerySubmitClick, clearQueryData, initDateTimePicker,
        onSynchronize, setSynchronizeCoolDownTimer, synchronizeCoolDownTimer, getAllVirtualAccount,
        initVirtualAccountSelect2, initTransactionTypeOption, initTransactionDebitOption, initTransactionStatusOption,
        getUrlRequest, isVirtualAccount, transactionDetails;


    onSynchronize = function () {
        // 限制時間內不能再打
        // setSynchronizeCoolDownTimer(jqueryMap.$container.find("#doSynchronize"));
        $.get(configMap.synchronizeApi).then(function (response) {
            stateMap.jqGridModule.reload();
            swal({text: "已同步", type: "success"});
            console.log(response);
        });
    };

    setSynchronizeCoolDownTimer = function ($synchronizeBtn) {
        stateMap.synchronizeCountDown = 10;
        var countDownHtml = "<span> ( <span class='countDown'>" + stateMap.synchronizeCountDown + "</span> ) </span>";
        $synchronizeBtn.addClass("disabled");
        $synchronizeBtn.append(countDownHtml);
        stateMap.synchronizeCoolDownTimer = setInterval(function () {
            synchronizeCoolDownTimer($synchronizeBtn);
        }, 1000)
    };
    synchronizeCoolDownTimer = function ($synchronizeBtn) {
        stateMap.synchronizeCountDown -= 1;
        if (stateMap.synchronizeCountDown === 0) {
            clearInterval(stateMap.synchronizeCoolDownTimer);
            $synchronizeBtn.removeClass("disabled");
            $synchronizeBtn.find("span").remove();
        } else {
            $synchronizeBtn.find(".countDown").html(stateMap.synchronizeCountDown);
        }
    };

    clearQueryData = function () {
        stateMap.virtualAccountCardNoSelect2Module.reInit();
        $("#query1").find("input").each(function (k, v) {
            $(v).val('');
        });
        $("#query2").find("input").each(function (k, v) {
            $(v).val('');
        });
        $("#transactionDebitFlag option:first").prop("selected", 'selected');
        $("#transactionType option:first").prop("selected", 'selected');
        $("#transactionStatus option:first").prop("selected", 'selected');
        onQuerySubmitClick();
    };
    onQuerySubmitClick = function () {
        let dateRange = stateMap.dateRangePicker.getDate();
        let virtualAccountId = stateMap.virtualAccountCardNoSelect2Module.getValue();
        if (virtualAccountId === "All") {
            virtualAccountId = "";
        }

        let amountMin = $("#amountMinQueryInput").val() || '';
        let amountMax = $("#amountMaxQueryInput").val() || '';
        let feeAmountMin = $("#feeAmountMinQueryInput").val() || '';
        let feeAmountMax = $("#feeAmountMaxQueryInput").val() || '';
        let transactionType = $("#transactionType").find(":selected").val();
        let transactionStatus = $("#transactionStatus").find(":selected").val();
        let accountNo = $("#accountNoQueryInput").val() || '';
        let orderId = $("#orderIdQueryInput").val() || '';
        let bankNo = $("#bankNoQueryInput").val() || '';
        let bankName = $("#bankNameQueryInput").val() || '';

        let data = {
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
            virtualAccountId: virtualAccountId,
            amountMin: amountMin,
            amountMax: amountMax,
            feeAmountMin: feeAmountMin,
            feeAmountMax: feeAmountMax,
            transactionType: transactionType,
            transactionStatus: transactionStatus,
            accountNo: accountNo,
            orderId: orderId,
            bankNo: bankNo,
            bankName: bankName
        };
        stateMap.jqGridModule.setJqGridParam("postData", {"searchCondition": JSON.stringify(data)});
        stateMap.jqGridOption.url = configMap.formQueryApi; //还原原本查询API(不带虚户管理带来的ID了)
        stateMap.jqGridModule.setJqGridParam("url", stateMap.jqGridOption.url);
        stateMap.jqGridModule.reloadAndGoFirstPage();
    };

    //设定交易类型的下拉式选单
    initTransactionTypeOption = function () {
        $.get(configMap.getTransactionTypeApi).then(function (response) {
            let result = response.result;
            $.each(result, function (value, text) {
                let $transactionTypeOption = $(configMap.optionHtml);
                $transactionTypeOption.val(value);
                $transactionTypeOption.text(commonUtil.getTransactionTypeText(text));
                jqueryMap.$transactionType.append($transactionTypeOption);
            });
        });
    };

    //设定收支标志的下拉式选单
    initTransactionDebitOption = function () {
        $.get(configMap.getTransactionDebitFlagApi).then(function (response) {
            let result = response.result;
            $.each(result, function (value, text) {
                let $transactionDebitFlagOption = $(configMap.optionHtml);
                $transactionDebitFlagOption.val(value);
                $transactionDebitFlagOption.text(commonUtil.getTransactionDebitFlagText(text));
                jqueryMap.$transactionDebitFlag.append($transactionDebitFlagOption);
            });
        });
    };

    //设定交易状态的下拉式选单
    initTransactionStatusOption = function () {
        $.get(configMap.getTransactionStatusApi).then(function (response) {
            let result = response.result;
            $.each(result, function (value, text) {
                let $transactionStatusOption = $(configMap.optionHtml);
                $transactionStatusOption.val(value);
                $transactionStatusOption.text(commonUtil.getTransactionStatusText(text, "select"));
                jqueryMap.$transactionStatus.append($transactionStatusOption);
            });
        });
    };

    initDateTimePicker = function () {
        stateMap.dateRangePicker = new dateRangePickerModule(jqueryMap.$form.find("input[name='dates']"));
        jqueryMap.$form.find("input[name='dates']").val("");
    };
    initJqGrid = function (searchItem) {
        stateMap.jqGridOption = {
            columnNames: ['交易日期', '请求单号', '虚户号', '商戶名稱', '交易金额(元)', '手续费(元)', '收支标志', '交易类型',
                '交易状态', '对方资讯', '交易流水号', '虚户账号资料', '操作'],
            columnModel: [
                {name: "transactionDate", index: "transactionDate", sortable: true, align: "center", width: 10},
                {name: "orderId", index: "orderId", sortable: true, align: "center", width: 10},
                {
                    name: "virtualAccount", index: "virtualAccount", width: 12, align: 'center', sortable: true,
                    formatter: function (cellValue) {
                        if (cellValue) {
                            return cellValue.cardNo;
                        } else {
                            return "";
                        }
                    }
                },
                {
                    name: "merchantName", index: "merchantName", sortable: true, align: "center", width: 5,
                    formatter: function (cellValue, options, rowObject) {
                        if (rowObject.virtualAccount && rowObject.virtualAccount.merchantName) {
                            return rowObject.virtualAccount.merchantName;
                        } else {
                            return "";
                        }
                    }
                },
                {
                    name: "amount", index: "amount", sortable: true, align: "center", width: 5,
                    formatter: function (cellValue, options, rowObject) {
                        var prefix;
                        var $span = $("<span></span>");
                        switch (rowObject.debitFlag) {
                            case "支出":
                                prefix = "-";
                                $span.css("color", "red")
                                break;
                            case "收入":
                                prefix = "+"
                                $span.css("color", "blue")
                                break;
                            default:
                                prefix = "未知类型" + rowObject.debitFlag
                                break;
                        }
                        if (cellValue) {
                            $span.html(prefix + cellValue);
                            return $span[0].outerHTML;
                        } else {
                            return "";
                        }
                    }
                },
                {name: "feeAmount", index: "feeAmount", sortable: true, align: "center", width: 5, hidden: true},
                {name: "debitFlag", index: "debitFlag", sortable: true, align: "center", width: 5, hidden: true},
                {
                    name: "transactionType", index: "transactionType", sortable: true, align: "center", width: 5
                },
                {
                    name: "status", index: "status", sortable: true, align: "center", width: 5,
                    formatter: function (cellValue, options, rowObject) {
                        return commonUtil.getTransactionStatusText(rowObject.status, "jqGrid");
                    }
                },
                {
                    name: "targetInfo", index: "targetInfo", sortable: true, align: "left", width: 15,
                    formatter: function (cellValue, options, rowObject) {
                        var isVirtualAccount = autoPayAtCommon.isVirtualAccount(rowObject.accountNo);
                        var accountText = isVirtualAccount ? "虚户号" : "账号";
                        var accountNameText = isVirtualAccount ? "虚户名称" : "账号名称";

                        var bankNo = rowObject.bankNo ? rowObject.bankNo : "";
                        var bankName = rowObject.bankName ? rowObject.bankName : "";
                        var $div = $("<div>" +
                            "<div>" + accountText + "：" + rowObject.accountNo + "</div>" +
                            "<div>" + accountNameText + "：" + rowObject.accountName + "</div>" +
                            "<div>银行联行号：" + bankNo + "</div>" +
                            "<div>开户行名称：" + bankName + "</div>" +
                            "</div>");
                        return $div[0].outerHTML;
                    }
                },
                {name: "tradeNo", index: "tradeNo", sortable: true, align: "center", width: 12, hidden: true},
                {
                    name: "virtualAccount",
                    index: "virtualAccount",
                    sortable: true,
                    align: "center",
                    width: 5,
                    hidden: true,
                    formatter: function (cellValue) {
                        if (cellValue) {
                            return JSON.stringify(cellValue);
                        } else {
                            return "";
                        }
                    }
                },
                {
                    name: 'operation',
                    index: 'operation',
                    sortable: false,
                    title: false,
                    align: 'center',
                    classes: 'white-space-no',
                    width: 5,
                    formatter: function (cellValue, options, rowObject) {
                        console.log(cellValue);
                        var id = options.rowId;
                        return "<button class='btn btn-sm btn-primary' onclick = \"transactionRecord.transactionDetails('" + id + "')\">详细</button>"

                    }
                }
            ],
            caption: getCaption(),
            url: configMap.formQueryApi + searchItem,
            pager: '#pjqgrid',
            sortName: 'transactionDate',
            sortOrder: "desc"
        };
        stateMap.jqGridModule = new jqGridModule(jqueryMap.$jqGrid, stateMap.jqGridOption);
    };
    getCaption = function () {
        return configMap.caption_html;
    };

    setJqueryMap = function ($container) {
        jqueryMap.$container = $container;
        jqueryMap.$form = $container.find("#form");
    };

    initVirtualAccountSelect2 = function (response) {
        stateMap.virtualAccountCardNoSelect2Module = autoPayAtCommon.initVirtualAccountSelect2(
            jqueryMap.$container.find(".virtualAccountCardNoContainer"), response.result, true, false, null
        );
        if (stateMap.paramVirtualAccountId) {
            stateMap.virtualAccountCardNoSelect2Module.changeTrigger(stateMap.paramVirtualAccountId);
            stateMap.paramVirtualAccountId = null;
        }

    };
    getAllVirtualAccount = function () {
        return $.get(configMap.findAllVirtualAccountApi);
    };

    getUrlRequest = function () {
        let virtualAccountId = commonUtil.getUrlParameter("paramId");
        stateMap.paramVirtualAccountId = virtualAccountId;
        return virtualAccountId === null ? "" : "?virtualAccountId=" + virtualAccountId;
    };


    transactionDetails = function (id) {
        stateMap.transactionDetailsDialog.open();
        let rowData = jqueryMap.$jqGrid.jqGrid('getRowData', id);
        var virtualAccountJSON = JSON.parse(rowData.virtualAccount);

        jqueryMap.$transactionDetails.find('td[name="transactionDate"]').html(rowData.transactionDate);
        jqueryMap.$transactionDetails.find('td[name="orderId"]').html(rowData.orderId);

        jqueryMap.$transactionDetails.find('td[name="virtualAccountNo"]').html(virtualAccountJSON.cardNo);
        jqueryMap.$transactionDetails.find('td[name="merchantName"]').html(rowData.merchantName);

        jqueryMap.$transactionDetails.find('td[name="amount"]').html(rowData.amount);
        jqueryMap.$transactionDetails.find('td[name="transactionType"]').html(rowData.transactionType);

        jqueryMap.$transactionDetails.find('td[name="status"]').html(rowData.status);
        jqueryMap.$transactionDetails.find('td[name="feeAmount"]').html(rowData.feeAmount);

        jqueryMap.$transactionDetails.find('td[name="debitFlag"]').html(rowData.debitFlag);
        jqueryMap.$transactionDetails.find('td[name="tradeNo"]').html(rowData.tradeNo);

        jqueryMap.$transactionDetails.find('td[name="targetInfo"]').html(rowData.targetInfo);
        jqueryMap.$transactionDetails.find('td[name="synchronizeDate"]').html(virtualAccountJSON.synchronizeDate);

    };


    stateMap.transactionDetailsDialog = new dialog({
        title: configMap.transactionDetailsTitle,
        width: 800,
        height: 400
    }, {
        content: jqueryMap.$transactionDetails,
        footer: "onlyCancel"
    });


    init = function ($container) {
        setJqueryMap($container);
        let urlRequest = getUrlRequest();
        initJqGrid(urlRequest);
        initDateTimePicker();
        getAllVirtualAccount().then(initVirtualAccountSelect2);
        initTransactionTypeOption(); //设定交易类型的下拉式选单
        initTransactionDebitOption(); //设定收支标志的下拉式选单
        initTransactionStatusOption();//设定交易状态的下拉式选单

    };
    return {
        init: init,
        onSynchronize: onSynchronize,
        onQuerySubmitClick: onQuerySubmitClick,
        clearQueryData: clearQueryData,
        transactionDetails: transactionDetails
    }
})();