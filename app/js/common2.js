
// Custom JS
$(function() {

    "use strict";


    // $(".preloader").fadeOut();

    $('#feature_buttons a').click(function (e) {
        e.preventDefault();
        e.stopPropagation()
        $('#feature_buttons a').removeClass('active');
        $(this).addClass('active');
        $(this).tab('show');
    });

    $("#modal").iziModal();

    $(".iziModal").iziModal({
        width: '56em',
        radius: 35,
        padding: 20,
        top: 30,
        bottom: 30,
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
                $(".iziModal .iziModal-wrap").scrollTop(0);
            },1)
        }
    });

    $('.iziModal-assign-button').click(function () {
        var direction = $(this).attr('data');
        $("#" + direction).prop("checked", true);
    });

    $(".iziModal-assign").iziModal({
        width: '700px',
        radius: 35,
        padding: 20,
        loop: true,
        top: 30,
        bottom: 30,
        headerColor: '#3B853B',
        borderBottom: false,
        transitionIn: 'bounceInDown',
        transitionOut: 'bounceOutDown',
        onOpening: function(modal)
        {
            modal.startLoading();
            $('.iziModal-assign').css("background-color","white");
        },
        onOpened: function(modal)
        {
            $('.iziModal-assign').css("background","none");
            $('.iziModal-assign').css("-webkit-transition","background 300ms linear");
            $('.iziModal-assign').css("-ms-transition","background 300ms linear");
            $('.iziModal-assign').css("transition","background 300ms linear");
            modal.stopLoading();
            setTimeout(function(){
                $(".iziModal-assign .iziModal-wrap").scrollTop(0);
            },1)
        }

    });

// });



    $(document).ready(function()
    {
        // $(".preloader").delay(1800).fadeOut();
        // $(".overlay-loader").delay(1300).fadeOut("slow");
        // $(window).load(function () {
        // setTimeout(function()
        // {
        //     // $('.preloader').fadeOut();
        //     $('.overlay-loader').fadeOut();

        // },2000); // set the time here
        // });  

        // $('.preloader').fadeOut();




        $('.send-message').click(function(e) {
            e.preventDefault();
            // console.log('lol');

            var result = sendEmail('assign');

            if (result === 'wrong_directions')
            {
                iziToast.warning({
                    title: 'Отсутствует данные',
                    message: 'Пожалуйста, выберите направление.',
                });
            }

            if (result === 'no_data')
            {
                iziToast.warning({
                    title: 'Отсутствует данные',
                    message: 'Пожалуйста, введите контактные данные',
                });
            }

            if (result === 'success')
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
        //  event.preventDefault();
        // });

        // $('.modal-assign').click(function(e) {
        //  var chosenDirections = '';
        //  e.preventDefault();
        //  $("input[type=checkbox]:checked").each ( function() {
        //      chosenDirections += '</div>' + $(this).next('label').html() + '</div>';
        //  });

        //  $('#modal-alert').iziModal('open');

        //  // alert(chosenDirections);
        // });

        $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false,

            markup: '<div class="mfp-iframe-scaler">'+
            '<div class="mfp-close"></div>'+
            '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
            '</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button

            iframe: {
                patterns: {
                    vk: {

                        index: 'vk.com/',
                        src: '//vk.com/video_ext.php?oid=-95463241&id=456239019&hash=abb155fc2fe8f68d&hd=2'
                    }
                }
            }
        });

        $(".owl-carousel-teachers").owlCarousel({
            loop:true,
            margin:13,
            nav:true,
            dots: true,
            dotsEach: true,
            autoWidth: true,
            responsiveClass: true,
            responsiveRefreshRate: 10,
            responsive:{
                0:{
                    items:1
                },
                300:{
                    items: 1,
                    margin: 40
                },
                1000:{
                    items:2,
                    margin: 13
                },
                1350:{
                    items:3,
                    margin: 13
                }
            },
            navText: [
                "<i class='fa fa-location-arrow fa-rotate-225 nav-arrow left-nav-arrow'></i>",
                "<i class='fa fa-location-arrow fa-rotate-45 nav-arrow right-nav-arrow'></i>"
            ],
        });

        $(".owl-carousel-photo").owlCarousel({
            loop:true,
            margin:25,
            nav:true,
            dots: true,
            dotsEach: true,
            autoWidth: true,
            responsive:{
                0:{
                    items:1
                },
                600:{
                    items:2
                },
                1000:{
                    items:3
                    // margin:0
                },
                1500:{
                    items: 4
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
            myMap.behaviors.disable('routeEditor');


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

    $('.site-header .assign').click(function(e) {
        $('html, body').animate({
            scrollTop: $(".s-directions").offset().top
        }, 1200);

        $('#modal-alert').iziModal('open');
    });




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

   //   $(window).load(function () {

   // });
});

window.onload= function() {
    document.body.style.display="block";
            console.log('WTF????');
         // $(".preloader").delay(3800).fadeOut();
         // $(".overlay-loader").delay(3300).fadeOut("slow");
         // $("#my-wrapper").delay(11800).fadeIn("slow");
};

function sendEmail(prefix)
{
    var result = '';
    var returnError = false;
    var mail = 'affected7000@mail.ru';
    var directions = [];

    if (prefix !== 'contacts')
    {
        $('.programm-checkbox form div p :checked').each(function()
        {
            directions.push($(this).val());
        });

        if (directions == '') {
            returnError = true;
            result = 'wrong_directions';
        }
    }

    //Get the data from all the fields
    var name = $('#' + prefix + 'InputName');
    // var email = $('input[name=email]');
    var phone_number = $('#' + prefix + 'InputPhone');
    var comment = $('#' + prefix + 'InputMessage');

    //Simple validation to make sure user entered something
    //Add your own error checking here with JS, but also do some error checking with PHP.
    //If error found, add hightlight class to the text field

    if (name.val() == '') {
        name.addClass('error');
        returnError = true;
        result = 'no_data';
    } else name.removeClass('error');

    if (phone_number.val() == '') {
        phone_number.addClass('error');
        returnError = true;
        result = 'no_data';
    } else phone_number.removeClass('error');

    if (comment.val() == '') {
        comment.addClass('error');
        returnError = true;
        result = 'no_data';
    } else comment.removeClass('error');

    // Highlight all error fields, then quit.
    if (returnError == true) {
        return result;
    }

    //organize the data
    if (directions == '') {
        console.log('FIRST');
        var data = 'name=' + name.val() + '&phone_number=' +
            phone_number.val() + '&comment=' + encodeURIComponent(comment.val()) + '&mail=' + mail;
    }
    else
    {
        console.log('SECOND');
        var data = 'name=' + name.val() + '&phone_number=' +
            phone_number.val() + '&comment=' + encodeURIComponent(comment.val()) + '&mail=' + mail + '&directions=' + directions + '&mode=dir';
    }
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
            return 'success';

            //if process.php returned 0/false (send mail failed)
            /* } else alert('Sorry, unexpected error. Please try again later.');*/
            /*} else alert(html);*/
        }
    });

    //cancel the submit button default behaviours
    return 'success';
}

$('#submit').click(function (e)
{
    e.preventDefault();
    var result = sendEmail('contacts');

    if (result)
    {
        $('.bottom-form').fadeOut('slow');
        $('.done').fadeIn('slow');
    }
});

function validateOnlyNumbers(phoneNumber) {
    var theEvent = phoneNumber || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var phone_number = $('input[name=phone_number]').val();
    var regex = /[0-9]|\./;
    if (!regex.test(key) || isPhoneLengthEnough(phone_number)) {
        theEvent.returnValue = false;
        if (theEvent.preventDefault) theEvent.preventDefault();
    }
}

function isPhoneLengthEnough(phoneNumber)
{
    return phoneNumber.length == 11;
}

$(document).ready(function()
{
    $('.top-buttons > div > ul > li > a, .top-buttons .mm-panels .mm-panel .mm-listview li a, #mm-my-menu > .mm-panels > .mm-panel > .mm-listview > li > a[href^="#/"]').click(function(e)
    {
        var scrollToSection = '.' + $(this).attr('value');
        $('html, body').animate({
            scrollTop: $(scrollToSection).offset().top
        }, 1200);

        return false;
    });

    //  $(window).scroll(function(){
    //      // if ($(window).scrollTop() >= 300) {
    //      //   console.log('ww');
    //      //    $('.header').addClass('fixed-header');
    //      //    $('.header').fadeIn();
    //      // }
    //      // else {
    //      //    $('.header').removeClass('fixed-header');
    //      //    $('.header').fadeOut();
    //      // }

    //      // var previousScroll = 0, headerOrgOffset = $('.header').offset().top;
    //      // var currentScroll = $(this).scrollTop();
    //      // if (currentScroll > headerOrgOffset) {
    //      //     if (currentScroll > previousScroll) {
    //      //         $('.header').slideUp();
    //      //         $('.header').addClass('fixed-header');
    //      //     } else {
    //      //         $('.header').slideDown();
    //      //     }
    //      // } else {
    //      //     $('.header').slideDown();
    //      // }
    //      // previousScroll = currentScroll;

    //       //  if ($(this).scrollTop() > 30) {
    //       //    console.log('30?: ' + $(this).scrollTop());
    //       //     $('.header').slideUp();
    //       //     $('.header').addClass('fixed-header');
    //       // } else {
    //       //     console.log('3!0?: ' + $(this).scrollTop());
    //       //     $('.header').slideDown();
    //       // }
    //       var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

    //       if (width <= 991)
    //       {
    //          console.log('WIDTH: ' + width);
    //          var isShown = false;
    //          var scrollToSection = '.' + $('#about-scroll').attr('value');
    //          var scrollTo = $(scrollToSection).offset().top;
    //          console.log('scrollTo: ' + scrollTo);
    //          if ($(this).scrollTop() >= ($(scrollToSection).offset().top - 100))
    //          {
    //             if (!isShown)
    //             {
    //                console.log('!!!');
    //                $('.header').addClass('fixed-header');
    //                $('.header').slideDown();
    //                isShown = true;
    //            }
    //        }
    //        else if ($(this).scrollTop() <= 100)
    //        {
    //          $('.header').slideDown();
    //      }
    //      else
    //      {
    //         $('.header').slideUp();
    //     }
    // }


    //  });




});

// $(window).resize(function () {
//    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

//    if (width > 991)
//    {
//       $('.header').removeClass('fixed-header');
//    }
//    else
//    {
//       $('.header').addClass('fixed-header');
//    }
// });

$(document).ready(function()
{
    var mmenu = $("#my-menu").mmenu(
        {
            // extensions   : [ "listview-justify", "border-full", "shadow-page", 
            //                  "pagedim-black", "fx-menu-fade", "fx-panels-none",
            //                  "fx-listitems-slide" ],
            extensions   : [ "listview-justify", "border-full", "shadow-page",
                "pagedim-black" ],
            navbar       : false,
            onClick :
                {
                    preventDefault: false
                }

        },
        {
            clone: true,
            offCanvas:
                {
                    pageNodetype: "#my-wrapper",
                },

        });

    $('body').on( 'click',
        'a[href^="#/"]',
        function() {
            var scrollToSection = '.' + $(this).attr('value');
            $('html, body').animate({
                scrollTop: $(scrollToSection).offset().top
            }, 1200);

            mmenu.close();
            return false;
        }
    );
});

$(".mh-head.mm-sticky").mhead({
    scroll: {
        hide: 200
    }
});
$(".mh-head:not(.mm-sticky)").mhead({
    scroll: false
});


// $(window).bind(
//   'touchmove',
//    function(e) {
//     e.preventDefault();
//   }
// );

// $(window).load(function () {
//     $(".preloader").delay(1800).fadeOut();
//     $(".overlay-loader").delay(1300).fadeOut("slow");
// });

