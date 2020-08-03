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