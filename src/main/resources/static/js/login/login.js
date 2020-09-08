var login = (function () {
    var stateMap = {//state是聲明的意思也是宣告的意思，會因為程式邏輯而改變的全域變數，且是共用的變數，請放在stateMap，
        pageAdData: null,
        nowPage: null
    }, init, findCarouseAdlList, findPageAdlList, onScrollToBottom;
    //初始化統一命名init
    init = function () {
        findCarouseAdlList().then(function (resp) {
            carousel.init($(".swiper-container"), {
                carouselData: resp
            });
        });

        findPageAdlList()
            .done(function (pageAdData) {
                stateMap.pageAdData = pageAdData;  //存廣告圖片
                var option = {
                    size: 8,
                    firstSize: 8,
                    triggerDistance: 20,
                    onScrollToBottom: onScrollToBottom
                };
                scrollLoad.init(option);
            });
    };


    onScrollToBottom = function (page, size) {

        var videoChannelArray = navBar.getData();
        var IntegerPage = parseInt(page);
        var videoChannelArrayLength = videoChannelArray.length;
        if (IntegerPage < videoChannelArrayLength) { //回覆頁碼比影片類別長度小代表影片類別還沒全部載入
            var videoChannelId = videoChannelArray[IntegerPage].id;
            var videoChannelName = videoChannelArray[IntegerPage].name;
            var conditionData = {
                page: "0", //首頁因為只查每個影片類別的前八筆，因此page固定為0去查詢，而onScrollToBottom回傳的page當作conditionValue
                size: size,
                channelId: videoChannelId
            };
            return $.get("/rest/mvVideo/findGridVideoList", conditionData, function (response) {
                var gridVideoData = response.result;
                var $listBox = $(".listbox");
                var gridVideoOption = {
                    gridVideoData: gridVideoData,
                    videoChannelId: videoChannelId,
                    videoChannelName: videoChannelName,
                    isShowMoreHref: true
                };

                if (0 === IntegerPage) {
                    gridVideoOption.isEmptyGridVideoDiv = true; //第一次生成isEmptyGridVideoDiv為true
                } else {
                    gridVideoOption.isEmptyGridVideoDiv = false; //非第一次生成isEmptyGridVideoDiv為true
                }
                gridVideo.init($listBox, gridVideoOption);
                //插入廣告圖片

                findPageAdlList()
                    .done(function (pageAdData) {
                        stateMap.pageAdData = pageAdData;  //存廣告圖片
                    });

                pageAdBlock.init($listBox, {
                    pageAdData: stateMap.pageAdData.result
                });
            });
        } else { //回覆頁碼比影片類別長度大代表已經跑完所有影片類別了，因此不需要scrollLoad事件
            scrollLoad.destroy();
        }
    };

    //取得要輪播的廣告圖片清單
    findCarouseAdlList = function () {
        return $.get("/rest/mvSiteAd/findAdList", {siteAdType: "CAROUSEL_AD"});
    };

    //取得靜態的廣告圖片清單
    findPageAdlList = function () {
        return $.get("/rest/mvSiteAd/findOneRandAdBanner");
    };

    //需要開放成public的function寫在這，key是對外的名稱
    return {
        init: init
    }
})();