/**
 * Created by Administrator on 2016/8/15.
 */
$(function () {
    var System_mng1=new System_mng();
})

;(function ($) {
    var System_mng=function(){
        var self=this;
        console.log("开始了插件");
        //绑定站点点击事件
        $(document).on("click",".stationGraph rect",function(event){
            self.popstationGraph();
        })
    };
    System_mng.prototype={
        popstationGraph:function(){
            var self=this;
            console.log("Nihao");
            var data={
                title:"添加车辆",
                first:"行驶证",
                second:"备&nbsp;&nbsp;&nbsp;&nbsp;注:"
            };
            var html=template("Tpopstationgraph",data);
            $("body").append(html);
            var mask='<div class="mask" style="display: none"></div>';
            $("body").append(mask);

            $(".popstationgraph").fadeIn(200);
            $(".mask").fadeIn(200);
            $(".popstationgraph .close").click(function () {
                $(this).parent().parent().fadeOut(300,function(){
                    $(this).remove();
                })
                $(".mask").fadeOut(200,function(){
                    $(this).remove();
                });
            })
            self.haveDayGraph();
            //面板事件
            $(".dayB").click(function(){
                self.haveDayGraph();

            });
            $(".weekB").click(function(){
                self.haveWeekGraph();

            });
            $(".monthB").click(function(){
                self.haveMonthGraph();

            });
        },
        haveDayGraph:function(){
            var self=this;
            //清除
            $(".allGraph").empty();
            var html='<div id="dayGraph" style="min-width: 310px; height: 400px; margin: 0 auto;display: none;"></div>';
            $(".popstationgraph .popbody .allGraph").append(html);
            $('#dayGraph').fadeIn(200);
            $('#dayGraph').highcharts({
                chart: { zoomType: 'xy' },
                title: { text: '一月份每天站点A乘坐情况' },
                xAxis: [{
                    categories: [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30' ],
                    crosshair: true
                }],
                yAxis: [{ // Primary yAxis
                    labels: {
                        format: '{value}%',
                        style: {
                            color: Highcharts.getOptions().colors[2]
                        }
                    },
                    title: {
                        text: '乘坐率',
                        style: {
                            color: Highcharts.getOptions().colors[2]
                        }
                    },
                    opposite: true

                }, { // Secondary yAxis
                    gridLineWidth: 0,
                    title: {
                        text: '乘坐人数',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    labels: {
                        format: '{value} 人',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    }
                }],
                tooltip: {
                    shared: true
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    x: 80,
                    verticalAlign: 'top',
                    y: 55,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                },
                series: [{
                    color: '#434348',
                    name: '乘坐人数',
                    type: 'column',
                    yAxis: 1,
                    data: [49, 71, 106, 34, 129, 144, 176, 135, 148, 216, 194, 95, 54, 106, 129, 144, 176, 135, 148, 216, 194, 95, 54, 106, 129, 144, 176, 135, 148, 216, 194, 95],
                    tooltip: {
                        valueSuffix: ' 人'
                    }
                }, {
                    name: '乘坐率',
                    type: 'spline',
                    data: [7.0, 6.9, 2.4, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9],
                    tooltip: {
                        valueSuffix: ' %'
                    }
                }]
            });
        },
        haveWeekGraph:function(){
            var self=this;
            //清除
            $(".allGraph").empty();
            var html='<div id="weekGraph" style="min-width: 310px; height: 400px; margin: 0 auto"></div>';
            $(".popstationgraph .popbody .allGraph").append(html);
            $('#weekGraph').fadeIn(200);
            $('#weekGraph').highcharts({
                chart: { zoomType: 'xy' },
                title: { text: '第一季度每周站点A乘坐情况' },
                xAxis: [{
                    categories: [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13' ],
                    crosshair: true
                }],
                yAxis: [{ // Primary yAxis
                    labels: {
                        format: '{value}%',
                        style: {
                            color: Highcharts.getOptions().colors[2]
                        }
                    },
                    title: {
                        text: '乘坐率',
                        style: {
                            color: Highcharts.getOptions().colors[2]
                        }
                    },
                    opposite: true

                }, { // Secondary yAxis
                    gridLineWidth: 0,
                    title: {
                        text: '乘坐人数',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    labels: {
                        format: '{value} 人',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    }
                }],
                tooltip: {
                    shared: true
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    x: 80,
                    verticalAlign: 'top',
                    y: 55,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                },
                series: [{
                    color: '#90ED7D',
                    name: '乘坐人数',
                    type: 'column',
                    yAxis: 1,
                    data: [49, 71, 106, 129, 144, 176, 135, 148, 216, 194, 95, 54, 92],
                    tooltip: {
                        valueSuffix: ' 人'
                    }
                }, {
                    name: '乘坐率',
                    type: 'spline',
                    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6 , 23.4],
                    tooltip: {
                        valueSuffix: ' %'
                    }
                }]
            });
        },
        haveMonthGraph:function(){
            var self=this;
            //清除
            $(".allGraph").empty();
            var html='<div id="monthGraph" style="min-width: 310px; height: 400px; margin: 0 auto"></div>';
            $(".popstationgraph .popbody .allGraph").append(html);
            $('#monthGraph').fadeIn(200);
            $('#monthGraph').highcharts({
                chart: { zoomType: 'xy' },
                title: { text: '一年内每月站点A乘坐人数' },
                xAxis: [{
                    categories: [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12' ],
                    crosshair: true
                }],
                yAxis: [{ // Primary yAxis
                    labels: {
                        format: '{value}%',
                        style: {
                            color: Highcharts.getOptions().colors[2]
                        }
                    },
                    title: {
                        text: '乘坐率',
                        style: {
                            color: Highcharts.getOptions().colors[2]
                        }
                    },
                    opposite: true

                }, { // Secondary yAxis
                    gridLineWidth: 0,
                    title: {
                        text: '乘坐人数',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    labels: {
                        format: '{value} 人',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    }
                }],
                tooltip: {
                    shared: true
                },
                legend: {
                    layout: 'vertical',
                    align: 'left',
                    x: 80,
                    verticalAlign: 'top',
                    y: 55,
                    floating: true,
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                },
                series: [{
                    color: '#F7A35C',
                    name: '乘坐人数',
                    type: 'column',
                    yAxis: 1,
                    data: [49, 71, 106, 129, 144, 176, 135, 148, 216, 194, 95, 54],
                    tooltip: {
                        valueSuffix: ' 人'
                    }
                }, {
                    name: '乘坐率',
                    type: 'spline',
                    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
                    tooltip: {
                        valueSuffix: ' %'
                    }

                }]
            });
        }
    };
    window["System_mng"]=System_mng;
})(jQuery)