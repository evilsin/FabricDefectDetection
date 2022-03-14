
function randomString(len){
    len = len || 1;
    var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var maxPos = $chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}




function dropzoneUpload(ctx,bindobj){
    var psk = "uploadFileImageModal_"+randomString(16);

    var successUseBtn = "successUseBtn_"+randomString(8);

    var html= " <div class=\"modal fade\" id=\""+psk+"\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\"> "
        + "		<div class=\"modal-dialog\" role=\"document\"> "
        + "			<div class=\"modal-content\"> "
        + "				<div class=\"modal-header\"> "
        + "					<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>  "
        + "					<h4 class=\"modal-title\" id=\"myModalLabel\">批量文件上传器</h4> "
        + "				</div> "
        + "				<div class=\"modal-body\"> "
        + "					<div id=\"dropzone\"> "
        + "						<form action=\""+ctx+"/display/material/dropzoneUpload?psk="+psk+"\" class=\"dropzone needsclick\" id=\"my-awesome-dropzone\"></form> "
        + "					</div>  "
        + "				</div> "
        + "				<div class=\"modal-footer\"> "
        + "					<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">取消</button> "
        + "					<button type=\"button\" class=\"btn btn-primary "+successUseBtn+"\" >确定</button> "
        + "				</div> "
        + "			</div> "
        + "		</div> "
        + " </div> ";
    $(document.body).append(html);


    $("."+successUseBtn).click(function(){

        $.getJSON(ctx+"/display/material/getUploadImages?psk="+psk,function(data){
            try{
                if(null != data){
                    for(var i=0;i<data.length;i++){
                        var img = data[i];
                        if(i < 9){
                            $(bindobj).append("<img  style='margin:5px;' onload='onImageLoad(this)' title='双击删除' ondblclick='toDbClickDelImage(this)' id='imagerounded' class=\"img-rounded\"  vid='"+img+"' src='"+ctx+img+"'>");
                        }
                    }
                }
            }catch(e){alert(e.message);}

            $("#"+psk).modal('hide');

        });

    });


    return psk;
}




var Script = function () {



//    sidebar dropdown menu

    jQuery('#sidebar .sub-menu > a').click(function () {
        var last = jQuery('.sub-menu.open', $('#sidebar'));
        last.removeClass("open");
        jQuery('.arrow', last).removeClass("open");
        jQuery('.sub', last).slideUp(200);
        var sub = jQuery(this).next();
        if (sub.is(":visible")) {
            jQuery('.arrow', jQuery(this)).removeClass("open");
            jQuery(this).parent().removeClass("open");
            sub.slideUp(200);
        } else {
            jQuery('.arrow', jQuery(this)).addClass("open");
            jQuery(this).parent().addClass("open");
            sub.slideDown(200);
        }
        var o = ($(this).offset());
        diff = 200 - o.top;
        if(diff>0)
            $("#sidebar").scrollTo("-="+Math.abs(diff),500);
        else
            $("#sidebar").scrollTo("+="+Math.abs(diff),500);
    });

//    sidebar toggle


    $(function() {
        function responsiveView() {
            var wSize = $(window).width();
            if (wSize <= 768) {
                $('#container').addClass('sidebar-close');
                $('#sidebar > ul').hide();
            }

            if (wSize > 768) {
                $('#container').removeClass('sidebar-close');
                $('#sidebar > ul').show();
            }
        }
        $(window).on('load', responsiveView);
        $(window).on('resize', responsiveView);
    });

    $('.icon-reorder').click(function () {
        if ($('#sidebar > ul').is(":visible") === true) {
            $('#main-content').css({
                'margin-left': '0px'
            });
            $('#sidebar').css({
                'margin-left': '-180px'
            });
            $('#sidebar > ul').hide();
            $("#container").addClass("sidebar-closed");
        } else {
            $('#main-content').css({
                'margin-left': '180px'
            });
            $('#sidebar > ul').show();
            $('#sidebar').css({
                'margin-left': '0'
            });
            $("#container").removeClass("sidebar-closed");
        }
    });

// custom scrollbar
    $("#sidebar").niceScroll({styler:"fb",cursorcolor:"#e8403f", cursorwidth: '3', cursorborderradius: '10px', background: '#404040', cursorborder: ''});

    $("html").niceScroll({styler:"fb",cursorcolor:"#e8403f", cursorwidth: '6', cursorborderradius: '10px', background: '#404040', cursorborder: '', zindex: '1000'});

// widget tools

    jQuery('.widget .tools .icon-chevron-down').click(function () {
        var el = jQuery(this).parents(".widget").children(".widget-body");
        if (jQuery(this).hasClass("icon-chevron-down")) {
            jQuery(this).removeClass("icon-chevron-down").addClass("icon-chevron-up");
            el.slideUp(200);
        } else {
            jQuery(this).removeClass("icon-chevron-up").addClass("icon-chevron-down");
            el.slideDown(200);
        }
    });

    jQuery('.widget .tools .icon-remove').click(function () {
        jQuery(this).parents(".widget").parent().remove();
    });

//    tool tips

    $('.tooltips').tooltip();

//    popovers

    $('.popovers').popover();



// custom bar chart

    if ($(".custom-bar-chart")) {
        $(".bar").each(function () {
            var i = $(this).find(".value").html();
            $(this).find(".value").html("");
            $(this).find(".value").animate({
                height: i
            }, 2000)
        })
    }


//custom select box

//    $(function(){
//
//        $('select.styled').customSelect();
//
//    });



}();