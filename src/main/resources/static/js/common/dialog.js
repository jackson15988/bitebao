var dialog = function (jqueryDialogOption, option) {
    var configMap = {
        main_html:
            '<div id="moduleDialog" style="display: none">' +
            '   <div class="content"></div>' +
            '   <footer class="btnContainer" style="text-align: center;">' +
            '       <button id="submitBtn" class="btn btn-primary">确认</button>' +
            '       <button id="cancelBtn" class="btn btn-danger" style="margin:0 0 0 10px">取消</button>' +
            '   </footer>' +
            '</div>'
    }, stateMap = {
        jqueryDialogOption: {
            autoOpen: false,
            // width: 500,
            // height: 450,
            modal: true,
            title: '',
            create: function (event, ui) {
                $(event.target).parent().css('position', 'fixed');
            },
        },
        option: {
            content: "",
            submitHandler: null,
            footer: null // default true
        }
    }, jqueryMap = {
        $dialog: null,
        $content: null,
        $footer: null
    }, setJqueryMap, init, changeTitle, open, close, changeContent;
    setJqueryMap = function ($container) {
        jqueryMap.$dialog = $container;
        jqueryMap.$content = jqueryMap.$dialog.find(".content");
        jqueryMap.$footer = jqueryMap.$dialog.find(".btnContainer");
    };
    open = function () {
        jqueryMap.$dialog.dialog('open');
    };
    close = function () {
        jqueryMap.$dialog.dialog('close');
    };
    changeContent = function (content) {
        jqueryMap.$content.html(content);
    };
    changeTitle = function (title) {
        jqueryMap.$dialog.dialog('option', {title: title});
    };
    init = function (option) {
        $.extend(stateMap.option, option);
        jqueryMap.$content.html(option.content);
        if (option.footer === false) {
            $container.find("footer").remove();
        }else if(option.footer === 'onlyCancel'){
            $container.find("footer").find('#submitBtn').remove();
            jqueryMap.$footer.on("click", "#cancelBtn", close);
        }else if(option.footer === 'onlyDetermine'){
            $container.find("footer").find('#cancelBtn').remove();
            jqueryMap.$footer.on("click", "#submitBtn", stateMap.option.submitHandler);
        }else {
            jqueryMap.$footer.on("click", "#submitBtn", stateMap.option.submitHandler);
            jqueryMap.$footer.on("click", "#cancelBtn", close);
        }
    };

    var $container = $(configMap.main_html);
    $("body").append($container);
    setJqueryMap($container);
    $.extend(stateMap.jqueryDialogOption, jqueryDialogOption);

    //加這段 單選select2 才能正常使用搜尋框
    stateMap.jqueryDialogOption.open = function () {
        if ($.ui && $.ui.dialog && !$.ui.dialog.prototype._allowInteractionRemapped && $(this).closest(".ui-dialog").length) {
            if ($.ui && $.ui.dialog && $.ui.dialog.prototype._allowInteraction) {
                var ui_dialog_interaction = $.ui.dialog.prototype._allowInteraction;
                $.ui.dialog.prototype._allowInteraction = function (e) {
                    if ($(e.target).closest('.select2-dropdown').length) return true;
                    return ui_dialog_interaction.apply(this, arguments);
                };
            }
        }
    };

    jqueryMap.$dialog.dialog(stateMap.jqueryDialogOption);
    init(option);
    close();

    return {
        init: init,
        open: open,
        close: close,
        changeTitle: changeTitle,
        changeContent: changeContent
    }
};