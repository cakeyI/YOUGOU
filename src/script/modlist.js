define(['jquery.pagination'], function() {
    return {
        init: function() {
            // 标题-------------------------------------------------------------------------------------------------
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

            // 导航下拉------------------------------------------------------------------------------------------
            let $btns = $('.nav_sdown')
            let $items = $('.nav_downSelect');
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

            //导航栏悬浮------------------------------------------------------------------------------------------
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


            //侧边栏悬浮---------------------------------------------------------------------------------------
            const $sidenav = $('.filter-sub-navlist')
            $(window).scroll(function() {

                let scrollHeight = $(document).scrollTop();
                // console.log(scrollHeight)
                if (scrollHeight > 250) {
                    $sidenav.addClass("suspend");
                    // log.style.display = 'block';

                }
                if (scrollHeight < 250) {
                    $sidenav.removeClass("suspend");
                    // log.style.display = 'none';
                }
            })

            $(window).scroll(function() {

                let scrollHeight = $(document).scrollTop();
                // console.log(scrollHeight)
                if (scrollHeight > 1100) {
                    // $sidenav.addClass("suspend");
                    $sidenav.css('display', 'none')
                }
                if (scrollHeight < 1100) {
                    // $sidenav.removeClass("suspend");
                    $sidenav.css('display', 'block')
                }
            })

            // 侧边框点击出现---------------------------------------------------------------------------------
            const $sideli = $('.sideli');
            console.log($sideli.length)
            const $sideliul = $('.down_select_ul')
            console.log($sideliul.length)

            $sideli.eq($(this).index()).on('click', function(ev) {
                $sideliul.eq($(this).index()).css('display', 'block')
            })

            let array_default = []; //排序前的li数组
            let array = []; //排序中的数组
            let prev = null;
            let next = null;


            // list 渲染----------------------------------------------------------------------------------------
            const goodslist = $('.goodslist');

            $.ajax({
                url: 'http://10.31.163.44/YOUGOU/php/listdate.php',
                dataType: 'json'
            }).done(function(data) {
                console.log(data);
                let strhtml = '<ul class="goodslist_ul">';
                $.each(data, function(index, value) {
                    strhtml += `
                            <a href="detail.html?sid=${value.sid}" target="_blank">
                            
                                <li class="goodslist_ul_li">
                                    <div>
                                        <div class="imgdiv">
                                            <img data-original="${value.url} alt="" class="lazy" width="230" height="230"/>
                                        </div>
                                        <p>${value.title}</p>
                                        <span class="price_sc price-wrap">
                                            <em>¥&nbsp;<i class="price">${value.price}</i></em>
                                            <del>¥&nbsp;<i>${value.zhekou}</i></del>
                                        </span>
                                        <svg class="icon" aria-hidden="true">
                                            <use xlink:href="#icon-shoucang
                                            "></use>
                                        </svg>
                                    </div>
                                </li>
                            </a>
                        `;
                });
                strhtml += '</ul>';
                goodslist.html(strhtml);


                $(function() {
                    $("img.lazy").lazyload({ effect: "fadeIn" });
                });

                array_default = []; //排序前的li数组-默认排序的数组
                array = []; //排序中的数组
                prev = null;
                next = null;

                $('.goodslist_ul>a').each(function(index, element) {
                    array[index] = $(this);
                    // console.log(array);
                    array_default[index] = $(this);
                    // console.log(array_default);
                });
            });





            //分页------------------------------------------------------------------------

            $('.pagelist').pagination({
                pageCount: 3,
                jump: true,
                // coping: true, 
                prevContent: '<上一页',
                nextContent: '下一页>',
                // homePage: '首页',
                // endPage: '尾页',
                callback: function(api) {
                    console.log(api.getCurrent()); //获取当前的页码
                    $.ajax({
                        url: 'http://10.31.163.44/YOUGOU/php/listdate.php',
                        data: {
                            page: api.getCurrent()
                        },
                        dataType: 'json'
                    }).done(function(data) {
                        let strhtml = '<ul class="goodslist_ul">';
                        $.each(data, function(index, value) {
                            strhtml += `
                            <a href="detail.html?sid=${value.sid}" target="_blank">
                            <li class="goodslist_ul_li">
                                        <div>
                                            <div class="imgdiv">
                                                <img data-original="${value.url} alt="" class="lazy" width="230" height="230"/>
                                            </div>
                                            <p>${value.title}</p>
                                            <span class="price_sc price-wrap">
                                                <em>¥&nbsp;<i class="price">${value.price}</i></em>
                                                <del>¥&nbsp;<i>${value.zhekou}</i></del>
                                            </span>
                                            <svg class="icon" aria-hidden="true">
                                                <use xlink:href="#icon-shoucang
                                                "></use>
                                              </svg>
                                        </div>
                                        </li>
                                        </a>
                                `;
                        });
                        strhtml += '</ul>';
                        goodslist.html(strhtml);
                        // 懒加载
                        $(function() {
                            $("img.lazy").lazyload({ effect: "fadeIn" });

                        });

                        // //分页后进行对应的赋值和排序。
                        array_default = []; //排序前的li数组
                        array = []; //排序中的数组
                        prev = null;
                        next = null;

                        // //将页面的li元素加载到两个数组中
                        $('.goodslist_ul>a').each(function(index, element) {
                            array[index] = $(this);
                            // console.log(array[index]);
                            array_default[index] = $(this);
                        });
                    })
                }
            });


            //默认排序 ----------------------------------------------------------------------
            $('.mainli').eq(0).on('click', function() {
                $.each(array_default, function(index, value) { //value就是li标签
                    $('.goodslist ul').append(value);
                });
                return;
            });
            //升序排序   冒泡排序 --------------------------------------------------------------
            // console.log($('.mainli').eq(1));
            $('.mainli').eq(1).on('click', function() {
                // alert(1)
                for (let i = 0; i < array.length - 1; i++) {
                    for (let j = 0; j < array.length - i - 1; j++) {
                        console.log(array[j].find('.price').html());
                        prev = array[j].find('.price').html();
                        next = array[j + 1].find('.price').html();
                        if (prev > next) {
                            let temp = array[j];
                            array[j] = array[j + 1];
                            array[j + 1] = temp;
                        }
                    }
                }
                //换完li位置，进行渲染。
                $.each(array, function(index, value) {
                    // console.log(value); //n.fn.init [li, context: li]
                    $('.goodslist ul').append(value);
                });
            });

            //降序-----------------------------------------------------------------------------------------
            $('.mainli').eq(2).on('click', function() {
                for (let i = 0; i < array.length - 1; i++) {
                    for (let j = 0; j < array.length - i - 1; j++) {
                        prev = array[j].find('.price').html();
                        next = array[j + 1].find('.price').html();
                        if (prev < next) {
                            let temp = array[j];
                            array[j] = array[j + 1];
                            array[j + 1] = temp;
                        }
                    }
                }
                $.each(array, function(index, value) {
                    $('.goodslist ul').append(value);
                });
            })

            // console.log($('.mainli'));
            // 排序结束


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