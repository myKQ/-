/*
 * @Author: Administrator
 * @Date:   2017-01-17 16:53:45
 * @Last Modified by:   Administrator
 * @Last Modified time: 2017-01-20 09:20:56
 */
'use strict';

// 适配不同屏幕
var Ohtml = document.documentElement;
function getSize(){
    var windowWidth = Ohtml.offsetWidth;
    if(windowWidth >= 750){
        Ohtml.style.fontSize = '100px';
    }else if(windowWidth <= 320){
        Ohtml.style.fontSize = '50px';
    }else{
        Ohtml.style.fontSize = windowWidth/(1200/100)*2 + 'px';
    }   
}
getSize();
window.addEventListener('resize',getSize);

$(function() {
    // 获取所有的图片
    var imgAll = $('.carousel-inner img');
    var item = $('.carousel-inner .item');

    var imgList = $('.xianxia img');
    var yunList = $('.xy-zhihuiyun img');

    // resize 事件 指的是只要浏览器窗口发生改变的情况下，持续触发
    // 利用trigger自动初始化
    $(window).resize(_resize).trigger('resize');


    // 头部区域
    $('.xy-header a[href^="#"]').click(function(e){
        e.preventDefault();
        $('html, body').animate({scrollTop: $(this.hash).offset().top-50}, 400);
    });

    $('.nav li a').on('click',function() {
        $('.collapse').removeClass('in')
    })

    function _resize() {
        var windowWidth = $(this).width();
        var isSmallScreen = windowWidth < 750;

        // 导航区域
        if( isSmallScreen ) {
            $('.xy-header button').css('backgroundColor','#19b8ea');
            $('.xy-header button span').css('backgroundColor','#fff')
        }

        // 焦点轮播
        // 检测每一个li的宽度 进行累加 将得到的总宽赋值给ul
        var srcollWrap = $('.srcoll-wrap');
        // 获取srcollWrap下面的ul
        var srcollWrapUl = $('ul', srcollWrap);
        var srcollWrapLi = $('li', srcollWrap);
        var allWidth = 0;
        srcollWrapLi.each(function(index, el) {
            var _el = $(el);
            allWidth += _el.width();
        });
        srcollWrapUl.width(allWidth);
        // 动态去获取屏幕的宽度
        imgAll.each(function(index, el) {
            var _el = $(el);
            // 获取当前的那张图片里面的ssrc 小图片的路径
            var src = _el.data(isSmallScreen ? 'ssrc' : 'bsrc');
            _el.attr('src', src);
            // 改变小图的css
            _el.css({
                height: isSmallScreen ? 'auto' : 618,
                position: isSmallScreen ? 'static' : 'absolute',
                transform: isSmallScreen ? 'none' : 'translateX(-50%)',
                width: isSmallScreen ? '100%' : 'auto'
            })
        })
        item.height(isSmallScreen ? 'auto' : 618);
        // 根据屏幕的大小情况判断是否需要给srcollWrap添加滚动条
        srcollWrap.css('overflow', isSmallScreen ? 'scroll' : 'visible')
        // 在手机端滑动的时候去轮播图片
        var carousel = $('.carousel');
        var startX = 0; // 记录手指开始的落点
        // 在JQ里面 所有的touch事件都用ON去绑定
        carousel.on('touchstart', function(e) {
            // 在JQ里面 针对event事件对象包装过了，如果想要获得原生的event事件对象，需要通过originalEvent去获取
            startX = e.originalEvent.touches[0].pageX;
        })
        carousel.on('touchend', function(e) {
            // 在touchend事件里面只能获取changedTouches手指数组列表
            var dx = e.originalEvent.changedTouches[0].pageX - startX;
            if (Math.abs(dx) > 50) {
                if (dx > 0) {
                    carousel.carousel('prev');
                } else {
                    carousel.carousel('next');
                }
            }
        });

        // 优势
        if (isSmallScreen) {
            $('.xy-advantage').css('backgroundColor', '#1ebaeb')
        } else {
            $('.xy-advantage').css('backgroundColor', '#fff')
        }

        // 线下部分
        if (isSmallScreen) {
            $('.xx').removeClass('xianxia');
            $('.xy-xianxia .title').css('color', '#2b343d');
        } else {
            $('.xx').addClass('xianxia');
            $('.xy-xianxia .title').css('color', '#fff')
        }

        imgList.each(function(index, el) {
            var _el = $(el);
            var src = _el.data(isSmallScreen ? 'ssrc' : 'bsrc');
            _el.attr('src', src);
        })

        // 智慧云
        if (isSmallScreen) {
            $('.xy-zhihuiyun .container-fluid').css('backgroundColor', '#fff')
        } else {
            $('.xy-zhihuiyun .container-fluid').css('backgroundColor', '#282d30')
        }

        yunList.each(function(index, el) {
            var _el = $(el);
            var src = _el.data(isSmallScreen ? 'ssrc' : 'bsrc');
            _el.attr('src', src);
            _el.css({
                width: isSmallScreen ? 'auto' : '20%'
            })
        })

    }
})