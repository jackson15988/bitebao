var systemConfigSetting = (function () {
    var configMap = {
        caption_html: '',
        clearCache: 'rest/systemConfig/cache/ALL'
    }, stateMap = {
        jqGridOption: {},
        startTimeOption: null,
        systemKindsObj: [],
        jqGridOptions: null
    }, jqueryMap = {
        $jqGrid: $("#jqgrid"),
        $changeSortBtnContainer: null
    }, init, successFun, resolutionsCheckBox;


    getCaption = function () {
        return configMap.caption_html;
    };


    successFun = function (result) {
        if (result.status == 200) {
            swal({text: result.message, type: "success"});
        } else {
            mv.showErrorMsg(result, sysForm);
        }
    };


    init = function () {

        $("#save").on('click', function () {
            var $form = $("#sysForm");
            console.log($form.serialize());

            var saveOption = {
                url: "rest/systemConfig/doSaveAction",
                type: 'post',
                formObj: $form,
                async: true,
                success: successFun
            };
            mv.ajax(saveOption);
            document.getElementById("RESOURCE_STATION_PEM_KEY").value = "";
        });


        $("#clearCache").on('click', function () {
            $.delete(configMap.clearCache).then(function (response) {
                if (response.code === "0") {
                    swal({text: "清除快取成功", type: "success"});
                }
            });
        });

        $("#resolutions").find('input[type=checkbox]').on('click', function () {
            let resolutionsData = "";
            $("#resolutions").find('input[type=checkbox]').each(function () {
                if ($(this).prop('checked') === true) {
                    resolutionsData = resolutionsData + $(this).val().toString() + ','
                }
            });
            resolutionsData = resolutionsData.slice(0, -1);
            $('#FFMPEG_RESOLUTIONS').attr('value', resolutionsData);
            console.log('最終結果:' + resolutionsData);
        });


    };
    return {
        init: init,
        resolutionsCheckBox: resolutionsCheckBox
    }
})
();