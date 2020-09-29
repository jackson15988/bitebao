var autoPayAtCommon = (function () {
    var stateMap = {
        onChangeCallBackFunction: null
    }, initVirtualAccountSelect2, changeVirtualAccount, isVirtualAccount;
    initVirtualAccountSelect2 = function ($container, virtualAccountData, isShowAllOption, isCreateOnChangeEvent, onChangeCallBackFunction) {
        var allOption = {
            id: "All",
            text: "全部",
            selected: true,
        };
        var data = virtualAccountData.map(function (virtualAccount) {
            return {
                id: virtualAccount.id,
                text: virtualAccount.cardNo + "(" + virtualAccount.merchantName + ")",
            }
        });
        if (isShowAllOption) {
            data.unshift(allOption);
        }
        if (isCreateOnChangeEvent) {
            stateMap.onChangeCallBackFunction = onChangeCallBackFunction;
        }
        return new select2Module($container, {
            isMultiple: false,
            data: data,
            isCreateOnChangeEvent: isCreateOnChangeEvent,
            changeVirtualAccount: changeVirtualAccount
        })
    };
    isVirtualAccount = function (accountNo) {
        return accountNo.length === 22;
    }
    changeVirtualAccount = function (value) {
        if (typeof stateMap.onChangeCallBackFunction === "function") {
            stateMap.onChangeCallBackFunction(value);
        }
    };

    return {
        initVirtualAccountSelect2: initVirtualAccountSelect2,
        isVirtualAccount: isVirtualAccount
    }
})();