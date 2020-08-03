    // 标题
    $('.heada1').on('mousemove', function() {
        $('.codeOne').show()
    }).on('mouseout', function() {
        $('.codeOne').hide()
    });
    $('.heada2').on('mousemove', function() {
        $('.codeTwo').show()
    }).on('mouseout', function() {
        $('.codeTwo').hide()
    });
    $('.heada3').on('mousemove', function() {
        $('.notice').show()
    }).on('mouseout', function() {
        $('.notice').hide()
    })

    // 导航下拉
    ! function($) {
        let $btns = $('.nav_sdown')
        console.log($btns.length);
        let $items = $('.nav_downSelect');
        console.log($items)
        const $nav = $('.nav');
        const $nav_down = $('.nav_down')
        let timer = null;
        // console.log($items);
        //2.带有延迟的


        // 有问题 索引有问题  each
        let index = 0
        $btns.on('mouseover', function() {
            index = $(this).index()
            clearTimeout(timer);
            timer = setTimeout(() => {
                console.log($(this).index());
                $items.eq($(this).index() - 2).addClass('active').siblings('.nav_downSelect').removeClass('active');

                $nav_down.stop(true).animate({
                    borderWidth: 3,
                    height: 328
                }, 'fast')
            }, 100);
        });
        $btns.on('mouseout', function() {
            clearTimeout(timer);
            timer = setTimeout(() => {
                $nav_down.stop(true).animate({
                    borderWidth: 0,
                    height: 0
                }, 'fast')
            }, 100)
        });
        // 弹出框的悬停
        $nav_down.on('mousemove', function() {
            clearTimeout(timer);
            $nav_down.show()
        });
        $nav_down.on('mouseout', function() {
            clearTimeout(timer);
            timer = setTimeout(function() {

                $nav_down.stop(true).animate({
                    borderWidth: 0,
                    height: 0
                }, 'fast')
            }, 100)
        });
    }(jQuery);




    //导航栏悬浮
    ! function() {
        const nav = $('.nav')
        const log = document.querySelector('.nav_log')
            //设置监听事件;
        $(window).scroll(function() {
            let scrollHeight = $(document).scrollTop();
            // console.log(scrollHeight)
            if (scrollHeight > 200) {
                nav.addClass("box");
                log.style.display = 'block';

            } else if (scrollHeight < 200) {
                nav.removeClass("box");
                log.style.display = 'none';
            }
            //scrollHeight > 100 ? navtive.addClass("box") : navtive.removeClass("box");
        });
        let scrollHeight = $(document).scrollTop();

        if (scrollHeight > 200) {
            nav.addClass("box");
            log.style.display = 'block';

        } else if (scrollHeight < 200) {
            nav.removeClass("box");
            log.style.display = 'none';
        }
    }();


    ! function() {
        //1.渲染首页列表
        //后端提供接口
        //前端获取接口数据，进行渲染。

        //2.图片懒加载(lazyload)
        //图片进入可视区才加载(通过图片的top值和可视区的高度进行比较)

        const goodslist = $('.goodslist');
        //http://localhost:8088/JS2004/Day%2027_cart/php/taobaodata.php
        $.ajax({
            url: 'http://localhost:8088/JS2004/Day%2027_cart/php/taobaodata.php',
            dataType: 'json'
        }).done(function(data) {
            let strhtml = '<ul>';
            $.each(data, function(index, value) {
                strhtml += `
                        <a href="details.html?sid=${value.sid}" target="_blank">
                            <li>
                                <img  data-original="${value.url}" class="lazy" width="200" height="200"/>
                                <p>${value.title}</p>
                                <span>${value.price}</span>
                                <span>${value.sailnumber}</span>
                            </li>
                        </a>
                    `;
            });
            strhtml += '</ul>';
            goodslist.html(strhtml);

            //添加图片懒加载
            //1.设置类名lazy
            //2.图片路径绑定在  data-original=""
            //3.设置图片宽高。
            //4.渲染图片
            //5.{effect: "fadeIn"}:淡入效果
            // $(function() {
            //     $("img.lazy").lazyload({ effect: "fadeIn" });
            // });
        });

    }();