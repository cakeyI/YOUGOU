define([], function() {
    return {
        init: function() {
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

            //导航栏悬浮
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




            // list 渲染
            const goodslist = $('.goodslist');

            $.ajax({
                url: 'http://localhost/yougou/php/yougoudate.php',
                dataType: 'json'
            }).done(function(data) {
                let strhtml = '<ul class="goodslist_ul">';
                $.each(data, function(index, value) {
                    strhtml += `
                            <a href="goods.html?sid=${value.sid}" target="_blank">
                            
                                <li class="goodslist_ul_li">
                                <div>
                                    <div class="imgdiv">
                                        <img data-original="${value.url} alt="" class="lazy" width="230" height="230"/>
                                    </div>
                                    <p>${value.title}</p>
                                    <span class="price_sc price-wrap">
                                        <em>¥&nbsp;<i>${value.price}</i></em>
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

                // <li>
                //     <img  data-original="${value.url}" class="lazy" width="200" height="200"/>
                //     <p>${value.title}</p>
                //     <span>${value.price}</span>
                //     <span>${value.sailnumber}</span>
                // </li>

                //添加图片懒加载
                //1.设置类名lazy
                //2.图片路径绑定在  data-original=""
                //3.设置图片宽高。
                //4.渲染图片
                //5.{effect: "fadeIn"}:淡入效果
                $(function() {
                    $("img.lazy").lazyload({ effect: "fadeIn" });

                });
            });
        }
    }
});