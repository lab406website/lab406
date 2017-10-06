/**
 * Created by Administrator on 2016/8/12.
 */

$(function(){
    my_table('2014/08/26', 'my_date', function(d) {
        console.log(d.now_date)
    });

    var schedual=new SchedualDo();            //为了方便传更多的初始化参数
})

function my_table(e, f, callback) { /*e参数格式为y/m/d,必填传入now则获得今天的日历,f为载入容器的ID,callback为回调内容，会返回一些可能需要参数*/
    if (e == 'now') e = GetDateStr(0);
    var now_date = e;
    var week_no = new Date(now_date).getDay();
    var date_size = getCountDays(now_date);
    var my_date = document.getElementById(f);
    //my_date.innerHTML = '<p><label id="pre_date"><</label>' + now_date.split('/')[0] + '年' + now_date.split('/')[1] + '月<label id="n_date">></label></p><table border="1"><thead><tr><td>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td></tr></thead><tbody><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tbody></table>';

    var nData={
        year:now_date.split('/')[0],
        month:now_date.split('/')[1]
    };
    var htmll=template('time',nData);
    my_date.innerHTML=htmll;

    var tbody = my_date.getElementsByTagName('tbody')[0];
    var td = tbody.getElementsByTagName('td');
    var pre_date = now_date.split('/');
    pre_date[1] = Number(pre_date[1]) - 1;
    if (pre_date[1] < 1) {
        pre_date[0] = Number(pre_date[0]) - 1;
        pre_date[1] = 12;
    };
    if (pre_date[1] < 10) {
        pre_date[1] = '0' + pre_date[1]
    };
    pre_date = pre_date[0] + '/' + pre_date[1] + '/' + pre_date[2];
    var pre_week_no = new Date(pre_date).getDay();
    var pre_date_size = getCountDays(pre_date);
    var n_date = now_date.split('/');
    n_date[1] = Number(n_date[1]) + 1;
    if (n_date[1] > 12) {
        n_date[0] = Number(n_date[0]) + 1;
        n_date[1] = 1;
    };
    if (n_date[1] < 10) {
        n_date[1] = '0' + n_date[1]
    };
    n_date = n_date[0] + '/' + n_date[1] + '/' + n_date[2];
    var n_week_no = new Date(n_date).getDay();
    var n_date_size = getCountDays(n_date);
    var data = {}; //回调返回数据
    data.now_date = now_date;
    data.week_no = week_no;
    data.date_size = date_size;
    data.my_date = my_date;
    data.pre_date = pre_date;
    data.pre_week_no = pre_week_no;
    data.n_week_no = n_week_no;
    data.n_date_size = n_date_size;
    for (i = 0; i < date_size; i++) {
        td[(week_no + i)].innerHTML = (i + 1);
        if ((week_no + i) == week_no + Number(now_date.split('/')[2])) {
            td[(week_no + i - 1)].style.color = 'red';
        };
    };
    for (i = 0; i < week_no; i++) {
        td[i].innerHTML = (pre_date_size - week_no + i + 1);
        td[i].style.color = '#cccccc';
    }
    for (i = week_no + date_size, j = 1; i < 42; i++, j++) {
        td[i].innerHTML = j;
        td[i].style.color = '#cccccc';
    }
    if(callback)callback(data);

    document.getElementById('pre_date').onclick = function() {  //上一个月
        var ntitle = this.parentNode.innerText.split('年');
        var y = ntitle[0];
        y = y.split('<');
        y = y[1];
        var m = ntitle[1];
        m = m.split('月');
        m = m[0];
        m = m - 1;
        if (m <= 0) {
            m = 12;
            y = y - 1;
        };
        if (m < 10) {
            m = '0' + m;
        }
        my_table(y + '/' + m + '/01', f);
    }

    document.getElementById('n_date').onclick = function() {    //下一个月
        var ntitle = this.parentNode.innerText.split('年');
        var y = ntitle[0];
        y = y.split('<');
        y = y[1];
        var m = ntitle[1];
        m = m.split('月');
        m = m[0];
        m = Number(m) + 1;
        if (m > 12) {
            m = 1;
            y = Number(y) + 1;
        };
        if (m < 10) {
            m = '0' + m;
        }
        my_table(y + '/' + m + '/01', f);
    }

    function getCountDays(e) { //获取当前日期所在的月有多少天
        var curDate = new Date(e);
        var curMonth = curDate.getMonth();
        curDate.setMonth(curMonth + 1);
        curDate.setDate(0);
        return curDate.getDate();
    };

    function GetDateStr(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = dd.getMonth() + 1; //获取当前月份的日期
        var d = dd.getDate();
        return y + "/" + m + "/" + d;
    };
}

;(function($){  ///这样写的意义是思路比较清晰
    var SchedualDo=function(){
        var self=this;
        console.log(";dfdfd");
        self.val;

        $(document).on("click","#table-time tbody td",function(event){
            self.val=$(this).text();
            self.poptime();
        })

        $(".specialB").click(function () {
            self.popspecial();
        })

        //关闭事件
        //$(document).on("click",".close",function(event){
        //        $(".mask").fadeOut(300,function(){
        //            $(this).remove();
        //        })
        //        $(this).parent().parent().fadeOut(300,function(){
        //            $(this).remove();
        //        })
        //});

        //strartScroll();
    };
    SchedualDo.prototype={
        poptime:function(){
            var self=this;
            self.yearmonth=$("#watchtime").text().substring(0);
            var data={
                yearmonth:self.yearmonth,
                day:self.val
            };
            var html=template('Tpopstation',data);
            $("body").append(html);
            var mask='<div class="mask"></div>';
            $("body").append(mask);
            $(".mask").fadeIn(200);
            $(".schedual-mng-popStation").fadeIn(400);


            //进行事件绑定
            $(".close").click(function () {
                $(".mask").fadeOut(300,function(){
                    $(this).remove();
                })
                $(this).parent().parent().fadeOut(300,function(){
                    $(this).remove();
                })
            })
            //绑定滚动条
            self.startScroll();
        },
        startScroll:function(){
            var self=this;
            $(window).on("load",function(){
                $(".scroll").mCustomScrollbar();
            });

            $(".scroll").mCustomScrollbar({
                axis:"y", // horizontal scrollbar
                theme:"minimal-dark"
            });
        },
        popspecial:function(){
            var self=this;
            var data={
            };
            var html=template('Tpopspecial',data);
            $("body").append(html);
            var mask='<div class="mask"></div>';
            $("body").append(mask);
            $(".mask").fadeIn(200);
            $(".popspecial").fadeIn(400);

            //进行Common事件绑定
            $(".close").click(function () {
                $(".mask").fadeOut(300,function(){
                    $(this).remove();
                })
                $(this).parent().parent().fadeOut(300,function(){
                    $(this).remove();
                })
            })

            //+绑定
            $(".popspecial .carman-add").click(function(){
                console.log("添加司机")
                self.popcarman_add();
            })
            $(".popspecial .car-add").click(function(){
                $(".car").append();
                self.popcar_add();
            })
            //绑定滚动条
            self.startScroll();
        },
        popcarman_add:function(){
            var data={
                title:"添加司机",
                first:"姓名",
                second:"备注:",
            };
            var html=template("Tpopcarman-add",data);
            $("body").append(html);
            $(".popcarman-add").fadeIn(200);
            $(".popcarman-add .close").click(function () {
                $(this).parent().parent().fadeOut(300,function(){
                    $(this).remove();
                })
            })
        },
        popcar_add:function(){
            var data={
                title:"添加车辆",
                first:"行驶证",
                second:"备&nbsp;&nbsp;&nbsp;&nbsp;注:"
            };
            var html=template("Tpopcarman-add",data);
            $("body").append(html);
            $(".popcarman-add").fadeIn(200);
            $(".popcarman-add .close").click(function () {
                $(this).parent().parent().fadeOut(300,function(){
                    $(this).remove();
                })
            })
        },
        startScroll:function(){
            var self=this;
            $(window).on("load",function(){
                $(".scroll").mCustomScrollbar();
            });

            $(".scroll").mCustomScrollbar({
                axis:"y", // horizontal scrollbar
                theme:"minimal-dark"
            });
        }
    }
    window["SchedualDo"]=SchedualDo;
})(jQuery);