define([], function() {
    return {
        init: function() {
            // 标题悬浮
            $('.heada1').hover(function() {
                $('.codeOne').stop(true).show()
            }, function() {

                $('.codeOne').stop(true).hide()
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


            // 购物车渲染---------------------------------------------------------------------------------------
            if ($.cookie('cookiesid') && $.cookie('cookienum')) {
                arrsid = $.cookie('cookiesid').split(',');
                arrnum = $.cookie('cookienum').split(',');
                $.each(arrsid, function(index, value) {
                    rendercart(arrsid[index], arrnum[index]);
                })
            }

            let strhtml = '';

            function rendercart(sid, num) {
                console.log(sid);
                console.log(num);
                $.ajax({
                    type: 'get',
                    url: 'http://10.31.163.44/YOUGOU/php/yougoudate.php',
                    dataType: 'json'
                }).done(function(data) {
                    // console.log(data);
                    let arrdata = data
                        // let strhtml = '<tbody>';
                    $.each(data, function(index, value) {
                        if (value.sid == sid) {
                            strhtml += `
                                        <tr>
                                            <td id="tr_td" colspan="7">
                                                <div class="td_div">
                                                    <input type="checkbox" class="checkbox">
                                                    <div class="imgbox">
                                                        <img src="${value.url}" alt="">
                                                    </div>
                                                    <p class="goodstitle">${value.title}</p>
                                                    <div class="sizebox">
                                                        <p><span>颜色：</span>黑色</p>
                                                        <p><span>尺码：</span>F</p>
                                                    </div>
                                                    <span class="price">${value.price}</span>
                                                    <div class="goods_num">
                                                        <a href="javascript:;" class="down">-</a>
                                                        <input type="text" value="${num}" class="num">
                                                        <a href="javascript:;" class="up">+</a>
                                                    </div>
                                                    <span class="priceall">${value.price*num}</span>
                                                    <div class="operator">
                                                        <a href="javascript:;" class="remove">移入收藏夹</a>
                                                        <a href="javascript:;" class="del"  data-index="${value.sid}" >删除</a>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                      `;
                        }
                    })
                    $('tbody').html(strhtml)

                    // 多选-------------------------------------------------------
                    // 获取全选元素
                    let $allselect = $('.allselect')
                    let $sgcheck = $('.checkbox').not('.allselect');
                    let $checkbox = $('.checkbox')
                    $allselect.on('click', function() {
                        $checkbox.prop('checked', $(this).prop('checked'));
                    });
                    $sgcheck.on('click', function() {
                        if ($sgcheck.length === $('input:checked').not('.allselect').size()) {
                            $allselect.prop('checked', true);
                        } else {
                            $allselect.prop('checked', false);
                        }
                    });
                    // 多选结束-------------------------------------------------------------------

                    //删除元素
                    console.log('----------------------------------');
                    // console.log($('.operator .del'));

                    $('.operator .del').on('click', function() {
                        let pop = confirm('确定要删除当前商品？')
                        if (pop == true) {

                            let cooknum = $(this).attr('data-index')
                                // alert($(this).attr('data-index'));
                            let cook_sid = arrsid.indexOf(cooknum)

                            console.log(arrsid.indexOf(cooknum));
                            arrsid.splice(cook_sid, 1)
                            arrnum.splice(cook_sid, 1)
                            $.cookie('cookiesid', arrsid, {
                                expires: 7,
                                path: '/'
                            });
                            $.cookie('cookienum', arrnum, {
                                expires: 7,
                                path: '/'
                            });
                            $('tr').eq($(this).index()).remove()
                        } else {

                        }

                    })

                    // 总价显示
                    // $('.corg').html(sum);


                    //购物车内容事件-----------------------------------------------------------------------------------
                    // 数量点击++--
                    $('.goods_num .up').on('click', function(ev) {
                        // 获取它的上一个兄弟元素
                        let newNum = $(this).prev().val()
                            // alert(newNum);
                        newNum++;
                        $(this).prev().val(newNum)
                            //取得他的价格小计
                        let sumprice = $(this).parent().next().html()
                            // 取到他的单价
                        $(this).parent().prev().html()
                        let sgprice = $(this).parent().prev().html()
                        $(this).parent().next().html(newNum * sgprice)


                        // 取到他的小计
                        let allprice = $('.allprice').html()
                        console.log($('.allprice').html());
                        // 点击++--总价随之改变

                    })
                    $('.goods_num .down').on('click', function(ev) {
                        // 获取它的下一个兄弟元素
                        let newNum = $(this).next().val()
                            // alert(newNum);
                        newNum--;
                        $(this).next().val(newNum)
                            //取得他的价格小计
                        let sumprice = $(this).parent().next().html()
                            // 取到他的单价
                        $(this).parent().prev().html()
                        let sgprice = $(this).parent().prev().html()
                        $(this).parent().next().html(newNum * sgprice)

                    })

                    // 单个总价小计
                });

            }
            // 清空购物车
            $('.clearShopcart').on('click', function() {
                let pop = confirm('确定删除吗？')
                if (pop == true) {
                    $.cookie('cookiesid', arrsid, {
                        expires: -1,
                        path: '/'
                    });
                    $.cookie('cookienum', arrnum, {
                        expires: -1,
                        path: '/'
                    });

                    $('tbody').children().remove()
                } else {}
            })





            // 设置用户cookie
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


            // 购物车总结--------------------------------------------------------------------------------------------
            // 总价统计未完成(全选单选的价格变化)--------------------------------------------------------------------------
            // 内容弹性盒   价格发生变化时 位置也有轻微变化
        }
    }
});