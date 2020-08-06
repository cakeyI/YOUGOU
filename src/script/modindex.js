define([], function() {
    return {
        init: function() {
            //导航栏悬浮--------------------------------------------------------------------------------------
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

            //标题下拉二维码
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

            // 设置用户cookie信息
            if ($.cookie('username')) { //存在
                $('.regsitry').css('display', 'none')
                $('.cookie').css('display', 'block');
                $('.cookie').find('span').html($.cookie('username'))
            }
            $('.cookie').find('a').on('click', function() {
                $.cookie('username', null, {
                    expires: -1,
                    path: '/'
                })
                $('.regsitry').css('display', 'block')
                $('.cookie').css('display', 'none');
            })

            // 二级菜单下拉-------------------------------------------------------------------------------------
            let $btns = $('.nav_sdown')
                // console.log($btns.length);
            let $items = $('.nav_downSelect');
            // console.log($items)
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
                    // console.log($(this).index());
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
            //轮播图--------------------------------------------------------------------------------------------
            const $pi = $('.pic')
            const $pic = $('.lunbo')
            const $pichover1 = $('.pichover1')
            let timer1 = null
            let index1 = 0;

            $pichover1.on('mouseover', function() {
                    index1 = $(this).index();
                    tab();
                })
                // 轮播图函数
            function tab() {
                $pichover1.eq(index1).addClass('picshow').siblings('.pichover1').removeClass('picshow')
                $pic.eq(index1).addClass('show').siblings('.lunbo').removeClass('show');
            }
            timer1 = setInterval(() => {
                index1++;
                if (index1 > $pic.length - 1) {
                    index1 = 0
                }
                tab();
            }, 5000);


            // 鼠标移入暂停
            $pi.hover(function() {
                clearTimeout(timer1);
            }, function() {
                timer1 = setInterval(() => {
                    index1++;
                    if (index1 > $pic.length - 1) {
                        index1 = 0
                    }
                    tab();
                }, 4000);
            });


            // 内容按钮切换---------------------------------------------------------------------------------------
            const $tabsa = $('.tabsa')
            const $tabsb = $('.tabsb')
            const $mp_content = $('.mp_content')
            const $np_content = $('.np_content')
                // console.log($tabsa);
                // console.log($np_content);
            const $new_ul = $('.np_ul')
            let $li1_num = 0
            let $li2_num = 0

            // 新品推荐
            $tabsa.on('click', function() {
                    $(this).addClass('tb_active').siblings('.tabsa').removeClass('tb_active');
                    $np_content.eq($(this).index()).addClass('show').siblings('.np_content').removeClass('show')
                        // $new_ul.css('left', '0')
                        // $li_num = 0
                })
                // 新品推荐箭头
            const $new_aleft1 = $('.np_a1 .leftarrow');
            const $new_aright1 = $('.np_a1 .rightarrow')
            const $new_aleft2 = $('.np_a2 .leftarrow');
            const $new_aright2 = $('.np_a2 .rightarrow')
            const $new_li1 = $('.np_ul1 li')
            const $new_li2 = $('.np_ul2 li')
            let $new_li2_len = $('.np_ul2 li').length
            console.log($new_li2_len)
            const $new_ul1 = $('.np_ul1')
            const $new_ul2 = $('.np_ul2')
            let $new_li1_len = $('.np_ul1>li').length
            console.log($new_li1_len)
            let $new_li1_width = $('.np_ul1 li').eq(0).outerWidth(true);

            $new_aright1.on('click', function() {
                rclick1($new_li1_len, $new_ul1)
            })
            $new_aleft1.on('click', function() {
                lclick1($new_li1_len, $new_ul1)
            })
            $new_aright2.on('click', function() {
                rclick2($new_li2_len, $new_ul2)
            })
            $new_aleft2.on('click', function() {
                    lclick2($new_li2_len, $new_ul2)
                })
                // 箭头点击函数
            function rclick1(a, b) {
                if (a - 4 > $li1_num) {
                    // console.log($new_li1_len);
                    $li1_num += 4;
                    console.log($li1_num);
                    b.stop(true).animate({
                        left: -$new_li1_width * ($li1_num)
                    })
                }
                if ($li1_num >= a) {
                    $li1_num += 0
                }
            }

            function lclick1(a, b) {
                if (a > $li1_num) {
                    if ($li1_num <= 0) {
                        $li1_num += 0
                        b.css('left', '0')
                    } else {
                        $li1_num -= 4;
                        console.log($li1_num);
                        b.stop(true).animate({
                            left: $new_li1_width * (0 - $li1_num)
                        })
                    }
                }
            }

            function rclick2(a, b) {
                if (a - 4 > $li2_num) {
                    // console.log($new_li1_len);
                    $li2_num += 4;
                    console.log($li2_num);
                    b.stop(true).animate({
                        left: -$new_li1_width * ($li2_num)
                    })
                }
                if ($li2_num >= a) {
                    $li2_num += 0
                }
            }

            function lclick2(a, b) {
                if (a > $li2_num) {
                    if ($li2_num <= 0) {
                        $li2_num += 0
                        b.css('left', '0')
                    } else {
                        $li2_num -= 4;
                        console.log($li2_num);
                        b.stop(true).animate({
                            left: $new_li1_width * (0 - $li2_num)
                        })
                    }
                }
            }

            //主推大牌

            $tabsb.on('click', function() {
                $(this).addClass('tb_active').siblings('.tabsb').removeClass('tb_active');
                $mp_content.eq($(this).index()).addClass('show').siblings('.mp_content').removeClass('show')
            })

            // 主推大牌箭头
            const $push_larrow1 = $('.mpul1 .arrowone')
            const $push_larrow2 = $('.mpul2 .arrowone')
            const $push_rarrow1 = $('.mpul1 .arrowtwo')
            const $push_rarrow2 = $('.mpul2 .arrowtwo')
            const $push_div1 = $('.mpul1 .swiper-item-wrap')
            const $push_div2 = $('.mpul2 .swiper-item-wrap')
            $push_rarrow1.on('click', function() {
                $push_div1.stop(true).animate({
                    left: -828
                })
            })
            $push_larrow1.on('click', function() {
                $push_div1.stop(true).animate({
                    left: 0
                })
            })
            $push_larrow2.on('click', function() {
                $push_div2.stop(true).animate({
                    left: 0
                })
            })
            $push_rarrow2.on('click', function() {
                $push_div2.stop(true).animate({
                    left: -828
                })
            })







        }
    }
});