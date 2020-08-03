//    标题
// $('.heada1').on('mousemove', function() {
//     $('.codeOne').show()
// }).on('mouseout', function() {
//     $('.codeOne').hide()
// });
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

//    $('.heada1').hover(
//        function() {
//            var $code = $(this).find('.codeOne')
//            $code.stop(true, true).show()
//        },
//        function() {
//            var $code = $(this).find('.codeOne')
//            $code.stop(true, true).hide()
//        }
//    )