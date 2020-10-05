var systemTransLogSetting = (function () {
    var configMap = {
        doQueryActionApi: 'rest/transLog/doQueryAction'
    }, stateMap = {
        jqGridOption: {},
        startTimeOption: null,
        systemKindsObj: [],
        jqGridOptions: null
    }, jqueryMap = {
        $jqGrid: $("#jqgrid"),
        $changeSortBtnContainer: null
    }, init, initJqGrid, queryData, clearQueryData;


    //清除搜索条件
    clearQueryData = function () {

        $("#msg").val("");
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
    queryData = function () {
        var searchCondition = {};
        if ($("#msg").val() !== '') {
            searchCondition['msg'] = $("#msg").val() || '';
        } else if ($("#kind").find(":selected").val() !== '') {
            searchCondition['kind'] = $("#kind").find(":selected").val();
        }
        stateMap.jqGridOption.postData = {"searchCondition": JSON.stringify(searchCondition)};
        mv.reloadJqGrid(stateMap.jqGridOption);
    };


    getCaption = function () {
        return '';
    };

    //初始化jqGrid
    initJqGrid = function () {
        stateMap.jqGridOption = {

            colunmName: ['序号', '异动类别', '异动内容', '建立者', '建立时间', '建立者名稱', '修改日期', '修改者名稱', '操作'],

            colunmModel: [
                {name: "id", index: "id", key: true, align: "center", width: 20},
                {name: "kindName", index: "kind", align: "center", width: 50},
                {name: "msg", index: "msg", align: "center", width: 200},
                {name: "createUser", index: "createUser", align: "center", width: 50},
                {name: "createDate", index: "createDate", align: "center", width: 50},
                {name: "createUser", index: "createUser", hidden: true},
                {name: "updateDate", index: "updateDate", hidden: true},
                {name: "updateUser", index: "updateUser", hidden: true},
                {
                    name: 'info',
                    index: 'info',
                    sortable: false,
                    title: false,
                    width: 100,
                    align: 'center',
                    hidden: true,
                    formatter: function (cellvalue, options, rowObject) { //
                        var id = options.rowId;
                        var btn = '';
                        btn += "<button class='btn btn-sm btn-primary' onclick = \"prop.edit('" + id + "')\">编辑</button>";
                        btn += ' / ';
                        btn += "<button class='btn btn-sm btn-danger' onclick = \"prop.delete('" + id + "')\">删除</button>";
                        return btn;
                    }
                }
            ],
            caption: getCaption(),
            url: 'rest/transLog/doQueryAction',
            jqgrid: jqueryMap.$jqGrid,
            pager: '#pjqgrid',
            sortname: 'id',
            formObj: $("#form"),
            sortorder: "desc"

        };
        mv.jqgrid(stateMap.jqGridOption);
    };


    init = function () {
        initJqGrid();
        mv.select({url: mv.sys + 'rest/transLog/transLogKind', className: 'kind'});
    };
    return {
        init: init,
        queryData: queryData,
        clearQueryData: clearQueryData

    }
})
();