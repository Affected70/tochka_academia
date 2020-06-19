// Custom JS
$(function() {

	"use strict";

	$('#feature_buttons a').click(function (e) {
		e.preventDefault();
		$('#feature_buttons a').removeClass('active');
		$(this).addClass('active');
		$(this).tab('show');
	});

	$("#modal").iziModal();

	$(".iziModal").iziModal({
		width: '72em',
		radius: 35,
		padding: 20,
		group: 'products',
		loop: true,
		headerColor: '#3B853B',
		borderBottom: false,
		transitionIn: 'bounceInDown',
		transitionOut: 'bounceOutDown',
		onOpening: function(modal)
		{
			modal.startLoading();
			$('.iziModal').css("background-color","white");
		},
		onOpened: function(modal)
		{
			$('.iziModal').css("background","none");
			$('.iziModal').css("-webkit-transition","background 300ms linear");
			$('.iziModal').css("-ms-transition","background 300ms linear");
			$('.iziModal').css("transition","background 300ms linear");
			modal.stopLoading();
			setTimeout(function(){
				$("#modal-large .iziModal-wrap").scrollTop(0);
			},1)
		}
	});

	$(".iziModal-assign").iziModal({
		width: '700px',
		radius: 35,
		padding: 20,
		loop: true,
		headerColor: '#3B853B',
		borderBottom: false,
		transitionIn: 'bounceInDown',
		transitionOut: 'bounceOutDown',
		onOpening: function(modal)
		{
			modal.startLoading();
			$('.iziModal').css("background-color","white");
		},
		onOpened: function(modal)
		{
			$('.iziModal').css("background","none");
			$('.iziModal').css("-webkit-transition","background 300ms linear");
			$('.iziModal').css("-ms-transition","background 300ms linear");
			$('.iziModal').css("transition","background 300ms linear");
			modal.stopLoading();
			setTimeout(function(){
				$("#modal-large .iziModal-wrap").scrollTop(0);
			},1)
		}
	});

	$(document).ready(function()
	{
		$('.send-message').click(function(e) {
			e.preventDefault();
			console.log('lol');

			var result = sendEmail('assign');

			if (!result)
			{
				iziToast.warning({
					title: 'Отсутствует данные',
					message: 'Пожалуйста, введите контактные данные',
				});
			}

			if (result)
			{
				iziToast.success({
					id: 'success',
					title: 'Ваша заявка успешно отправлена.',
					message: 'Мы свяжемся с вами в ближайшее время!',
					position: 'bottomRight',
					transitionIn: 'bounceInLeft'
				});

				$('.iziModal-assign').iziModal('close');
			}
		});
        // $(document).on('click', '.trigger-alert', function (event) {
        // 	event.preventDefault();
        // });

        // $('.modal-assign').click(function(e) {
        // 	var chosenDirections = '';
        // 	e.preventDefault();
        // 	$("input[type=checkbox]:checked").each ( function() {
        // 		chosenDirections += '</div>' + $(this).next('label').html() + '</div>';
        // 	});

        // 	$('#modal-alert').iziModal('open');

        // 	// alert(chosenDirections);
        // });

        $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        	disableOn: 700,
        	type: 'iframe',
        	mainClass: 'mfp-fade',
        	removalDelay: 160,
        	preloader: false,

        	fixedContentPos: false
        });

        $(".owl-carousel").owlCarousel({
        	loop:true,
        	margin:15,
        	nav:true,
        	dots: true,
        	dotsEach: true,
        	responsive:{
        		0:{
        			items:1
        		},
        		600:{
        			items:3
        		},
        		1000:{
        			items:3
        		}
        	},
        	navText: [
        	"<i class='fa fa-location-arrow fa-rotate-225 nav-arrow left-nav-arrow'></i>",
        	"<i class='fa fa-location-arrow fa-rotate-45 nav-arrow right-nav-arrow'></i>"
        	],
        });

        ymaps.ready(init);
        var myMap;

        function init(){
        	myMap = new ymaps.Map("map", {
        		center: [53.518588, 49.304654],
        		zoom: 17,
        		controls: ['zoomControl', 'geolocationControl', 'fullscreenControl'],
        		searchControlProvider: 'yandex#search'
        	});
        	myMap.behaviors.disable('scrollZoom');

        	myMap.geoObjects
        	.add(new ymaps.Placemark([53.518588, 49.304654], {
        		balloonContent: ''
        	}, {
        		iconLayout: 'default#image',
                    // Своё изображение иконки метки.
                    iconImageHref: '/img/contacts/map4.png',
                    // Размеры метки.
                    iconImageSize: [113, 70],
                    // Смещение левого верхнего угла иконки относительно
                    // её "ножки" (точки привязки).
                    iconImageOffset: [-55, -90]
                  }))
        }
      });



	$(window).scroll(function () {
		if ($(this).scrollTop() > 200) {
			$('#top').fadeIn();
		} else {
			$('#top').fadeOut();
		}
	});

	$('#top').click(function () {
		$("html, body").animate({scrollTop: 0}, 500);
		return false;
	});

	$('.top-buttons > .assign').click(function(e) {
		$('html, body').animate({
			scrollTop: $(".s-directions").offset().top
		}, 1200);

		$('#modal-alert').iziModal('open');
	});

	$(".top-buttons > a").click(function(e)
	{
		var scrollToSection = '.' + $(this).attr('value');
		$('html, body').animate({
			scrollTop: $(scrollToSection).offset().top
		}, 1200);

		return false;
	});

	$(".preloader").fadeOut();

    // var checkboxs = $('input[type=checkbox]');

    // checkboxs.each(function(){
    //   $(this).wrap('<div class="customCheckbox"></div>');
    //   $(this).before('<span>&#10004;</span>');
    // });

    // checkboxs.change(function(){
    //   if($(this).is(':checked')){
    //    $(this).parent().addClass('customCheckboxChecked');
    //   } else {
    //    $(this).parent().removeClass('customCheckboxChecked');
    //   }
    // });
  });

window.onload= function() {
	document.body.style.display="block"
};

function sendEmail(prefix)
{
	console.log('start');
	var returnError = false;

	var mail = 'affected7000@mail.ru';

    //Get the data from all the fields
    var name = $('#' + prefix + 'InputName');
    // var email = $('input[name=email]');
    var phone_number = $('#' + prefix + 'InputPhone');
    var comment = $('#' + prefix + 'InputMessage');

    console.log('name: ' + name.val());
    console.log('phone_number: ' + phone_number.val());
    console.log('comment: ' + comment.val());
    //Simple validation to make sure user entered something
    //Add your own error checking here with JS, but also do some error checking with PHP.
    //If error found, add hightlight class to the text field
    if (name.val() == '') {
    	name.addClass('error');
    	returnError = true;
    } else name.removeClass('error');

    if (phone_number.val() == '') {
    	phone_number.addClass('error');
    	returnError = true;
    } else phone_number.removeClass('error');

    if (comment.val() == '') {
    	comment.addClass('error');
    	returnError = true;
    } else comment.removeClass('error');

    // Highlight all error fields, then quit.
    if (returnError == true) {
    	return false;
    }

    mail = 'affected7000@mail.ru';
    // mail = 'affected700@yandex.ru';

    //organize the data
    var data = 'name=' + name.val() + '&phone_number=' +
    phone_number.val() + '&comment=' + encodeURIComponent(comment.val()) + '&mail=' + mail;

    console.log('data:' + data);

    //disabled all the text fields
    // $('.text').attr('disabled', 'true');

    //show the loading sign
    // $('.loading').show();

    //start the ajax

    $.ajax({
        //this is the php file that processes the data and sends email
        url: "process.php",

        //GET method is used
        type: "GET",

        //pass the data
        data: data,

        //Do not cache the page
        cache: false,

        //success
        success: function (html) {
            //if process.php returned 1/true (send mail success)
            /*  if (html == 1) {*/
            //hide the form
            // $('.cont_form').fadeOut('slow');

            //show the success message
            // $('.done').fadeIn('slow');
            return true;

            //if process.php returned 0/false (send mail failed)
            /* } else alert('Sorry, unexpected error. Please try again later.');*/
            /*} else alert(html);*/
          }
        });

    //cancel the submit button default behaviours
    return true;
  }

  $('#submit').click(function (e)
  {
  	e.preventDefault();
  	sendEmail('contacts');
  });


