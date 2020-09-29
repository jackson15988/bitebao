$(function () {
    var withoutLoaderUrls = [
        "trans/status",
        "find",
        "rest/systemConfig",
        "get",
        "rest/client/clients",
        "rest/systemLogs/doKindQueryAction",
        "rest/transLog/transLogKind"
    ];
    var progressLoaderHtml =
        "<div id='progressLoader'>" +
        "   <div class='progress' id='progressDiv'>" +
        '      <div class="bar" id="bar"></div>' +
        '      <div class="percent" id="percent">0%</div>' +
        '   </div>' +
        '</div>';
    let $progressLoader = $(progressLoaderHtml);
    $progressLoader.css({
        position: "fixed",
        top: 0,
        "z-index": 10000,
        width: "100%",
        height: "100%",
        "background-color": "rgba(0, 0, 0, .5)",
        display: "none"
    });

    var preLoaderHtml =
        "<div id='preLoader'>" +
        '   <h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>' +
        '</div>';
    let $preLoader = $(preLoaderHtml);

    $preLoader.find(".ajax-loading-animation").css({
        position: "relative",
        top: "50%",
        left: "50%"
    });

    $preLoader.css({
        position: "fixed",
        top: 0,
        "z-index": 10000,
        width: "100%",
        height: "100%",
        "background-color": "rgba(0, 0, 0, .5)",
        display: "none"
    });

    var isShowLoader = function (url) {
        var result = true;
        //some如果return true則會中斷迴圈，相當於break;
        withoutLoaderUrls.some(function (withoutLoaderUrl) {
            if (url.indexOf(withoutLoaderUrl) !== -1) {
                result = false;
                return true;//若有找到則回傳true，終止迴圈
            }
        });
        return result;
    };
    $("body").prepend($progressLoader).prepend($preLoader);
    $.ajaxSetup({
        beforeSend: function (xhrObj, ajaxOption) {
            var url = ajaxOption.url;
            if (isShowLoader(url)) {
                $('#preLoader').css('display', 'block');
            }
        }, complete: function (a, b, c) {
            var url = this.url;
            if (isShowLoader(url)) {
                $('#preLoader').css('display', 'none');
            }
        }
    });
    window.loaderUtil = {};
    loaderUtil.showProgressLoader = function () {
        $('#progressLoader').css('display', 'block');
    };
    loaderUtil.closeProgressLoader = function () {
        $('#progressLoader').css('display', 'none');
    }
});
