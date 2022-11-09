(function($){
    $(function(){
        $('#audit_date').datetimepicker({
            "allowInputToggle": true,
            "showClose": true,
            "showClear": true,
            "showTodayButton": true,
            "format": "DD/MM/YYYY HH:mm:ss",
        });
        $('#eat_date').datetimepicker({
            "allowInputToggle": true,
            "showClose": true,
            "showClear": true,
            "showTodayButton": true,
            "format": "DD/MM/YYYY HH:mm:ss",
        });
    });
})(jQuery);
