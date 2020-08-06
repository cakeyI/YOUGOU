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

            // 表单验证*--------------------------------------------------

            // 手机号
            const $phone = $('#reg_mobile_');
            // 手机号提示
            const $phonetip = $('#reg_mobile_tip')
                // 验证码
            const $yzm = $('#code2_')
                // 验证码提示
            const $yzmtip = $('#code2_tip')
                // 短信验证码
            const $myzm = $('#reg_mobile_code_')
                // 短信验证码提示
            const $myzmtips = $('#sendMsgTips')
                // 密码
            const $password = $('#reg_password_')
                // 密码提示
            const $passwordtip = $('#reg_password_tip1')
                // 密码长度提示
            const $passlen = $('#pwdStrength')
                //密码确认
            const $checkpass = $('#reg_password2')
                // 密码确认提示
            const $checkpasstip = $('#reg_password_tip2')
                //表单
            const $form = $('.nreg_form')
                // 同意按钮
            const $rules = $('#rules')


            let $phonenum = false;
            let $yzmnum = false
            let $myzmnum = false;
            let $passwordnum = false;
            let $checkpassnum = false;




            // 手机号
            $phone.on('blur', function() {

                if ($phone.val() !== '') {
                    // 判断是否是正确的手机格式
                    const reg = /^1[35678]\d{9}$/
                    if (reg.test($phone.val())) {

                        $.ajax({
                            url: 'http://10.31.163.44/YOUGOU/php/registry.php',
                            type: 'post',
                            data: {
                                name: this.value
                            }
                        }).done(function(data) {
                            if (!data) {
                                $phonetip.addClass('righttips').removeClass('errortips')
                                $phonetip.html('')
                                $phone.parents('.nreg_input_bg').removeClass('blur')
                                $phonenum = true;
                            } else {
                                $phonetip.html('手机号已存在')
                                $phonetip.addClass('errortips').removeClass('righttips')
                                $phone.parents('.nreg_input_bg').addClass('blur')
                                $phonenum = false;
                            }
                        })

                    } else {
                        $phonetip.html('格式错误')
                        $phonetip.addClass('errortips').removeClass('righttips')
                        $phone.parents('.nreg_input_bg').addClass('blur')
                        $phonenum = false;

                    }
                } else {
                    $phonetip.html('请输入手机号')
                    $phonetip.addClass('errortips').removeClass('righttips')
                    $phone.parents('.nreg_input_bg').addClass('blur')
                    $phonenum = false;

                }
            })

            // 验证码
            $yzm.on('blur', function() {
                if ($yzm.val() !== '') {
                    const reg = /^[a-zA-Z0-9]{4}$/
                    if (reg.test($yzm.val())) {
                        $yzmtip.html('')
                        $yzmtip.removeClass('righttips')
                        $yzm.parents('.nreg_input_bg').removeClass('blur')
                        $yzmnum = true

                    } else {
                        $yzmtip.html('验证码错误')
                        $yzmtip.addClass('errortips').removeClass('righttips')
                        $yzm.parents('.nreg_input_bg').addClass('blur')
                        $yzmnum = false

                    }
                } else {
                    $yzmtip.html('请输入验证码')
                    $yzmtip.addClass('errortips').removeClass('righttips')
                    $yzm.parents('.nreg_input_bg').addClass('blur')
                    $yzmnum = false

                }
            })

            // 短信验证码
            $myzm.on('blur', function() {
                if ($myzm.val() !== '') {
                    const reg = /^[0-9]{4}$/
                    if (reg.test($myzm.val())) {
                        $myzmtips.html('')
                        $myzmtips.removeClass('righttips')
                        $myzm.parents('.nreg_input_bg').removeClass('blur')
                        $myzmnum = true;

                    } else {
                        $myzmtips.html('短信验证码格式不正确')
                        $myzmtips.addClass('errortips').removeClass('righttips')
                        $myzm.parents('.nreg_input_bg').addClass('blur')
                        $myzmnum = false;

                    }
                } else {
                    $myzmtips.html('请输入短信验证码')
                    $myzmtips.addClass('errortips').removeClass('righttips')
                    $myzm.parents('.nreg_input_bg').addClass('blur')
                    $myzmnum = false;

                }
            })

            //密码
            $password.on('input', function() {
                console.log($passlen.find('em').eq(0));
                const reg1 = /\d+/
                const reg2 = /[a-z]+/
                const reg3 = /[A-Z]+/
                const reg4 = /[\W\_]+/
                let cot = 0
                if (reg1.test($password.val())) {
                    cot++
                }
                if (reg2.test($password.val())) {
                    cot++
                }
                if (reg3.test($password.val())) {
                    cot++
                }
                if (reg4.test($password.val())) {
                    cot++
                }
                switch (cot) {
                    case 1:
                        $passlen.find('em').eq(0).addClass('tip1')
                        $passlen.find('em').eq(1).removeClass('tip2')
                        $passlen.find('em').eq(2).removeClass('tip3')
                        break;
                    case 2:
                        $passlen.find('em').eq(0).removeClass('tip1')
                        $passlen.find('em').eq(1).addClass('tip2')
                        $passlen.find('em').eq(2).removeClass('tip3')
                        break;
                    case 3:
                        $passlen.find('em').eq(0).removeClass('tip1')
                        $passlen.find('em').eq(1).removeClass('tip2')
                        $passlen.find('em').eq(2).addClass('tip3')
                        break;
                    case 4:
                        $passlen.find('em').eq(0).removeClass('tip1')
                        $passlen.find('em').eq(1).removeClass('tip2')
                        $passlen.find('em').eq(2).addClass('tip3')
                        break;
                }
            })

            $password.on('blur', function() {
                if ($password.val() !== '') {
                    // 判断是否是正确的手机格式
                    const reg = /^\w{6,25}$/
                    if (reg.test($password.val())) {
                        $passwordtip.addClass('righttips').removeClass('errortips')
                        $passwordtip.html('')
                        $password.parents('.nreg_input_bg').removeClass('blur')
                        $passwordnum = true;

                    } else {
                        $passwordtip.html('密码应6-25之间')
                        $passwordtip.addClass('errortips').removeClass('righttips')
                        $password.parents('.nreg_input_bg').addClass('blur')
                        $passwordnum = false;

                    }
                } else {
                    $passwordtip.html('请输入密码')
                    $passwordtip.addClass('errortips').removeClass('righttips')
                    $password.parents('.nreg_input_bg').addClass('blur')
                    $passwordnum = false;

                }
            })

            // 确认密码
            $checkpass.on('blur', function() {
                if ($checkpass.val() !== '') {
                    // 判断是否是正确的手机格式
                    const reg = /^\w{6,25}$/
                    if (reg.test($checkpass.val())) {
                        if ($checkpass.val() == $password.val()) {
                            $checkpasstip.addClass('righttips').removeClass('errortips')
                            $checkpasstip.html('')
                            $checkpass.parents('.nreg_input_bg').removeClass('blur')
                            $checkpassnum = true;

                        } else {
                            $checkpasstip.html('两次密码输入不一致')
                            $checkpasstip.addClass('errortips').removeClass('righttips')
                            $checkpass.parents('.nreg_input_bg').addClass('blur')
                            $checkpassnum = false;

                        }
                    } else {
                        $checkpasstip.html('密码应6-25之间')
                        $checkpasstip.addClass('errortips').removeClass('righttips')
                        $checkpass.parents('.nreg_input_bg').addClass('blur')
                        $checkpassnum = false;

                    }
                } else {
                    $checkpasstip.html('请输入确认密码')
                    $checkpasstip.addClass('errortips').removeClass('righttips')
                    $checkpass.parents('.nreg_input_bg').addClass('blur')
                    $checkpassnum = false;

                }
            })

            // 提交表单
            $form.on('submit', function() {
                // 提交表单是在确认一遍密码和确认密码是否一致
                if ($checkpass.val() == $password.val()) {
                    $checkpassnum = true;
                } else {
                    $checkpasstip.html('两次密码输入不一致')
                    $checkpasstip.addClass('errortips').removeClass('righttips')
                    $checkpass.parents('.nreg_input_bg').addClass('blur')
                    $checkpassnum = false;
                }


                if ($checkpass.val() == '') {
                    $checkpasstip.html('请输入确认密码')
                    $checkpasstip.addClass('errortips').removeClass('righttips')
                    $checkpass.parents('.nreg_input_bg').addClass('blur')
                }
                if ($password.val() == '') {
                    $passwordtip.html('请输入密码')
                    $passwordtip.addClass('errortips').removeClass('righttips')
                    $password.parents('.nreg_input_bg').addClass('blur')
                }
                if ($myzm.val() == '') {
                    $myzmtips.html('请输入短信验证码')
                    $myzmtips.addClass('errortips').removeClass('righttips')
                    $myzm.parents('.nreg_input_bg').addClass('blur')
                }
                if ($yzm.val() == '') {
                    $yzmtip.html('请输入验证码')
                    $yzmtip.addClass('errortips').removeClass('righttips')
                    $yzm.parents('.nreg_input_bg').addClass('blur')
                }
                if ($phone.val() == '') {
                    $phonetip.html('请输入手机号')
                    $phonetip.addClass('errortips').removeClass('righttips')
                    $phone.parents('.nreg_input_bg').addClass('blur')
                }
                if (!$phonenum || !$yzmnum || !$myzmnum || !$passwordnum || !$checkpassnum) {
                    return false;
                }
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