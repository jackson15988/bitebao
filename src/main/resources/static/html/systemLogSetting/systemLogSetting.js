var systemLogSetting = (function () {
    var configMap = {
        caption_html:
            '<div style="margin: 0% auto ; width: 200px">' +
            '<button class="btn btn-primary" type="button" id="queryByCondition" onclick="systemLogSetting.queryData()">查詢</button>&nbsp;&nbsp;' +
            '<button class="btn btn-danger" type="button" id="clearQueryCondtions" onclick="systemLogSetting.clearQueryData()">清除</button></div>',
        formQueryApi: 'rest/systemLogs/findByPage',
        doQueryActionApi: 'rest/systemLogs/doQueryAction',
        doKindQueryAction: 'rest/systemLogs/doKindQueryAction'
    }, stateMap = {
        jqGridOption: {},
        startTimeOption: null,
        systemKindsObj : [],
        jqGridOptions : null
    }, jqueryMap = {
        $jqGrid: $("#jqgrid"),
        $changeSortBtnContainer: null
    }, init, initJqGrid , initDateTimePicker ,queryData , clearQueryData , getSystemKindName ;


    //初始化時間表格
    initDateTimePicker = function () {
        // 起始時間datetimepicker 設定
        stateMap.startTimeOption = {
            id: $("#startTime"),
            dateFormat: 'yyyy-mm-dd hh:ii:00',
            minuteStep: 10
        };
        // 結束時間datetimepicker 設定
        stateMap.endTimeOption = {
            id: $("#endTime"),
            dateFormat: 'yyyy-mm-dd hh:ii:59',
            minuteStep: 10
        };
        mv.datetimepicker(stateMap.startTimeOption);
        mv.datetimepicker( stateMap.endTimeOption);
    };




    //觸發多條件搜尋
    queryData = function () {
        var searchCondition = {};
        searchCondition['userName'] =  $("#userName").val() || '';
        searchCondition['userLoginName'] =  $("#userLoginName").val() || '';
        searchCondition['startTime'] =  $("#startTime").val() || '';
        searchCondition['endTime'] =  $("#endTime").val() || '';
        searchCondition['kind'] = $("#kind").find(":selected").val();
        searchCondition['msg'] =  $("#msg").val() || '';
        searchCondition['userIp'] =  $("#userIp").val() || '';

        var data = {"searchCondition": JSON.stringify(searchCondition)};
        $.post(configMap.doQueryActionApi, data).then(function (response) {
            mv.reloadJqGrid(stateMap.jqGridOption);
        });
    };

    //清除搜索条件
    clearQueryData = function (){
        $("#query1").find("input").each(function (k, v) {
            $(v).val('');
        });
        $("#kind")[0].selectedIndex = 0;

        $("#query2").find("input").each(function (k, v) {
            $(v).val('');
        });
        //再點選 QueryData 一次
        queryData();
    };


    //执行搜索条件搜寻
    queryData = function() {
        var searchCondition = {};

        searchCondition['userName'] =  $("#userName").val() || '';
        searchCondition['userLoginName'] =  $("#userLoginName").val() || '';
        searchCondition['startTime'] =  $("#startTime").val() || '';
        searchCondition['endTime'] =  $("#endTime").val() || '';
        searchCondition['kind'] = $("#kind").find(":selected").val();
        searchCondition['msg'] =  $("#msg").val() || '';
        searchCondition['userIp'] =  $("#userIp").val() || '';
        stateMap.jqGridOption.postData = {"searchCondition": JSON.stringify(searchCondition)};
        mv.reloadJqGrid(stateMap.jqGridOption);

    };


    getCaption = function () {
        var $caption = $(configMap.caption_html);
        return $caption[0].outerHTML;
    };

    //初始化jqGrid
    initJqGrid = function () {
        stateMap.jqGridOption = {
            colunmName: ['序号', '操作用户', '操作账号', '操作事件', '操作内容', '操作时间', 'IP位置'],

                colunmModel: [
                    {name: "id", index: "id", align: "center", key: true, width: 5},
                    {name: "userName", index: "userName", align: "center", width: 10},
                    {name: "userLoginId", index: "userLoginId", align: "center", width: 10},
                    {
                        name: "kind", index: "kind", align: "center", width: 10,
                        formatter: function (cellValue, options, rowObject) {
                            console.log('cellValue:' + cellValue );
                            console.log('options:' + options );
                            console.log('rowObject:' + rowObject );

                            if (stateMap.systemKindsObj.length > 0) {
                                var obj = stateMap.systemKindsObj[cellValue - 1];
                                console.log(cellValue + ',' + obj.text);
                                return obj.text;
                            }
                        }
                    },
                    {name: "msg", index: "msg", align: "center", width: 40},
                    {name: "createDate", index: "createDate", align: "center", width: 15},
                    {name: "userIp", index: "userIp", align: "center", width: 10}
                    // {name: "userId", index: "userId", hidden: true}
                ],
                caption: getCaption(),
                url: configMap.formQueryApi,
                jqgrid: jqueryMap.$jqGrid,
                pager: '#pjqgrid',
                sortname: 'id',
                formObj: $("#form"),
                sortorder: "desc"

        };
        mv.jqgrid(stateMap.jqGridOption);
    };

    //取得 kind Name
    getSystemKindName = function() {
        var  systemKindsObj =  [];
        var ajaxOptions = {
            url:  configMap.doKindQueryAction,
            async: true,
            success: function (respObj) {
                $.each(respObj, function (k, v) {
                    var obj = {
                        key: v.key,
                        text: v.value
                    };
                    systemKindsObj.push(obj);
                    $("#kind").append($("<option></option>").attr("value", v.key).text(v.value));
                });
                stateMap.systemKindsObj = systemKindsObj;

            }
        };
        mv.ajax(ajaxOptions);
    };

    init = function () {
        getSystemKindName();
        initJqGrid();
        initDateTimePicker();

    };
    return {
        init: init,
        queryData:queryData,
        clearQueryData:clearQueryData

    }
})
();