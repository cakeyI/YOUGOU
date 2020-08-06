define([], function() {
    return {
        init: function() {
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


            // 用户名
            const $count = $('#email_')
                // 密码
            const $password = $('#password_')
                // 用户名提示框
            const $counttip = $('#login_email_tip')
                // 密码提示框
            const $passwordtip = $('#login_password_tip')
                // 表单
            const $form = $('#loginform')

            let $countnum = false
            let $passnum = false

            $count.on('blur', function() {
                if ($count.val() !== '') {
                    $counttip.html('');
                    $counttip.removeClass('errortips');
                    $count.parents('.nreg_input_bg').removeClass('blur');
                    $countnum = true
                } else {
                    $counttip.html('请输入账号');
                    $counttip.addClass('errortips');
                    $count.parents('.nreg_input_bg').addClass('blur');
                    $countnum = false
                }
            })

            $password.on('blur', function() {
                if ($password.val() !== '') {
                    // 判断是否是正确的手机格式
                    const reg = /^\w{6,25}$/
                    if (reg.test($password.val())) {
                        $passwordtip.removeClass('errortips');
                        $passwordtip.html('')
                        $password.parents('.nreg_input_bg').removeClass('blur')
                        $passnum = true

                    } else {
                        $passwordtip.html('密码应6-25之间')
                        $passwordtip.addClass('errortips')
                        $password.parents('.nreg_input_bg').addClass('blur')
                        $passnum = false

                    }
                } else {
                    $passwordtip.html('请输入密码')
                    $passwordtip.addClass('errortips')
                    $password.parents('.nreg_input_bg').addClass('blur')
                    $passnum = false
                }
            })



            $form.on('submit', function() {
                $.ajax({
                    type: 'post',
                    url: 'http://10.31.163.44/YOUGOU/php/login.php',
                    data: {
                        name: $count.val(),
                        pass: $password.val()
                    }
                }).done(function(data) {
                    if (!data) {
                        alert('用户名或者密码错误');

                        $password.val('')
                    } else {
                        $.cookie('username', $count.val(), {
                            expires: 7,
                            path: '/'
                        });
                        location.href = "index.html"; //首页
                    }
                })
                if ($count.val() == '') {
                    $counttip.html('请输入账号');
                    $counttip.addClass('errortips');
                    $count.parents('.nreg_input_bg').addClass('blur');
                }
                if ($password.val() == '') {
                    $passwordtip.html('请输入密码')
                    $passwordtip.addClass('errortips')
                    $password.parents('.nreg_input_bg').addClass('blur')
                }
                if (!$countnum || !$passnum) {}
                return false
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




        }
    }

});