$(function(){
  headerCtrl();
	popupUI();
	scrollItem();
	menu_Ui();
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

//popup UI
function popOpen(tar) {
  $('body').addClass('pop_open');
  $(tar).addClass('opened');
  let time = $(tar).attr('data-time');

  if ($(tar).hasClass('autoClose') === true) {
    setTimeout(() => {
      popClose(tar);
      return;
    }, time);
  }
}

function popPositin(tar, speed) {
  //console.log($(tar).attr('id'))
  var $wrapH = $(tar).height(),
    $pop = $(tar).find('.pop_wrap'),
    $popH = $pop.outerHeight(),
    $mT = Math.max(0, ($wrapH - $popH) / 2);
  if (speed > 100) {
    $pop.stop().animate({ 'margin-top': $mT }, speed);
  } else {
    $pop.css({ 'margin-top': $mT });
  }
}
function popupUI() {
  $('.pop_open').on('click', function (e) {
    e.preventDefault();
    const $this = $(this);
    const pop = $this.attr('href');
    popOpen(pop);
  });
  $('.pop_close').on('click', function (e) {
    e.preventDefault();
    const pop = $(this).attr('href');
    $(pop + ' #msg_pop').empty();
    popClose(pop);
  });
}
function popClose(tar) {
  if ($('.opened').length < 2) {
    $('body').removeClass('hidden pop_open');
  }
  $(tar).removeClass('opened');

  //$(tar).fadeOut(300);
}

function todayPopup() {
  let popList = [];

  if ($('.pop_today').length > 0) {
    $('.pop_today').each(function () {
      const $id = $(this).attr('id');
      popList.push($id);
    });
  }
  //$('.pop_today').hide();

  $('.pop_today .pop_close').click(function (e) {
    e.preventDefault();
    const chk = $(this).closest('.pop_today').find('.todayChk'),
      $id = $(this).closest('.pop_today').attr('id');

    if (chk.is(':checked')) {
      setCookie($id, 'done', 1);
    }
    //console.log(popList[i])
    $('#' + $id).fadeOut();
  });

  for (let i in popList) {
    if (cookiedata.indexOf(popList[i] + '=done') < 0) {
      $('#' + popList[i]).show();
    }
  }
}

function setCookie(name, value, expiredays) {
  const todayDate = new Date();
  todayDate.setDate(todayDate.getDate() + expiredays);
  todayDate.setHours(0, 0, 0, 0);
  document.cookie = name + '=' + escape(value) + '; path=/; expires=' + todayDate.toGMTString() + ';';
}

//scroll-animation
function scrollItem() {
	var $elements = $.find('*[data-animation]'),
		$window = $(window);

	if ($elements.length > 0) {
		$(window).on('scroll resize', checkInView);
		$(window).trigger('scroll');
	}

	function checkInView() {
		var $winHeight = $window.height(),
			$scrollTop = $window.scrollTop(),
			$winBottom = ($scrollTop + $winHeight - 80); //bottom �ㅻ퉬寃뚯씠�� 

		$.each($elements, function () {
			var $el = $(this),
				$elHeight = $($el).outerHeight(),
				$elTop = $($el).offset().top,
				$elBottom = ($elTop + $elHeight),
				$animationClass = $el.data('animation'),
				$delay = $el.data('delay'),
				$duration = $el.data('duration');

			if (!$el.hasClass('animated')) {
				if ($delay > 0) {
					$el.css({
						'-webkit-animation-delay': $delay + 'ms',
						'animation-delay': $delay + 'ms'
					});
				}
				$el.addClass('animated');
			}

			if (($elBottom >= $scrollTop) && ($elTop <= $winBottom)) {
				$el.addClass($animationClass);
			} 
//			else {
//				$el.removeClass($animationClass);
//			}
		});
	}
}

// brand_story
window.addEventListener("load",() => {
	// brand_story
  let history_box = document.querySelectorAll('#container .story_wrap .history .history_box');
  let history_box_height = [];

  history_box.forEach((item, index) => {
    history_box_height[index] = item.offsetHeight;
		console.log(history_box_height);
    item.querySelector('ul').style.height = 0;
    item.querySelector('h5').addEventListener('click', () => {
			item.querySelector('h5 span').classList.add('on');
      if (item.className == 'history_box on') {
				item.querySelector('h5 span').classList.remove('on');
        item.classList.remove('on');
        item.querySelector('ul').style.height = 0;
      } else {
        item.classList.add('on');
        item.querySelector('ul').style.height = (history_box_height[index] - 51.66) / 10 + 'rem';
      }
    });
  });

	// franchise_support
	let support_btn = document.querySelectorAll('.support_wrap .top_btns button');
  let support_table = document.querySelectorAll('.support_wrap .support');

  support_btn.forEach((item, index) => {
    item.addEventListener('click', () => {
      support_btn.forEach((item, index) => {
        item.classList.remove('active');
      });
      item.classList.add('active');
      support_table.forEach((item, index) => {
        item.classList.remove('on');
      });
      support_table[index].classList.add('on');
    });
  });

	// franchise_interior
	let interior_btn = document.querySelectorAll(".interior_wrap .top_btns button");
	let interior_slide = document.querySelectorAll(".interior_wrap .slider_wrap");
		
	interior_slide.forEach((item, index) => {
		item.classList.remove("on");
	});
	interior_slide[0].classList.add("on");

	interior_btn.forEach((item,index) => {
		item.addEventListener("click",() => {
			interior_btn.forEach((item, index) => {
				item.classList.remove("on");
			});
			item.classList.add("on");
				interior_slide.forEach((item, index) => {
						item.classList.remove("on");
				});
				interior_slide[index].classList.add("on");
			});
		});
});

/* menu category */
function menu_Ui() {
  const $item = $('.menu_item');
  $item.mouseenter(function () {
    let $this = $(this).parents('.menu_list li');

    if (!$this.hasClass('active')) {
      $this.addClass('active');
    }
  });
	$item.mouseleave(function () {
    let $this = $(this).parents('.menu_list li');

    if ($this.hasClass('active')) {
      $this.removeClass('active');
    } 
  });
}
