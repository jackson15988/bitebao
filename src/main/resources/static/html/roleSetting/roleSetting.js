var roleSetting = (function () {
    var configMap = {
            caption_html:
                '<div>' +
                '<div style="margin:0%auto;width:200px;float:left;position:relative;">' +
                '<label class="input"></label>' +
                '</div>' +
                '<div style="margin: 0% 20px 0% 0%;float:right">' +
                '<button class="btn btn-primary" type="button" id="doAddAction" onclick="roleSetting.onAddClick(this)">新增</button>' +
                '</div>' +
                '</div>',
            addHtml:
                '<form id="addDialogForm" class="smart-form">' +
                '<fieldset>' +
                '<div class="row">' +
                '<section class="col-xs-12 col-sm-12 col-md-12 col-lg-10" id="dialogName">' +
                '<div class="input-group" id="roleName">' +
                '<span class="input-group-addon">角色名称</span>' +
                '<input type="hidden" class="form-control" name="id" readonly><input type="text" class="form-control"  name="roleName">' +
                '</div>' +
                '</section>' +
                '</div>' +
                '<div class="row">' +
                '<section class="col-xs-12 col-sm-12 col-md-12 col-lg-11" id="dialogFunc">' +
                '</section>' +
                '</div>' +
                '</fieldset>' +
                '</form>',
            editHtml:
                '<form id="editDialogForm" class="smart-form">' +
                '<fieldset>' +
                '<div class="row">' +
                '<section class="col-xs-12 col-sm-12 col-md-12 col-lg-10" id="dialogName">' +
                '<div class="input-group" id="roleName">' +
                '<span class="input-group-addon">角色名称</span>' +
                '<input type="hidden" class="form-control" name="id" readonly>' +
                '<input type="text" class="form-control"  name="roleName">' +
                '</div>' +
                '</section>' +
                '</div>' +
                '<div class="row">' +
                '<section class="col-xs-12 col-sm-12 col-md-12 col-lg-11" id="dialogFunc">' +
                '<label class="label" id="funcIdList">角色权限设置</label>' +
                '</section>' +
                '</div>' +
                '</fieldset>' +
                '</form>',
            deleteHtml:
                '<div class="form-row">' +
                '<div class="input-group">' +
                '<span>即将删除角色: ' +
                '<span id="deleteData"></span>' +
                '</span>' +
                '</div>' +
                '<div class="input-group" id="message">' +
                '</div>' +
                '</div>',
            funcIdListHtml: '<div class="col col-3"><label class="checkbox"><input type="checkbox" name="funcIdList"></label></div>',
            funcIdChildrenListHtml: ' <label class="checkbox"><input type="checkbox" name="funcIdList"></label>',
            captionText: '角色权限管理',
            addDialogTitle: '新增角色',
            editDialogTitle: '编辑角色',
            deleteDialogTitle: '删除角色',
            formQueryApi: 'rest/role/findByPage',
            addApi: 'rest/role/addRole',
            editApi: 'rest/role/updateRole',
            deleteApi: 'rest/role/deleteRole/',
            getAllFuncListAPi: 'rest/role/findAllFuncList',
            findRoleFunctionListAPi: 'rest/role/findRoleFunctionList'
        }, stateMap = {
            addDialog: null,
            editDialog: null,
            deleteDialog: null,
            jqGridOption: null,
            qrCodeDialog: null
        }, jqueryMap = {
            $jqGrid: $("#jqgrid"),
            $editContent: $(configMap.editHtml),
            $addContent: $(configMap.addHtml),
            $deleteContent: $(configMap.deleteHtml),
            $qrCodeContent: $(configMap.qrCodeHtml)
        }, init, initJqGrid, getCaption, onAddClick, onEditClick, onDeleteClick, onEditSubmitClick, onAddSubmitClick,
        onDeleteSubmitClick, addQueryTopEvent, getAllFuncList, checkboxBinding;

    onAddSubmitClick = function () { //新增按下确认送出资料
        mv.cleanErrorMsg(); //送出时清除错误提示
        var postData = {
            roleName: jqueryMap.$addContent.find("input[name='roleName']").val(),
            isAdmin: jqueryMap.$addContent.find("input[name='isAdmin']:checked").val()
        };
        var funcIdList = [];
        var funcCheckBoxList = jqueryMap.$addContent.find("input:checked[name='funcIdList']");
        $.each(funcCheckBoxList, function (i) { //取得被选取checkBox的值
            funcIdList.push(funcCheckBoxList[i].value);
        });
        postData['funcIdList'] = funcIdList;
        $.post(configMap.addApi, postData).then(function (response) {
            console.log("response.message=", response.message);
            if (response.code === "0") {
                stateMap.addDialog.close();
                mv.reloadJqGrid(stateMap.jqGridOption);
                swal({text: "新增成功", type: "success"});
            } else {
                var errorText = "";
                if ("角色已存在" === response.message) {
                    errorText = response.message;
                } else {
                    errorText = "资料格式有误，请检查输入资料";
                    mv.showErrorMsg(response); //依照回传的错误id来显示错误提示
                }
            }
        });
    };

    onEditSubmitClick = function () {  //编辑按下确认送出资料
        mv.cleanErrorMsg("editDialogForm"); //送出时清除错误提示
        var postData = {
            id: jqueryMap.$editContent.find("input[name='id']").val(),
            roleName: jqueryMap.$editContent.find("input[name='roleName']").val()
        };

        var funcIdList = [];
        var funcCheckBoxList = jqueryMap.$editContent.find("input:checked[name='funcIdList']");
        $.each(funcCheckBoxList, function (i) { //取得被选取checkBox的值
            funcIdList.push(funcCheckBoxList[i].value);
        });
        postData['funcIdList'] = funcIdList;

        $.patch(configMap.editApi, postData).then(function (response) {
            if (response.code === "0") {
                stateMap.editDialog.close();
                mv.reloadJqGrid(stateMap.jqGridOption);
                swal({text: "修改成功", type: "success"});
            } else {
                var errorText = "";
                if ("角色已存在" === response.message) {
                    errorText = response.message;
                } else {
                    errorText = "资料格式有误，请检查输入资料";
                    mv.showErrorMsg(response, "editDialogForm"); //依照回传的错误id来显示错误提示
                }
            }
        });
    };
    onDeleteSubmitClick = function () {
        var rowData = jqueryMap.$deleteContent.data("rowData");
        $.delete(configMap.deleteApi + rowData.id).then(function (response) {
            if (response.code === "0") {
                stateMap.deleteDialog.close();
                mv.reloadJqGrid(stateMap.jqGridOption);
                swal({text: "删除成功", type: "success"});
            } else {
                var errorText = "";
                if ("角色已不存在" === response.message) {
                    errorText = "角色已不存在";
                } else {
                    errorText = response.message;
                }
                swal({text: errorText, type: "error"});
            }
        });
    };
    onAddClick = function () { //开启新增dialog
        mv.cleanErrorMsg(); //展开编辑dialog要清除错误提示
        var $addDiaContent = jqueryMap.$addContent;
        $addDiaContent.find("input[name='roleName']").val("");
        var $funcGroup = $addDiaContent.find("#dialogFunc");
        $funcGroup.html("<label class=\"label\" id=\"funcIdList\">角色权限设置</label>");
        getAllFuncList()
            .done(function (getAllFuncListData) {
                if ("0" === getAllFuncListData.code) {  //长出所有角色能设定的功能checkBox
                    var allFuncList = getAllFuncListData.result;
                    $.each(allFuncList, function (i, v) {
                        //先長母類別
                        var $funcIdListParentContent = $(configMap.funcIdListHtml);
                        $funcIdListParentContent.find("input[name='funcIdList']").val(v.parentFunc.id);
                        $funcIdListParentContent.find(".checkbox").append("<i></i><strong>" + v.parentFunc.funcName + "</strong>");
                        $funcGroup.append($funcIdListParentContent);

                        //再長子類別
                        var childFuncList = v.childFunc;
                        $.each(childFuncList, function (ci, cv) {
                            var $funcIdChildrenListContent = $(configMap.funcIdChildrenListHtml);
                            $funcIdChildrenListContent.find("input[name='funcIdList']").val(cv.id);
                            $funcIdChildrenListContent.find("input[name='funcIdList']").attr("data-parent-id", v.parentFunc.id);
                            $funcIdChildrenListContent.append("<i></i>" + cv.funcName);
                            $funcIdListParentContent.append($funcIdChildrenListContent);
                        });
                        $funcGroup.append($funcIdListParentContent);
                    });
                    //-----------------------上面html长完后才执行下段-------------------------------
                    var addDialogId = $addDiaContent.attr("id");
                    var $addDialog = $("#" + addDialogId);
                    checkboxBinding($addDialog);
                }
            });
        stateMap.addDialog.open();
    };
    onEditClick = function (id) { //开启编辑dialog
        mv.cleanErrorMsg("editDialogForm"); //展开编辑dialog要清除错误提示
        var rowData = jqueryMap.$jqGrid.jqGrid('getRowData', id);
        jqueryMap.$editContent.data("rowData", rowData);
        jqueryMap.$editContent.find("input[name='id']").val(id);
        jqueryMap.$editContent.find("input[name='roleName']").val(rowData.roleName);
        var data = {id: id};

        var $funcGroup = jqueryMap.$editContent.find("#dialogFunc");
        $funcGroup.html("<label class=\"label\" id=\"funcIdList\">角色权限设置</label>");
        getAllFuncList()
            .done(function (getAllFuncListData) {
                if ("0" === getAllFuncListData.code) {  //长出所有角色能设定的功能checkBox
                    var allFuncList = getAllFuncListData.result;
                    $.each(allFuncList, function (i, v) {
                        //先長母類別
                        var $funcIdListParentContent = $(configMap.funcIdListHtml);
                        $funcIdListParentContent.find("input[name='funcIdList']").val(v.parentFunc.id);
                        $funcIdListParentContent.find(".checkbox").append("<i></i><strong>" + v.parentFunc.funcName + "</strong>");
                        $funcGroup.append($funcIdListParentContent);

                        //再長子類別
                        var childFuncList = v.childFunc;
                        $.each(childFuncList, function (ci, cv) {
                            var $funcIdChildrenListContent = $(configMap.funcIdChildrenListHtml);
                            $funcIdChildrenListContent.find("input[name='funcIdList']").val(cv.id);
                            $funcIdChildrenListContent.find("input[name='funcIdList']").attr("data-parent-id", v.parentFunc.id);
                            $funcIdChildrenListContent.append("<i></i>" + cv.funcName);
                            $funcIdListParentContent.append($funcIdChildrenListContent);
                        });
                        $funcGroup.append($funcIdListParentContent);
                    });
                    //-----------------------上面html长完后才执行下段-------------------------------
                    var editDialogId = jqueryMap.$editContent.attr("id");
                    var $editDialog = $("#" + editDialogId);
                    checkboxBinding($editDialog);
                    //判断该角色目前擁有的功能並勾選對應的checkBox
                    $.get(configMap.findRoleFunctionListAPi, data).then(function (response) {
                        if ("0" === response.code) {
                            var funcIdList = response.result.funcIdList;
                            $.each(funcIdList, function (i, v) {
                                $funcGroup.find("[name='funcIdList'][value=" + funcIdList[i] + "]").prop('checked', true);
                            });
                        }
                    });
                }
            });
        stateMap.editDialog.open();
    };
    onDeleteClick = function (id) {
        var rowData = jqueryMap.$jqGrid.jqGrid('getRowData', id);
        jqueryMap.$deleteContent.data("rowData", rowData);
        var $message = jqueryMap.$deleteContent.find("#message");
        $message.html("");
        jqueryMap.$deleteContent.find("#deleteData").html(rowData.roleName);
        stateMap.deleteDialog.open();
    };

    addQueryTopEvent = function () {
        $('#queryForm').on('click', function () {
            stateMap.jqGridOption.url = configMap.formQueryApi + "?roleName=" + $("#queryInput").val();
            mv.reloadJqGrid(stateMap.jqGridOption);
        });

        $('#clearForm').on('click', function () {
            licoSetting.onClearForm();
            stateMap.jqGridOption.url = configMap.formQueryApi;
            mv.reloadJqGrid(stateMap.jqGridOption);
        });
    };
    getCaption = function () {
        var $caption = $(configMap.caption_html);
        $caption.find("label.input").html(configMap.captionText);
        $caption.find("#doAddAction").click(onAddClick);
        return $caption[0].outerHTML;
    };
    initJqGrid = function () {
        stateMap.jqGridOption = {
            colunmName: ['序号', '角色名称', '角色权限', '建立时间', '建立者', '修改时间', '修改者', '功能'],
            colunmModel: [
                {
                    name: "id", index: "id", width: 1, sortable: true, align: 'center'
                },
                {
                    name: "roleName", index: "roleName", width: 1, sortable: true, align: 'center'
                },
                {
                    name: "displayFunctions", index: "displayFunctions", width: 2, sortable: false, align: 'left'
                },
                {
                    name: "createDate", index: "createDate", width: 1, sortable: true, align: 'center'
                },
                {
                    name: "createUser", index: "createUser", width: 1, sortable: true, align: 'center'
                },
                {
                    name: "updateDate", index: "updateDate", width: 1, sortable: true, align: 'center'
                },
                {
                    name: "updateUser", index: "updateUser", width: 1, sortable: true, align: 'center'
                },
                {
                    name: 'operation',
                    index: 'operation',
                    sortable: false,
                    title: false,
                    align: 'center',
                    classes: 'white-space-no',
                    width: 2,
                    formatter: function (cellValue, options, rowObject) {
                        var id = rowObject.id;
                        return "<button class='btn btn-sm btn-primary' onclick='roleSetting.onEditClick(" + id + ");'>编辑</button>" +
                            " / <button class='btn btn-sm btn-danger' onclick='roleSetting.onDeleteClick(" + id + ");'>删除</button>";
                    }
                }
            ],
            caption: getCaption(),
            url: configMap.formQueryApi,
            jqgrid: jqueryMap.$jqGrid,
            pager: '#pjqgrid',
            sortname: 'id',
            formObj: $("#form"),
            sortorder: "asc"
        };
        mv.jqgrid(stateMap.jqGridOption);
    };

    init = function () {
        initJqGrid();
        addQueryTopEvent();
        stateMap.addDialog = new dialog({
            title: configMap.addDialogTitle,
            width: 600,
            height: 600
        }, {
            content: jqueryMap.$addContent, submitHandler: onAddSubmitClick
        });
        stateMap.editDialog = new dialog({
            title: configMap.editDialogTitle,
            width: 600,
            height: 600
        }, {
            content: jqueryMap.$editContent, submitHandler: onEditSubmitClick
        });
        stateMap.deleteDialog = new dialog({
            title: configMap.deleteDialogTitle
        }, {
            content: jqueryMap.$deleteContent, submitHandler: onDeleteSubmitClick
        });
    };

    getAllFuncList = function () {
        return $.get(configMap.getAllFuncListAPi, {id: ""});
    };

    checkboxBinding = function ($funcGroup) {
        console.log($funcGroup);
        $funcGroup.find("input[name='funcIdList']").on('click', function (event) {
            var funcId = event.target.value;
            var parentId = event.target.dataset.parentId;
            var isChecked = event.target.checked;
            if (parentId != null) {
                // 至少一個子項目勾選 就勾選母項目
                // 不是0個子項目被勾選
                var isNotZeroChildChecked = $funcGroup.find("input[name='funcIdList'][data-parent-id='" + parentId + "']:checked").size() != 0;
                $funcGroup.find("input[name='funcIdList'][value='" + parentId + "']").prop('checked', isNotZeroChildChecked);
            } else {
                // 母項目被勾選或被取消勾選時  子項目全部同步
                $funcGroup.find("input[name='funcIdList'][data-parent-id='" + funcId + "']").prop('checked', isChecked);
            }
        });

    };

    return {
        init: init,
        onAddClick: onAddClick,
        onEditClick: onEditClick,
        onDeleteClick: onDeleteClick
    }
})();