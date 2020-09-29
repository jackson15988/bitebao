$(function () {
    jQuery.each([{"post": "POST"}, {"delete": "DELETE"}, {"put": "PUT"}, {"patch": "PATCH"}, {"get": "GET"}, {"syncGet": "GET"}], function (i, obj) {
        $.each(obj, function (key, val) {
            jQuery[key] = function (url, data, successHandler) {
                // url = window.contextPath + url;
                if (jQuery.isFunction(data)) {
                    error = success;
                    success = data;
                    data = undefined;
                }
                var ajaxData = val === "GET" ? data : JSON.stringify(data);
                var async = key !== "syncGet";
                return jQuery.ajax({
                    url: url,
                    type: val,
                    contentType: "application/json",
                    data: ajaxData,
                    success: successHandler,
                    async: async,
                    headers: {
                        'token': localStorage.getItem("token"),
                        'terminal': "PC"
                    }
                });
            };
        });
    });
});

