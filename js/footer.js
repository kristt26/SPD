﻿/*
*  The Footer Plugin
*  
* 	Copyright© 2010 Icewares
*  
*  Licensed under the CPL (http://footer.icewares.com.br/licence.html)
*/
/*
* 	The Footer Plugin
*  version 1.0
*  Created by Stéfano Stypulkowski @ Icewares
*   
*  Require jQuery 1.4 http://footer.icewares.com.br
*  
*  For instructions see: 
*/
var id = new String();
var height = new Number();
var footerHeight = new Number();
var styleAbsolute;
var styleRelative;
var config;
var footerObject;
var browserAdjust = 0;
(function($) {
    $.fn.footer = function(options) {
        if ($(this).attr("id") == "") {
            $(this).attr("id", "footerAutoGeneratedId");
        }
        id = "#" + $(this).attr("id");

        //Remove This Styling to 'func() SetPosition', for get dynamic width too
        //styleAbsolute = { "position": "absolute", "bottom": "0", "z-index": "200", "width": $(this).prev().width() + "px" };
        //styleRelative = { "position": "relative", "bottom": "auto", "width": $(this).prev().width() + "px", "padding-top": "40px" };

        height = $(document).height();
        footerHeight = $(id).height();
        if ($.browser.msie) { browserAdjust = 4; }
        setPosition();

        var defaults = { "monitorTimeOut": 250 };
        config = $.extend(defaults, options);
        if (config.monitorTimeOut < 1) {
            config.monitorTimeOut = 1;
        }
        monitor();
    }
})(jQuery);

function monitor() {
    if (height != $(document).height()) {
        setPosition();
        height = $(document).height();
    }
    if (footerHeight != $(id).height()) {
        setFsmHeight();
        footerHeight = $(id).height();
    }
    setTimeout('monitor()', config.monitorTimeOut);
}
function setPosition() {
    //get width from parent div (which is 'html-wrapper')
    styleAbsolute = { "position": "absolute", "bottom": "0", "z-index": "2000", "width": $(id).parent().width() + "px" };
    styleRelative = { "position": "relative", "bottom": "auto", "z-index": "2000", "width": $(id).parent().width() + "px", "padding-top": "40px"};

    if (($(document).height() - browserAdjust) > $(window).height()) {
        $("#footerSpaceManager").remove();
        $(id).css(styleRelative);
    } else {
        if ($("#footerSpaceManager").size() == 0) {
            $(id).parent().append("<div id='footerSpaceManager' style='height: " + $(id).height() + "px;'></div>")
        }
        $(id).css(styleAbsolute);
    }
}
function setFsmHeight() {
    if ($("#footerSpaceManager").size() > 0 && $(id).height() != $("#footerSpaceManager").height()) {
        $("#footerSpaceManager").height($(id).height());
    }
}
