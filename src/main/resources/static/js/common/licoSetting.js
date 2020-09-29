var licoSetting = (function () {
    var configMap = {}, stateMap = {}, jqueryMap = {},
        onClearForm;

    onClearForm = function ($resetObj, $onClickObj) {
        if (!$onClickObj) {
            if (!$resetObj) {
                $resetObj = $("#form");
            }
            $resetObj.trigger("reset");
        }
    };

    return {
        onClearForm: onClearForm
    }
})();