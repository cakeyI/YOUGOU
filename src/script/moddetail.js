define([], function() {
    return {
        init: function() {


            // 标题----------------------------------------------------------------------------------------
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

            // 导航下拉---------------------------------------------------------------------------------------
            let $btns = $('.nav_sdown')
            let $items = $('.nav_downSelect');
            // console.log($items)
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

            //导航栏悬浮---------------------------------------------------------------------------

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

            //渲染--------------------------------------------------------
            let sid = location.search.substring(1).split('=')[1];
            $.ajax({
                type: 'get',
                url: 'http://10.31.163.44/YOUGOU/php/getside.php',
                data: {
                    sid: sid
                },
                dataType: 'json'
            }).done(function(data) {
                $('#pD-bimg').attr('src', data.url);
                $('.main_content>h1').html(data.title);
                $('#yitianPrice>i').html(data.price);
                $('.price>del>i').html(data.zhekou);
                $('.brand-logo img').attr('src', data.logourl)
                $('.prodSpec img').attr('src', data.url)
                $('.Zoomdiv img').attr('src', data.url);

                let listurl = data.piclisturl;
                let picarr = listurl.split(',');
                // console.log(picarr);
                let strhtml = '';

                // 渲染图标提出来  用after伪元素替代
                //     <svg class="icon" aria-hidden="true">
                //     <use xlink:href="#icon-right-fill2">
                //     </use>
                // </svg>
                $.each(picarr, function(index, value) {
                    strhtml += `<li>
                                    <img src="${value}" alt="">
                                </li>`
                });
                $('.goods_col').html(strhtml);
                $('.goods_col li').eq(0).addClass('border');
                $('.goods_col li').eq(0).addClass('change')
            });



            // 放大镜效果--------------------------------------------------------------------------------------------
            const $goodsPic = $('.goodsPic');
            const $jqzoom = $('.jqzoom'); //小图盒子
            const $smpic = $('#pD-bimg'); //小图
            const $Zoomdiv = $('.Zoomdiv'); //大图盒子
            const $bgpic = $('.Zoomdiv img') //大图
            const $ZoomMOVE = $('.ZoomMOVE') //移动小图

            $ZoomMOVE.width($jqzoom.width() * $Zoomdiv.width() / $bgpic.width())
            $ZoomMOVE.height($jqzoom.height() * $Zoomdiv.height() / $bgpic.height())

            const $bili = $bgpic.width() / $jqzoom.width()
            $jqzoom.hover(function() {
                $ZoomMOVE.css('display', 'block')
                $Zoomdiv.css('display', 'block')
                $(this).on('mousemove', function(ev) {
                    let $smleft = ev.pageX - $jqzoom.offset().left - $ZoomMOVE.width() / 2;
                    let $smtop = ev.pageY - $jqzoom.offset().top - $ZoomMOVE.height() / 2;

                    // 判断边缘碰撞
                    if ($smleft <= 0) {
                        $smleft = 0
                    } else if ($smleft > $jqzoom.width() - $ZoomMOVE.width()) {
                        $smleft = $jqzoom.width() - $ZoomMOVE.width()
                    }
                    if ($smtop <= 0) {
                        $smtop = 0
                    } else if ($smtop > $jqzoom.width() - $ZoomMOVE.width()) {
                        $smtop = $jqzoom.width() - $ZoomMOVE.width()
                    }
                    $ZoomMOVE.css({
                        left: $smleft,
                        top: $smtop
                    })
                    $bgpic.css({
                        left: -$smleft * $bili,
                        top: -$smtop * $bili
                    })
                })
            }, function() {
                $ZoomMOVE.css('display', 'none')
                $Zoomdiv.css('display', 'none')
            })

            // 放大镜结束-------------------------------------------------------------------------------------------

            //点击左边列表  切换图片---------------------------------------------------------------------------------------------------------------------
            // 里面的li利用事件委托
            $('.goods_col').on('mousemove', 'li', function(ev) {
                $smpic.attr('src', $(this).find('img').attr('src'))
                $bgpic.attr('src', $(this).find('img').attr('src'))

                $(this).addClass('border').siblings('.goods_col li').removeClass('border');
                $(this).addClass('change').siblings('.goods_col li').removeClass('change')
            })



            // 数量按钮点击++--    ------------------------------------------------------------------------------------------------------
            let newNum = 1
            console.log($('.newNum').attr('value'));
            $('.plus').on('click', function() {
                newNum++
                $('.newNum').attr('value', newNum)
                console.log($('.newNum').attr('value'));
            })
            $('.down').on('click', function() {
                if (newNum <= 1) {
                    newNum = 1
                } else {
                    newNum--
                    $('.newNum').attr('value', newNum)
                }
            })

            // 存储cookie
            let arrsid = []; //存储商品的sid
            let arrnum = []; //商品的数量

            function cookietoarray() {
                if ($.cookie('cookiesid') && $.cookie('cookienum')) { //cookie存在
                    arrsid = $.cookie('cookiesid').split(',');
                    arrnum = $.cookie('cookienum').split(',');
                } else {
                    arrsid = [];
                    arrnum = [];
                }
            }


            $('#addShoppingCart').on('click', function() {
                cookietoarray();
                if ($.inArray(sid, arrsid) === -1) {
                    arrsid.push(sid);
                    arrnum.push($('.newNum').val());
                    $.cookie('cookiesid', arrsid, {
                        expires: 7,
                        path: '/'
                    });
                    $.cookie('cookienum', arrnum, {
                        expires: 7,
                        path: '/'
                    });
                } else {
                    arrnum[$.inArray(sid, arrsid)] = parseInt(arrnum[$.inArray(sid, arrsid)]) + parseInt($('.newNum').val());
                    $.cookie('cookienum', arrnum, {
                        expires: 7,
                        path: '/'
                    });
                }
                alert('加入购物车成功');
            });


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


        }
    }

});