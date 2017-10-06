/**
 * Created by Administrator on 2016/6/4.
 */
/**
 * Created by Administrator on 2016/6/2.
 */
//对象级别的插件开发啊啊啊----------必须在页面刷新时重新执行
;(function($){
    var FileOut=function(){
        var self=this;
        //抽取基础DOM主要围绕字符串来使用
        self.pre_btn='.file-out .pre-btn';
        self.next_btn='.file-out .next-btn';
        self.root='.file-body';
        self.root_element='.body-floor';
        self.currentPopwin;
        self.nextPopwin;

        self.currentIndex;
        self.allIndex=self.getAllIndex();

        console.log("当前页面全部个数:"+self.allIndex);
        console.log("调用插件");
        //设置页面中的元素index属濿
        self.setIndex();
        $(".body-floor .file-name span").click(function(event){
            event.stopPropagation();
            //获取当前点击对象的位罿
            self.currentIndex=$(this).parents(self.root_element).attr("index");
            console.log("当前点击为第"+self.currentIndex+"丿");
            self.renderDOM();            //因为暗含了顺序，承以可以无承顾忌的使用，哈哈哈哈
            self.carousel();          //绑定轮播事件，但是还没有特殊匿,
        });

    };
    FileOut.prototype={
        //初步渲染弹窗
        getAllIndex:function(){
            var self=this;
            return $(self.root).children(self.root_element).length;
        },
        setIndex:function(){
            var self=this;
            var num=1;
            $(self.root).children(self.root_element).each(function(){
                $(this).attr("index",num++);
            })
        },
        renderDOM:function(){
            var self=this;
            //获得图片
            var imagePreload = new Image();
            imagePreload.src = '../images/03.jpg';

            var strDom=['<div class="file-out" style="display: none;" >',
                '        <div class="pre-btn pre-bg"></div>',
                '        <!--<div class="clearfix"></div>-->',
                '        <div class="file-body">',
                '            <div class="content">',
                '                <div class="file">',
                '                    <div class="file-thumbnails">',
                '                        <div class="file-name"><img src="../images/03.jpg" alt=""/></div>',                  //这里改成缩略图吧
                //'                        <img src="../images/03.jpg" alt=""/>',                  //这里改成缩略图吧    为什么图片会失效呢

                '                        <div class="file-class">文件类型SQL</div>',
                '                    </div>',
                '                    <div class="file-size">',

                '                        <button class="download">查看文件(4MB)</button>',
                '                    </div>',
                '                </div>',
                '            </div>',
                '            <!--<div class="clearfix"></div>-->',
                '            <div class="attribute">',
                '                <div class="a-info">',
                '                    <div class="a-first">',
                '                        <div class="file-from">所属文件夹:数据庿</div>',
                '                        <div class="a-close">×</div>',
                '                        <div class="clearfix"></div>',
                '                    </div>',
                '                    <div class="file-name">SQLdb_ilearn_3</div>',
                //'                    <div class="collected">收藏釿&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2333</div>',
                '                    <div class="a-third">',
                '                        <div class="file-uptime"><i class="fa fa-clock-o"></i>2013-12-12</div>',
                '                        <div class="file-people"><i class="fa fa-user"></i>上传者-MR.Z</div>',
                '                    </div>',
                '                </div>',
                '                <div class="line"></div>',
                '                <div class="a-operate">',
                '                    <ul>',
                '                        <li><a href="#"><i class="fa fa-download"></i>&nbsp;&nbsp;下载</a></li>',
                '                        <li><a href="#" class="collect"><i class="fa fa-star"></i>&nbsp;&nbsp;收藏</a></li>',
                '                    </ul>',
                '                </div>',
                '                <div class="line"></div>',
                '                <div class="a-related">',
                '                    <ul>',
                '                        <li><a href="#"><i class="fa fa-link"></i>&nbsp;&nbsp;&nbsp;关联内容</a></li>',
                '                        <li><a href="#"><i class="fa fa-tag"></i>&nbsp;&nbsp;&nbsp;标签</a></li>',
                '                    </ul>',
                '                </div>',
                '            </div>',
                '        </div>',
                '        <div class="next-btn"></div>',
                '    </div>'].join("");
            //插入到body节点中
            $("body").append(strDom);           //这里怎么记录当前的这个弹窗呢＿
            self.currentPopwin=$(".file-out");       //记录当前弹窗
            //显示并加入遮罩层
            $(".mask").fadeIn();
            $(".file-out").fadeIn();
            //为close与mask绑定事件
            $(".a-close").on("click",function(event){
                event.stopPropagation();
                $(".file-out").fadeOut();
                $(".mask").fadeOut();
                self.currentPopwin.remove();
            })

            $(".mask").on("click",function(event){
                event.stopPropagation();
                $(".file-out").fadeOut();
                $(".mask").fadeOut();
            })

            //为收藏绑定事件
            self.CollectToCommon();
        },
        CollectToCommon:function(){
            var self=this;
            $(".a-operate .collect").click(function(event){
                var message="常用目录已存在该文件";
                var status="cry";
                self.popwin_tips(message,status);               //没有执行？？？
                console.log("成功收藏");
            })
        },
        popwin_tips:function(message,status){
            var self=this;
            //开始调用弹窗程序
            console.log("调用tip");
            var pop=new Popwin();
            pop.tips(message,status);
        },
        carousel:function(){
            var self=this;
            console.log("轮播启动");
            console.log("当前下标丿"+self.currentIndex);
            //判断可不可以next
            if(self.currentIndex!=self.allIndex){
                $(self.next_btn).css({
                    "display":"block"
                });
                $(this.next_btn).click(function(){
                    self.next();
                })
            }else{
                $(self.next_btn).css({
                    "display":"none"
                })
            }
            //判断可不可以pre
            if(self.currentIndex!=1){
                /*$(self.pre_btn).css({
                 "display":"block"
                 });*/
                $(self.pre_btn).addClass("pre-bg");
                $(this.pre_btn).click(function(){
                    self.pre();
                })
            }else{
                $(self.pre_btn).removeClass("pre-bg");
            }
        },
        next:function(){
            var self=this;
            //改变下标
            self.currentIndex++;
            //将之前的DOM抹去
            self.currentPopwin.fadeOut(200).remove();
            //展示下一个DOM
            self.renderDOM();
            self.carousel();            //这里丿定是下一个DOM   这里很有问题
            self.nextPopwin=$(".file-out");
            self.nextPopwin.fadeIn(200);
        },
        pre:function(){
            var self=this;
            //改变下标
            self.currentIndex--;
            //将之前的DOM抹去
            self.currentPopwin.fadeOut(200).remove();
            //展示上一个DOM
            self.renderDOM();
            self.carousel();            //这里丿定是上一个DOM
            self.nextPopwin=$(".file-out");
            self.nextPopwin.fadeIn(200);
        }
    };
    window["FileOut"]=FileOut;
})(jQuery)