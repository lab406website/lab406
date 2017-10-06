$(function(){
    $('.btn-edit').on('click', function(){
        console.log('s');
        var this_modal = $(this).attr('data-target');      //modal的id

        var toshow_info = $(this).parent().prevAll();      //??
        var length=toshow_info.length;

        $(this_modal).find('form .form-group input').each(function(index,domEle){
            if($(this).attr("type")!="submit") {
                $(domEle).val(toshow_info.eq(length-index-1).html());   //当前值咯
            }
        });
    });
});