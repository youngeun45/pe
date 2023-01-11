$(function(){
    headerCtrl();
	popupUI();
})
function headerCtrl(){
    var $gnbA = $('#gnb>ul>li>a'),
        $gnb = $('#gnb'),
        $gnbTxt = $('#gnb a'),
        $title = $.trim($('#pageTit').text()),
        $hd = $('#header');
     $gnbTxt.each(function() {
		$(this).mouseenter(function(){
            $(this).parents('li').addClass('on')
        })
        $(this).mouseleave(function(){
            $(this).parents('li').removeClass('on')
        })
	});
	$gnb.mouseenter(function(){
		$('body').addClass('gnb_open');
	});
	$hd.mouseleave(function(){
        $('body').removeClass('gnb_open');
	});
	$gnbTxt.focus(function(){
		$('body').addClass('gnb_open');
	})
	$gnbTxt.blur(function(){
        setTimeout(function(){
            if( !$('#gnb a').is(':focus') ) {
                $('body').addClass('gnb_open');
            }
        },10);
	})
}
/* 레이어 팝업 */
var $popSpeed = 300,
	$popOpenBtn = '';
var popupUI = function(){
	$(document).on('click','.ui-pop-open',function(e) {
		e.preventDefault();
		var $pop = $(this).attr('href');
		popOpen($pop,this);
	});
	$(document).on('click','.ui-pop-close',function(e) {
		e.preventDefault();
		var $pop = $(this).closest('.pop_wrap');
		popClose($pop);
	});

	/*
	//팝업 bg 클릭시 닫힘 기능
	$('.pop_wrap').on('click',function(){
		var $pop = $(this);
		if(!$pop.hasClass('close_none')){popClose($pop);} 	//배경 클릭시 안닫히게 할때는 close_none 클래스 추가로 처리
	}).on('click','.popup',function(e) {
		e.stopPropagation();
	});
	*/
};
var popOpen = function(tar,btn){
	if($(tar).length < 1 || $(tar).children('.popup').length < 1) return console.log('해당팝업없음');
	var $visible = $('.pop_wrap:visible').size();
	if(btn != null || btn != window)$popOpenBtn = $(btn);
	if($visible > 0){
		$(tar).css('z-index','+='+$visible);
	}
	$('body').addClass('pop_open');	
	$(tar).fadeIn($popSpeed,function(){
		$(this).attr({'tabindex':0}).focus();
	});
};
var popClose = function(tar){
	var $visible = $('.pop_wrap:visible').size();
	if($visible == 1){
		$('body').removeClass('pop_open');
	}
	$(tar).find('.popup').animate({'margin-top':0},$popSpeed,function(){
		$(this).removeAttr('style');
	});
	$(tar).fadeOut($popSpeed,function(){
		$(tar).removeAttr('tabindex');
		if($popOpenBtn != ''){
			if($popOpenBtn != window){
				$popOpenBtn.focus();
			}
			$popOpenBtn = '';
		}
	});
};