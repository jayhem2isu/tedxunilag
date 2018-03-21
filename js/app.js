var body = $('.body');
$.wait = function( callback, seconds){
    return window.setTimeout(
        callback, seconds * 1000 );
}
$('.menu-icon').click(function() {
    if((body).hasClass('menu-inactive')){
        $(body).removeClass('menu-inactive')
    }
    $(body).addClass('menu-active');
    $('.menu').show();
});

$('.menu-close').click(function() {
    if((body).hasClass('menu-active')){
        $(body).removeClass('menu-active')
    }
    $(body).addClass('menu-inactive');
   $('.menu').addClass('menu-slide-out');
   $.wait( function() {
       $('.menu').hide();
       $('.menu').removeClass('menu-slide-out');}, 1.9);   
});

function welcome_animation() {
    $('.x').show();
    $.wait( function() {
        $('.tedx').show();}, 4);  
    $.wait( function() {
        $('.unilag').show();}, 7);   
    
}
$(document).ready(function() {
  welcome_animation();
});