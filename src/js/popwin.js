/**
 * Created by Administrator on 2016/5/19.
 */

//弹出input
function popwin(){
    var html=template('popwin-template');
    $('body').prepend(html);
    //开始动画
    $('.mask').fadeIn(300);
    $('.popwin').addClass("bounceIn animated");
}
//隐藏关闭
$(document).on("click",".popwin .popclose",function(event){
    event.stopPropagation();

    $('.popwin').addClass("bounceOut animated");
    $(".mask").fadeOut(500);
    $(".popwin").one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
        $(".mask").remove();
        $(this).remove();
    });
})
//取消
$(document).on("click",".popwin .cancel",function(event){
    event.stopPropagation();

    $('.popwin').addClass("bounceOut animated");
    $(".mask").fadeOut(500);
    $(".popwin").one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
        $(".mask").remove();
        $(this).remove();
    });
})
//确定
$(document).on("click",".popwin .confirm",function(event){
    event.stopPropagation();

    $('.popwin').addClass("bounceOut animated");
    $(".mask").fadeOut(500);
    $(".popwin").one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
        $(".mask").remove();
        $(this).remove();
        setTimeout(
            function(){
                $parent.append("<li><input type='text' \class='changename'\ value='新建文件夹'/></li>");
            },300);
    });
})