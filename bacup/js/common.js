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
		$('.example-getting-started').multiselect();

		$('#modal-alert').click(function() {
			$("#modal-alert").iziModal({
				title: "Your message has been sent successfully",
				icon: 'icon-check',
				headerColor: '#00af66',
				width: 600,
				timeout: 10000,
				timeoutProgressbar: true,
				transitionIn: 'fadeInUp',
				transitionOut: 'fadeOutDown',
				bottom: 0,
				loop: true,
				pauseOnHover: true
			});
		});
		

		$(document).on('click', '.trigger-alert', function (event) {
			event.preventDefault();
		});

		$('.modal-assign').click(function(e) {
			var chosenDirections = '';
			e.preventDefault();
			$("input[type=checkbox]:checked").each ( function() {
				chosenDirections += '</div>' + $(this).next('label').html() + '</div>';
			});

			$('#modal-alert').iziModal('open');

			// alert(chosenDirections);
		});

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