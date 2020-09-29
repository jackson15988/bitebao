var commonUtil = (function () {
    var stateMap = {
            intervalIds: []
        }, getUrlParameter, parserPathWithContext, loadScript, loadScriptArray, parseSelect2DataToDto, generateUUID,
        getChannelsSortBySortValue, getTransferOrderStatusText, clearPageTimer, getTransactionTypeText,
        getTransactionDebitFlagText, getTransactionStatusText, getVirtualAccountTypeText;

    //代數參數名稱取值url?name=
    getUrlParameter = function (name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    parserPathWithContext = function (path) {
        if (path.startsWith("http")) {
            return path;
        } else {
            return window.contextPath + path;
        }
    };

    loadScript = function (src, callBack) {
        if (jsArray[src]) {
            callBack && (debugState && root.root.console.log("This script was already loaded %c: " + src + " %c:this script will reload!!", debugStyle_warning, debugStyle_success));
            $("script[src='" + src + "']").remove();
            console.log("清除pageTimer");
        }
        jsArray[src] = !0;
        var c = document.getElementsByTagName("body")[0], script = document.createElement("script");
        script.async = false;
        script.type = "text/javascript", script.src = src, script.onload = callBack, c.appendChild(script)
    };

    loadScriptArray = function (srcArray) {
        clearPageTimer();
        srcArray.forEach(function (src) {
            loadScript(src, function () {
            })
        })
    };

    parseSelect2DataToDto = function (select2Data) {
        return select2Data.map(function (selectedValue) {
            var isNewIndex = selectedValue.indexOf("_isNew");
            var dto = {};
            if (isNewIndex !== -1) {
                dto.name = selectedValue.substring(0, isNewIndex);
            } else {
                dto.id = selectedValue
            }
            return dto
        });
    };

    generateUUID = function () {
        let d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    };

    getChannelsSortBySortValue = function (array) {
        array = array.sort(function (a, b) {
            return a.sortValue - b.sortValue;
        });
        return array;
    };

    getTransferOrderStatusText = function (orderStatus, purpose) {
        if ("处理中" === orderStatus || "PROCESSING" === orderStatus) {
            if ("select" === purpose) {
                return "处理中";
            } else {
                return "<span style='color:green;'>处理中</span>"
            }
        } else if ("成功" === orderStatus || "SUCCESS" === orderStatus) {
            if ("select" === purpose) {
                return "成功";
            } else {
                return "<span style='color:blue;'>成功</span>"
            }
        } else if ("失败" === orderStatus || "FAILURE" === orderStatus) {
            if ("select" === purpose) {
                return "失败";
            } else {
                return "<span style='color:red;'>失败</span>"
            }
        } else {
            if ("select" === purpose) {
                return "拒绝";
            } else {
                return "<span style='color:red;'>拒绝</span>"
            }
        }
    };

    getTransactionTypeText = function (transactionType) {
        if ("WITHDRAW" === transactionType) {
            return "对外提现"
        } else if ("CHARGE_FEE" === transactionType) {
            return "手续费收取"
        } else if ("TOP_UP" === transactionType) {
            return "充值"
        } else if ("VIRTUAL_ACCOUNT_TRANSFER" === transactionType) {
            return "虚户互转"
        } else {
            return "其他状态值"
        }
    };

    getTransactionDebitFlagText = function (transactionType) {
        if ("INCOME" === transactionType) {
            return "收入"
        } else {
            return "支出"
        }
    };

    getTransactionStatusText = function (transactionStatus, purpose) {
        if ("PROCESSING" === transactionStatus || "处理中" === transactionStatus) {
            if ("select" === purpose) {
                return "处理中";
            } else {
                return "<span style='color:green;'>处理中</span>"
            }
        } else if ("SUCCESS" === transactionStatus || "成功" === transactionStatus) {
            if ("select" === purpose) {
                return "成功";
            } else {
                return "<span style='color:blue;'>成功</span>"
            }
        } else if ("FAILURE" === transactionStatus || "失败" === transactionStatus) {
            if ("select" === purpose) {
                return "失败";
            } else {
                return "<span style='color:red;'>失败</span>"
            }
        } else {
            if ("select" === purpose) {
                return "转入退款";
            } else {
                return "<span style='color:red;'>转入退款</span>"
            }
        }
    };

    getVirtualAccountTypeText = function (accountType) {
        if ("COLLECT_MONEY" === accountType || "收款" === accountType) {
            return "收款"
        } else if ("PAY_FOR_ANOTHER" === accountType || "代付" === accountType) {
            return "代付"
        } else if ("SHARE" === accountType || "共用" === accountType) {
            return "共用"
        } else {
            return "其他"
        }
    };

    clearPageTimer = function () {
        stateMap.intervalIds.forEach(function (intervalId) {
            window.clearInterval(intervalId);
        });
        stateMap.intervalIds = [];
    };

    return {
        getUrlParameter: getUrlParameter,
        parserPathWithContext: parserPathWithContext,
        loadScriptArray: loadScriptArray,
        parseSelect2DataToDto: parseSelect2DataToDto,
        generateUUID: generateUUID,
        getChannelsSortBySortValue: getChannelsSortBySortValue,
        getTransferOrderStatusText: getTransferOrderStatusText,
        getTransactionTypeText: getTransactionTypeText,
        getTransactionDebitFlagText: getTransactionDebitFlagText,
        getTransactionStatusText: getTransactionStatusText,
        getVirtualAccountTypeText: getVirtualAccountTypeText,
        //因為setInterval跟window內建的撞名，所以寫在上面另外宣告會蓋掉原本的
        setInterval: function (setIntervalFun, setIntervalTimeout) {
            var intervalId = window.setInterval(setIntervalFun, setIntervalTimeout);
            stateMap.intervalIds.push(intervalId);
            return intervalId;
        },
        //因為clearInterval跟window內建的撞名，所以寫在上面另外宣告會蓋掉原本的
        clearInterval: function (intervalId) {
            const index = stateMap.intervalIds.indexOf(intervalId);
            if (index !== -1) {
                stateMap.intervalIds.splice(index, intervalId);
                window.clearInterval(intervalId);
            }
        }
    }
})();