/**
 * Created by Administrator on 2016/5/21.
 */
;(function($, window, document,undefined) {
    //定义Popwin的构造函数
    var Map = function(ele, opt) {
        var self=this;
        this.$element = ele,             //这里传过来的是jquery对象!!!!!!!!!!!!!!代表a
            this.defaults = {
                'color': 'red',
                'fontSize': '12px',
                'textDecoration': 'none'
            },
            this.options = $.extend({}, this.defaults, opt);             //合并默认和用户配置
        /*this.input_init();*/
    }
    //定义Popwin的方法
    Popwin.prototype = {
        tips:function(){
            var self=this;
        }
    }
    window["Map"]=Map;      //这里将插件暴露出去，可以实例化
})(jQuery, window, document);