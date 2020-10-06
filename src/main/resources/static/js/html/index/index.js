var indexJs = (function () {
    var configMap = {
        socketPath: "127.0.0.1",
        socketPort: "9091"
    }, stateMap = {
        chatSocket: null,
        guestName: null,
        isTest: false,
        isRedirectOtherPage: false,
        socketIntervalId: null,
        port: null,
        connectionAttempts: null,
        isFirst: true,
        userInfo: null
    }, init, initWsConnection, connectHandler, disconnectHandler, messageHandler;

    /*   initWsConnection = function () {
           console.log('初始化执行');
           let socketObj = {
               transport: ['websocket'],
               query: stateMap.userInfo,
               autoConnect: false,
               reconnection: false,
               forceNew: true
           };
           //连线地址
           let socketUrl = configMap.socketPath + ":" + configMap.socketPort;
           stateMap.chatSocket = io.connect(socketUrl, socketObj);
           stateMap.chatSocket.on('connect', connectHandler);
           stateMap.chatSocket.on('disconnect', disconnectHandler);
           stateMap.chatSocket.on('message', messageHandler);

           //如果socket没有连线 则进行连线
           if (!stateMap.chatSocket.connected) {
               stateMap.chatSocket.open();
           }
           //是不是为第一次连线
           if (stateMap.isFirst) {
               disconnectHandler();
               stateMap.isFirst = false;
           }

       };*/

    /*  connectHandler = function () {
          clearInterval(stateMap.socketIntervalId);
      };*/


    /*disconnectHandler = function () {
        console.log('ws disconnect !!! status:' + stateMap.chatSocket.connected);
        let connectionCount = 0;  //初始化嘗試連線次數
        if (!stateMap.chatSocket.connected) {

            stateMap.socketIntervalId = setInterval(function () {
                //不確定io.connect是不是非同步，般上來先檢查，
                console.log('是否需重新連線:' + !stateMap.chatSocket.connected);
                if (stateMap.chatSocket.connected) {
                    clearInterval(stateMap.socketIntervalId);
                    return;
                }
                console.log('嘗試重新連線第' + connectionCount + "次數");
                //如果大於幾次則進行刪除host的動作
                /!*  if (connectionCount >= 3) {
                      stateMap.deleteServerHost();
                  }*!/
                stateMap.chatSocket.off('connect');
                stateMap.chatSocket.off('disconnect');
                stateMap.chatSocket.off('message');
                initWsConnection();   //重新連線
                connectionCount += 1;
            }, 1000);
        } else {
            clearInterval(stateMap.socketIntervalId);
        }


    };*/

    /* messageHandler = function (data) {
         console.log("Message received  = " + data);
         switch (data.cmd) {
             case 'ForceKickOut': {
                 clearInterval(stateMap.socketIntervalId);
                 console.log("強制登出");
                 if (data.jsonResult.userId == stateMap.userInfo.id) {
                     alert('侦测到账号已由其他地方进行登入，请重新登入');
                 }
                 document.location = "doLogout";
                 break;
             }
             case 'test': {

                 break;
             }
             case 'NEW_TRANSACTION_RECORD': {
                 clearInterval(stateMap.socketIntervalId);
                 console.log("新的交易纪录");
                 if (data.jsonResult.userId == stateMap.userInfo.id) {
                     let option = noticeBar.getOption
                     option.title = "通知";
                     option.message = "您有一笔新的订单，请注意查收";
                     option.longDoesIt = 5000;
                     noticeBar.createSuccessfulBar(option);
                 }
             }
             default: {
                 break;
             }
         }

     };*/

    init = function () {
        console.log("index loading ");
        stateMap.userInfo = window.user;

        $("#doLogOut").text(window.user.account);
        $(".info-card-text").find("#nikeName").text(window.user.nikeName);
        $(".info-card-text").find("#memberEmail").text(window.user.email);

        //左边横幅栏位初始化
        $(".info-card").find("#nikeName").text(window.user.nikeName);

    };
    return {
        init: init,
        getUserInfo: function () {
            return stateMap.userInfo;
        }
    }
})();


