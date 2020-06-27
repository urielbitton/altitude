$(document).ready(function() {
    
//var declarations
var nav = $('nav');    
var logo = $('.logo');    
var menu = $('.menu');    
var mobbtn = $('.mobbtn');    
    
     
    
//bgtitles btn hover  
$('.bgtitles button').hover(function() {
    $(this).find('.fa-layer-group').removeClass('fa-layer-group').addClass('fa-long-arrow-alt-right');
}, function() {
    $(this).find('.fa-long-arrow-alt-right').addClass('fa-layer-group').removeClass('fa-long-arrow-alt-right');
});    
       
      
//slick object for brands
$('.brands').slick({prevArrow:false,nextArrow:false,centerMode: true,autoplay:true,pauseOnHover:false,infinite:true,variableWidth: true,autoplaySpeed: 1000,pauseOnFocus:false});       
        
//navbar scroll down  
$(document).scroll(function() {
    if ($(this).scrollTop() >= 140) {
        nav.css({'background':'#fff','box-shadow':'0px 1px 3px rgba(0,0,0,0.1)'});
        logo.css('top','0px');
        logo.find('img').css('width','50px');
        menu.css('top','18px');
        menu.find('a').css('color','var(--color)');
        menu.find('hr').css('background','var(--color)');
        nav.find('button').css({'background':'var(--color)','border-color':'var(--color)','color':'#fff'});
        mobbtn.css({'top':'10px'});
        mobbtn.find('hr').css('background','var(--color)');
    }  
    else {
        nav.css({'background':'','box-shadow':''});
        logo.css('top','');
        logo.find('img').css('width','');
        menu.css('top','');
        menu.find('a').css('color','');
        menu.find('hr').css('background','');
        nav.find('button').css({'background':'','border-color':'','color':''});
        mobbtn.css({'top':''});
        mobbtn.find('hr').css('background','');
  }
});     
           
$('.mobbtn').on('click', function() {
    $('.mobmenu').css('top','0'); 
});      
$('.closemenu').on('click', function() {
    $('.mobmenu').css('top','');
});    
    
     
     
      
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
});