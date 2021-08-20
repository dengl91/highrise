// custom script

(function($) {
    $(document).ready(function() {

        // data-events

        $('[data-toggle]').on('click', function() {
            $(this).toggleClass('active');
        });

        $('[data-active]').on('click', function() {
            $(this).addClass('active').siblings().removeClass('active');
        });

        $('[data-control]').on('click', function() {
            let target = $(this).data('control');
            $('.' + target).toggleClass('active');
        });

        $('[data-bg]').each(function() {
            let bg_img = $(this).data('bg');
            $(this).css('background-image', 'url(' + bg_img + ')');
        });

        $('[data-width]').each(function() {
            let width = $(this).data('width');
            $(this).css('width', width + '%');
        });

        $('[data-focus]').on('click', function() {
            let target = $(this).data('focus');
            $('#' + target).focus();
        });

        $('.menu-btn').on('click', function() {
            $('body').toggleClass('unscroll');
        });

        // Lazy and counters

        $(window).scroll( function() {
            $('[data-count]').each(function () {
                let target = $(this);
                if ( isOnScreen(target) && !target.hasClass('counted') ) {
                    countUp(target);
                    target.addClass('counted');
                }
            });
            $('[data-src]').each(function () {
                let target = $(this);
                if ( isOnScreen(target) && !target.hasClass('counted') ) {
                    let src = $(this).data('src');
                    $(this).attr('src', src);
                    target.addClass('counted');
                }
            });
        });

        // lang
        
        $('.lang').on('click', function(e) {
            if ( $(e.target).closest('.lang__item').length ) return;
            $(this).toggleClass('active');
        });

        $('.lang__item').on('click', function() {
            $(this).closest('.lang').addClass('active');
            $(this).addClass('active').siblings().removeClass('active');
        });

        // search

        $('.search__item').on('click', function(e) {
            if ( $(e.target).closest('.search__subcontent').length ) return;
            $(this).toggleClass('active').siblings().removeClass('active');
        });

        $('.search__subitem').on('click', function() {
            $(this).addClass('active').siblings().removeClass('active');
            let nicename = $(this).text();
            $(this).closest('.search__item').find('.search__title').text(nicename);
            $(this).closest('.search__item').removeClass('active');
        });

        // filter range

        $('.filter__wrapper').on('input', '.filter-range', function() {
            var range = $(this).closest('.filter__wrapper').find('.filter-range').val().split(',');
            $(this).closest('.search__subcontent').find('.low-value').val(range[0]);
            $(this).closest('.search__subcontent').find('.high-value').val(range[1]);
        });

        // header

        $(window).scroll(function() {
            if ($(document).scrollTop() > 100) {
                $('.header').addClass('scrolled');
            } else {
                $('.header').removeClass('scrolled');
            }
        });

        // custom select

        $('.filter__title').on('click', function() {
            $('.filter__items').not($(this).next()).removeClass('active');
            $(this).next('.filter__items').toggleClass('active');
        });

        // global click event

        $('body').mousedown( function(e) {
            if ( $(e.target).closest('.filter__item').length ) return;
            $('.filter__items').removeClass('active');
            if ( $(e.target).closest('.lang').length ) return;
            $('.lang').removeClass('active');
            if ( $(e.target).closest('.search__item').length ) return;
            $('.search__item').removeClass('active');
        });

        // slider

        $('.slider').slick({
            infinite: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: true
        });

        // request

        $('.form--order').on('submit', function(e) {
            e.preventDefault();
            $.ajax({
                type: "POST",
                url: '/wp-content/themes/loten/mail-order-call.php',
                data: $(this).serialize()
            }).done(function(result) {
                console.log(result);
            }).fail(function() {
                alert('Извините, произошла ошибка');
            });
            $(this).find('.modal__title').text('Готово!');
            $(this).find('.row').hide();
            $(this).append('<span>Наши менеджеры свяжутся с вами</span>');
            setTimeout(() => {
                $('.modal--request').removeClass('active');
            }, 3000);
        });

        // namemask

        $('input[name=username]').keyup( function() {
            $(this).val( $(this).val().replace(/[^а-яА-Яa-zA-Z ]/g,'') );
        });

        // phonemask

        var user_phone = document.querySelector('[name=userphone]');
        var maskOptions = {
            mask: '+375 (00) 000-00-00',
            lazy: false
        } 
        if ( user_phone ) {
            var mask = new IMask(user_phone, maskOptions);
        }

        // modal

        $('.modal').mousedown( function(e) {
            if (e.target !== this) return;
            $(this).removeClass('active');
        });

        $('.modal__close').on('click', function() {
            $(this).closest('.modal').removeClass('active');
        });

        // Animation

        let keywords = {
            ac: "active",
            fi: "animate__fadeIn",
            bi: "animate__bounceIn",
            fir: "animate__fadeInRight",
            fiu: "animate__fadeInUp",
            fil: "animate__fadeInLeft",
            fid: "animate__fadeInDown",
            ri: "animate__rotateIn",
            riur: "animate__rotateInUpRight",
            sid: "animate__slideInDown",
            sil: "animate__slideInLeft",
            sir: "animate__slideInRight",
            siu: "animate__slideInUp",
            zi: "animate__zoomIn",
            jitb: "animate__jackInTheBox",
        };

        $(window).scroll( function() {
            $('.animate__animated').each(function () {
                let target = $(this);
                for (const key in keywords) {
                    if ( isOnScreen(target) && target.hasClass(key)) {
                        target.addClass(keywords[key]);
                    }
                }
            });
        });

        function isOnScreen(elem) {
            if ( elem.length == 0 ) {
                return;
            }
            var $window = $(window)
            var viewport_top = $window.scrollTop()
            var viewport_height = $window.height()
            var viewport_bottom = ( viewport_top + viewport_height ) * 1.1
            var $elem = $(elem)
            var top = $elem.offset().top
            var height = $elem.height()
            var bottom = top + height
        
            return (top >= viewport_top && top < viewport_bottom) ||
            (bottom > viewport_top && bottom <= viewport_bottom) ||
            (height > viewport_height && top <= viewport_top && bottom >= viewport_bottom)
        }

    });
})( jQuery );