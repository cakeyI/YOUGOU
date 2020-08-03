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


        //轮播图
        const $pi = $('.pic')
        const $pic = $('.lunbo')
        const $pichover1 = $('.pichover1')
        console.log($pic);
        console.log($pichover1);
        let timer1 = null
            // let timer2 = null
        let index = 0;

        $pichover1.on('mouseover', function() {
            console.log(5);
            index = $(this).index();
            tab();
            // alert(1)
        })

        function tab() {
            $pichover1.eq(index1).addClass('picshow').siblings('.pichover1').removeClass('picshow')
            $pic.eq(index1).addClass('show').siblings('.lunbo').removeClass('show');
        }
        timer1 = setInterval(() => {
            index++;
            if (index > $pic.length - 1) {
                index = 0
            }
            tab();
        }, 5000);


        // 鼠标移入暂停
        $pi.hover(function() {
            clearTimeout(timer1);
            // console.log(1);
        }, function() {
            timer1 = setInterval(() => {
                index1++;
                if (index > $pic.length - 1) {
                    index = 0
                }
                tab();
            }, 4000);
        });
    }();



    //tab切换主页
    ! function() {
        const $tabsa = $('.tabsa')
        const $tabsb = $('.tabsb')
        const $mp_content = $('.mp_content')
        const $np_content = $('.np_content')
        console.log($tabsa);
        console.log($np_content);
        // 新品推荐
        $tabsa.on('click', function() {
            $(this).addClass('tb_active').siblings('.tabsa').removeClass('tb_active');
            $np_content.eq($(this).index()).addClass('show').siblings('.np_content').removeClass('show')
        })


        // 新推推荐箭头



        //主推大牌
        $tabsb.on('click', function() {
            $(this).addClass('tb_active').siblings('.tabsb').removeClass('tb_active');
            $mp_content.eq($(this).index()).addClass('show').siblings('.mp_content').removeClass('show')
        })

        // 主推大牌箭头

    }()