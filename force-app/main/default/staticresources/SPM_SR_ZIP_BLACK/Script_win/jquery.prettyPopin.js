/* ------------------------------------------------------------------------
	Class: prettyPopin
	Use: Alternative to popups
	Author: Stephane Caron (http://www.no-margin-for-errors.com)
	Version: 1.3
------------------------------------------------------------------------- */

var _0=false;
var _1=false;
(function(a){a.fn.prettyPopin=function(b){b=jQuery.extend({modal:false,width:false,height:false,opacity:0.5,animationSpeed:'fast',followScroll:true,loader_path:'images/prettyPopin/loader.gif',callback:function(){}},b);function l(){if(_1)return;
_1=true;
a(window).scroll(function(){i()});
a(window).resize(function(){i()})};
l();
return this.each(function(){
    var e;
    var f;
    var c;
    a(this).click(function(){
    m();
    n();
    a.get(a(this).attr('href'),function(d){a('.prettyPopin .prettyContent .prettyContent-container').html(d);
    e=b.width||a('.prettyPopin .prettyContent .prettyContent-container').width()+parseFloat(a('.prettyPopin .prettyContent .prettyContent-container').css('padding-left'))+parseFloat(a('.prettyPopin .prettyContent .prettyContent-container').css('padding-right'));
    a('.prettyPopin').width(e);
    f=b.height||a('.prettyPopin .prettyContent .prettyContent-container').height()+parseFloat(a('.prettyPopin .prettyContent .prettyContent-container').css('padding-top'))+parseFloat(a('.prettyPopin .prettyContent .prettyContent-container').css('padding-bottom'));
    a('.prettyPopin').height(f);
    a('.prettyPopin').height(45).width(45);o()});
    return false});
    var o=function(){var d=g();projectedTop=(a(window).height()/2)+d['scrollTop']-(f/2);
    if(projectedTop<0){projectedTop=10;
    _0=false}else{_0=b.followScroll};
    a('.prettyPopin').animate({'top':projectedTop,'left':(a(window).width()/2)+d['scrollLeft']-(e/2),'width':e,'height':f},b.animationSpeed,function(){j()})};
    var n=function(){a('body').append('<div class="prettyPopin"><a href="#" id="b_close" rel="close">Close</a><div class="prettyContent"><img src="'+b.loader_path+'" alt="Loading" class="loader" /><div class="prettyContent-container"></div></div></div>');
    c=a('.prettyPopin .prettyContent .prettyContent-container');
    a('.prettyPopin a[rel=close]:eq(0)').click(function(){h();return false});
    var d=g();
    a('.prettyPopin').width(45).height(45).css({'top':(a(window).height()/2)+d['scrollTop'],'left':(a(window).width()/2)+d['scrollLeft']}).hide().fadeIn(b.animationSpeed)};
    var m=function(){a('body').append('<div id="overlay"></div>');
    a('#overlay').css('height',a(document).height());
    a('#overlay').css('opacity',0).fadeTo(b.animationSpeed,b.opacity);
    if(!b.modal){a('#overlay').click(function(){h()})}};
    var j=function(){c.parent().find('.loader').hide();
    c.parent().parent().find('#b_close').show();
    c.fadeIn(function(){a(this).find('input[type=text]:first').trigger('focus');
    a('.prettyPopin a[rel=internal]').click(function(){$link=a(this);c.fadeOut(function(){c.parent().find('.loader').show();
    a.get($link.attr('href'),function(d){c.html(d);k(c)})});return false});
    a('.prettyPopin form').bind('submit',function(){$theForm=a(this);
    c.fadeOut(function(){c.parent().find('.loader').show();a.post($theForm.attr('action'),$theForm.serialize(),function(d){c.html(d);k(c)})});return false})});
    a('.prettyPopin a[rel=close]:gt(0)').click(function(){h();return false})};
    var k=function(){var d=g();if(!b.width)e=c.width()+parseFloat(c.css('padding-left'))+parseFloat(c.css('padding-right'));
    if(!b.height)f=c.height()+parseFloat(c.css('padding-top'))+parseFloat(c.css('padding-bottom'));projectedTop=(a(window).height()/2)+d['scrollTop']-(f/2);if(projectedTop<0){projectedTop=10;_0=false}else{_0=b.followScroll};a('.prettyPopin').animate({'top':projectedTop,'left':(a(window).width()/2)+d['scrollLeft']-(e/2),'width':e,'height':f},b.animationSpeed,function(){j()})};var h=function(){a('#overlay').fadeOut(b.animationSpeed,function(){a(this).remove()});a('.prettyPopin').fadeOut(b.animationSpeed,function(){a(this).remove();b.callback()})}});function i(){if(!_0)return;if(!a('.prettyPopin'))return;var d=g();if(a.browser.opera){windowHeight=window.innerHeight;windowWidth=window.innerWidth}else{windowHeight=a(window).height();windowWidth=a(window).width()};projectedTop=(a(window).height()/2)+d['scrollTop']-(a('.prettyPopin').height()/2);if(projectedTop<0){projectedTop=10;_0=false}else{_0=true};a('.prettyPopin').css({'top':projectedTop,'left':(a(window).width()/2)+d['scrollLeft']-(a('.prettyPopin').width()/2)})};function g(){scrollTop=window.pageYOffset||document.documentElement.scrollTop||0;scrollLeft=window.pageXOffset||document.documentElement.scrollLeft||0;
return{scrollTop:scrollTop,scrollLeft:scrollLeft}}}})(jQuery);
