var js_={index:function(){new Swiper("#home .swiper-container",{autoplay:5e3,loop:!0,pagination:".swiper-pagination"}),new Swiper("#home .swiper-container2",{freeMode:!0,slidesPerView:"auto"});$("html,body").stop(!0,!0).animate({scrollTop:1},0);var e=$(window).height(),i=($("#footer").height(),[["1","2","3"],["1","2","3"],["1","2","3"]]),t=!0,o=0,c=!0;$(window).scroll(function(){console.log("1");var a=parseFloat($("#home .moviePlace .box:last").offset().top)+parseFloat($("#home .moviePlace .box").height());console.log(a),a<(document.body.scrollTop||document.documentElement.scrollTop)+e&&t&&c&&(console.log("加载影院"),c=!1,o<i.length&&$("#home .loadingIcon").show(),setTimeout(function(){for($("#home .loadingIcon").hide(),o;o<i.length;){for(var e=0;e<i[o].length;e++)$("#home .moviePlace").append('<div class="box"><dl><dt>万达国际影城（南海万达广场）</dt><dd class="clear"><div class="d-b f-l">佛上市南海区桂澜北路28号南海万达广场</div><span class="d-b f-r ta-r">1.4km</span></dd></dl></div>');o+=1;break}c=!0},2e3),o==i.length&&(t=!1,$("#home .noThing").show()))})},selectCity:function(){function e(e){c.innerHTML="Latitude: "+e.coords.latitude+"<br />Longitude: "+e.coords.longitude,console.log("x："+e.coords.latitude+",y："+e.coords.longitude),t=e.coords.longitude,o=e.coords.latitude,$("#demo").text("手机原生h5定位，经度："+e.coords.longitude+", 纬度："+e.coords.latitude)}function i(e){switch(e.code){case e.PERMISSION_DENIED:c.innerHTML="定位失败,用户拒绝请求地理定位";break;case e.POSITION_UNAVAILABLE:c.innerHTML="定位失败,位置信息是不可用";break;case e.TIMEOUT:c.innerHTML="定位失败,请求获取用户位置超时";break;case e.UNKNOWN_ERROR:c.innerHTML="定位失败,定位系统失效"}}var t,o,c=document.getElementById("demo");!function(){navigator.geolocation?navigator.geolocation.getCurrentPosition(e,i):c.innerHTML="Geolocation is not supported by this browser."}();var a,n,s=new BMap.Map("allmap"),l=new BMap.Point(t,o);s.centerAndZoom(l,12),(new BMap.Geolocation).getCurrentPosition(function(e){if(this.getStatus()==BMAP_STATUS_SUCCESS){var i=new BMap.Marker(e.point);s.addOverlay(i),s.panTo(e.point),a=e.point.lng,n=e.point.lat,$("#baiduMap").text("百度地图 API 经度："+e.point.lng+", 纬度："+e.point.lat)}},{enableHighAccuracy:!0})},movieDetails:function(){$(".textAll").height();$(".bottomBox").click(function(){$(".story").hasClass("max_3h")?($(".story").removeClass("max_3h").addClass("max_h"),$(".bottomShadow").hide(),$(".bottomBox .arrowsIcon").addClass("perversion")):($(".story").removeClass("max_h").addClass("max_3h"),$(".bottomShadow").show(),$(".bottomBox .arrowsIcon").removeClass("perversion"))});new Swiper("#movieDetails .swiper-container",{freeMode:!0,slidesPerView:"auto"})},movieScreening:function(){$("html,body").stop(!0,!0).animate({scrollTop:1},0);var e=$(".html_body #movieScreening .listWrap").offset().top,i=$(window).height(),t=$("#footer").height(),o=Math.round(i-e-t),c=$(".html_body #movieScreening .fixWrap .boxWrap .cityNav").height(),a=Math.round(i-e-c-t),n=[["1","2","3"],["1","2","3"],["1","2","3"]],s=!0,l=0,d=!0;$(window).scroll(function(){console.log("1");var e=parseFloat($("#movieScreening .listWrap .filmList .box:last").offset().top)+parseFloat($("#movieScreening .listWrap .filmList .box").height());console.log(e),e<(document.body.scrollTop||document.documentElement.scrollTop)+i&&s&&d&&(console.log("加载影院"),d=!1,l<n.length&&$("#movieScreening .loadingIcon").show(),setTimeout(function(){for($("#movieScreening .loadingIcon").hide(),l;l<n.length;){for(var e=0;e<n[l].length;e++)$("#movieScreening .filmList").append('<div class="box"><dl><dt class="clear"><div class="leftBox d-b f-l">万达国际影城（南海万达广场）</div><div class="rightBox d-b f-r ta-r"><span>￥28</span> 起</div></dt><dd class="clear"><div class="leftBox d-b f-l">佛上市南海区桂澜北路28号南海万达广场</div><div class="rightBox d-b f-r ta-r">1.4km</div></dd></dl></div>');l+=1;break}d=!0},2e3),l==n.length&&(s=!1,$("#movieScreening .noThing").show()))}),$(".html_body #movieScreening .nav .navBox").click(function(){if($(this).hasClass("active"))$(this).removeClass("active"),$(".html_body #movieScreening .fixWrap .boxWrap").hide(),$(".shadow").hide(),$("body").css({"overflow-y":"auto",height:"auto"});else{var e=$(this).index();$(this).addClass("active").siblings().removeClass("active"),$(".html_body #movieScreening .fixWrap .boxWrap").eq(e).show().siblings().hide(),$(".shadow").show(),$("body").css({"overflow-y":"hidden",height:"100%"})}}),$(".html_body #movieScreening .fixWrap .boxWrap .cityNav .navBox").click(function(){var e=$(this).index();$(this).addClass("active").siblings().removeClass("active"),$(".html_body #movieScreening .fixWrap .boxWrap .cityListWrap .boxList").eq(e).show().siblings().hide()}),$(".html_body #movieScreening .fixWrap .listHeight1").css("height",o+"px"),$(".html_body #movieScreening .fixWrap .listHeight2").css("height",a+"px"),$(".html_body #movieScreening .fixWrap .boxWrap .boxList .box").click(function(){$(this).addClass("active").siblings().removeClass("active"),$(".shadow").css("z-index","11").show(),$(".loadIcon").show(),$("body").css({"overflow-y":"hidden",height:"100%"});for(var e=[],i=0;i<10;i++)e.push('<div class="box"><dl><dt class="clear"><div class="leftBox d-b f-l">万达国际影城（南海万达广场）</div><div class="rightBox d-b f-r ta-r"><span>￥28</span> 起</div></dt><dd class="clear"><div class="leftBox d-b f-l">佛上市南海区桂澜北路28号南海万达广场</div><div class="rightBox d-b f-r ta-r">1.4km</div></dd></dl></div>');$(".html_body #movieScreening .listWrap .filmList").html(e);setTimeout(function(){n=[["1","2","3","4"],["1","2"]],s=!0,l=0,d=!0,$("#movieScreening .noThing").hide(),$(".html_body #movieScreening .fixWrap .boxWrap").hide(),$(".html_body #movieScreening .nav .navBox").removeClass("active"),$(".shadow").css("z-index","8").hide(),$(".loadIcon").hide(),$("html,body").stop(!0,!0).animate({scrollTop:0},0),$(document.body).css({"overflow-y":"auto",height:"auto"})},2e3)})},cinemaBuyTicket:function(){function e(){$(".shadow").css("z-index","11").show(),$(".loadIcon").show();for(var e=[],i=0;i<10;i++)e.push('<div class="box"><dl><dt class="clear"><div class="leftBox d-b f-l">万达国际影城（南海万达广场）</div><div class="rightBox d-b f-r ta-r"><span>￥28</span> 起</div></dt><dd class="clear"><div class="leftBox d-b f-l">佛上市南海区桂澜北路28号南海万达广场</div><div class="rightBox d-b f-r ta-r">1.4km</div></dd></dl></div>');$(".html_body #cinemaBuyTicket .listWrap .filmList").html(e);setTimeout(function(){$(".html_body #cinemaBuyTicket .fixWrap .boxWrap").hide(),$(".html_body #cinemaBuyTicket .nav .navBtn").removeClass("active"),$(".shadow").css("z-index","8").hide(),$(".loadIcon").hide(),$("html,body").stop(!0,!0).animate({scrollTop:0},0)},2e3)}var i,t=$(window).height(),o=$(".movieBanner .blackBg").height(),c=$("#header").innerHeight(),a=$(".fixBox").height(),n=Math.round(t-c-o-a)/2,s=$(".html_body #cinemaBuyTicket .fixWrap .boxWrap .cityNav").height(),l=Math.round(t-c-o-a-s)/2;$(".html_body #cinemaBuyTicket .fixWrap .listHeight1").css("height",n+"px"),$(".html_body #cinemaBuyTicket .fixWrap .listHeight2").css("height",l+"px"),$(window).scroll(function(){$(document).scrollTop()>o?($(".fixBox").css({position:"fixed",top:c}),$(".html_body #cinemaBuyTicket .listWrap").css("top",a)):($(".fixBox").css({position:"relative",top:"0"}),$(".html_body #cinemaBuyTicket .listWrap").css("top","0")),i=$(document).scrollTop()<o?document.body.scrollTop:o,n=Math.round(t-c-o-a+i)/1.5,$(".html_body #cinemaBuyTicket .fixWrap .listHeight1").css("height",n+"px"),l=Math.round(t-c-o-a-s+i)/1.5,$(".html_body #cinemaBuyTicket .fixWrap .listHeight2").css("height",l+"px")}),$(".html_body #cinemaBuyTicket .nav .navBtn").click(function(){if($(this).hasClass("active"))$(this).removeClass("active"),$(".html_body #cinemaBuyTicket .fixWrap .boxWrap").hide(),$(".shadow").hide(),$("body").css({"overflow-y":"auto",height:"auto"});else{var e=$(this).index();$(this).addClass("active").siblings().removeClass("active"),$(".html_body #cinemaBuyTicket .fixWrap .boxWrap").eq(e).show().siblings().hide(),$(".shadow").show(),$("body").css({"overflow-y":"hidden",height:"100%"})}}),$(".html_body #cinemaBuyTicket .fixWrap .boxWrap .cityNav .navBox").click(function(){var e=$(this).index();$(this).addClass("active").siblings().removeClass("active"),$(".html_body #cinemaBuyTicket .fixWrap .boxWrap .cityListWrap .boxList").eq(e).show().siblings().hide()}),$(".html_body #cinemaBuyTicket .fixWrap .boxWrap .boxList .box").click(function(){$(".html_body #cinemaBuyTicket .fixWrap .boxWrap .boxList .box").removeClass("active"),$(this).addClass("active"),e(),$("body").css({"overflow-y":"auto",height:"auto"})});new Swiper("#cinemaBuyTicket .swiper-container",{freeMode:!0,slidesPerView:"auto",loop:!0,slideToClickedSlide:!0,onTap:function(i){var t=$(".html_body #cinemaBuyTicket .swiper-slide-active");t.addClass("active").siblings().removeClass("active"),console.log(t.attr("data-swiper-slide-index")),e(),$(".html_body #cinemaBuyTicket .fixWrap .boxWrap .boxList .box").removeClass("active"),$(".html_body #cinemaBuyTicket .nav .navBox").eq(1).removeClass("active"),$(".html_body #cinemaBuyTicket .nav .navBox").eq(0).addClass("active")}})},buyTicketTime:function(){function e(){$(".shadow,.loadIcon").show();setTimeout(function(){$(".shadow,.loadIcon").hide(),$("html,body").stop(!0,!0).animate({scrollTop:0},0);for(var e=[],i=0;i<3;i++)e.push('<div class="box d-b clear"><dl class="time d-b f-l"><dt>11:30</dt><dd>13:30</dd></dl><dl class="place d-b f-l ta-c"><dt>国语</dt><dd>3厅</dd></dl><div class="price d-b f-l ta-c">28 <span>元</span></div><div class="btnBuy d-b f-r ta-c">选座购票</div></div>');$(".html_body #buyTicketTime .sessionList").html(e)},2e3)}new Swiper("#buyTicketTime .swiper-container",{slidesPerView:"auto",loop:!0,slideToClickedSlide:!0,initialSlide:0,centeredSlides:!0,autoHeight:!0,onSlideChangeEnd:function(i){var t=$(".html_body #buyTicketTime .swiper-container .swiper-slide-active"),o=t.find("img").attr("src");$(".html_body #buyTicketTime .movieBg").css("background","url("+o+")"),e()}}),new Swiper("#buyTicketTime .swiper-container2",{freeMode:!0,slidesPerView:"auto",loop:!0,slideToClickedSlide:!0,onTap:function(i){var t=$(".html_body #buyTicketTime .swiper-container2 .swiper-slide-active");t.addClass("active").siblings().removeClass("active"),console.log(t.attr("data-swiper-slide-index")),e()}})},moviePhotos:function(){function e(){$(".html_body #moviePhotos .photoList .box").bind("click",function(){$("body").css({height:i,"overflow-y":"hidden"});var e=$(this).index();console.log(e);$(this).find(".img").attr("data-img");c.slideTo(e,0,!0),$(".html_body #moviePhotos .fixBox").css({"z-index":"11",visibility:"visible"})})}var i=$(window).height(),t=$(".html_body #header").innerHeight(),o=i-t;$(".html_body #moviePhotos .fixBox").css("height",o),e();var c=new Swiper("#moviePhotos .swiper-container",{autoHeight:!0,pagination:".swiper-pagination",paginationType:"fraction"});$(".html_body #moviePhotos .fixBox .closeBtn").click(function(){$(".html_body #moviePhotos .fixBox").css({"z-index":"-1",visibility:"hidden"}),$("body").css({height:"auto","overflow-y":"auto"})});var a=!0,n=!0,s=[["1","2","3","4"],["5","6","7","8"],["9","10","11","12"]],l=0;$(window).scroll(function(){parseFloat($("#moviePhotos .list .box:last").offset().top)+parseFloat($("#moviePhotos .list .box").height())<(document.body.scrollTop||document.documentElement.scrollTop)+i&&a&&n&&(n=!1,l<s.length&&$(".html_body #moviePhotos .photoList .loadingIcon").show(),setTimeout(function(){for($(".html_body #moviePhotos .photoList .loadingIcon").hide(),l;l<s.length;){for(var i=0;i<s[l].length;i++)$(".html_body #moviePhotos .list").append('<div class="box d-b f-l"><div class="wrap">.id<div class="img d-b" style="background-image:url(img/photoImg1.jpg)"></div></div></div>'),c.appendSlide('<div class="swiper-slide"><div class="box d-b p-a"><img class="img d-b" src="img/photoImg1.jpg"></div></div>');l+=1;break}c.update(),n=!0,e()},2e3),l==s.length&&(a=!1,$("#moviePhotos .noPhoto").show()))})},film_order:function(){$("title").html("电影订单"),$("#header").css("background","#f8f8f8"),$("body").css("background","#f6f6f6")},c_ticket_details:function(){$("title").html("电影票详情"),window.location.href.indexOf("c_ticket_details.html")>=0&&($(".foot_text").css("marginTop","38px"),$(".foot_text").css("marginBottom","20px"))},film_list:function(){$("title").html("电影列表"),$(".film_paly ul li").click(function(){var e=$(this).index();$(".film_paly ul li").removeClass("play_li_active"),$(this).addClass("play_li_active"),$(".film_paly_content div").hide(),$(".film_paly_content div:eq("+e+")").fadeIn()})},search_cinema:function(){$("body").css("background","#fff"),$("title").html("电影搜索"),$("#header").css("background","#f8f8f8"),$(".search_content p").click(function(){$(this).parent().remove()}),$(".search_btn form div em").on("click",function(){$(".search_btn form div input").val("")})},cinemaMap:function(){function e(e){n.innerHTML="Latitude: "+e.coords.latitude+"<br />Longitude: "+e.coords.longitude,console.log("x："+e.coords.latitude+",y："+e.coords.longitude),c=e.coords.longitude,a=e.coords.latitude,$("#h5Point").text("手机原生h5定位，经度："+e.coords.longitude+", 纬度："+e.coords.latitude),t(c,a)}function i(e){switch(e.code){case e.PERMISSION_DENIED:n.innerHTML="定位失败,用户拒绝请求地理定位";break;case e.POSITION_UNAVAILABLE:n.innerHTML="定位失败,位置信息是不可用";break;case e.TIMEOUT:n.innerHTML="定位失败,请求获取用户位置超时";break;case e.UNKNOWN_ERROR:n.innerHTML="定位失败,定位系统失效"}}function t(e,i){var t=new BMap.Map("baiduMap"),c=new BMap.Point(e,i);t.centerAndZoom(c,15),(new BMap.Geolocation).getCurrentPosition(function(e){if(this.getStatus()==BMAP_STATUS_SUCCESS){var i=new BMap.Marker(e.point);t.addOverlay(i),t.panTo(e.point),s=e.point.lng,l=e.point.lat,o(s,l)}},{enableHighAccuracy:!0})}function o(e,i){var t=new BMap.Map("baiduMap"),o=new BMap.Point(e,i);t.centerAndZoom(o,15);var c=new BMap.Point(e,i),a=new BMap.Icon("../img/mapPointIcon.png",new BMap.Size(32,32)),n=new BMap.Marker(c,{icon:a});t.addOverlay(n)}var c,a,n=document.getElementById("h5Point");!function(){navigator.geolocation?navigator.geolocation.getCurrentPosition(e,i):n.innerHTML="Geolocation is not supported by this browser."}();var s,l,d=$(window).height(),r=$(".html_body #header").innerHeight(),h=$(".html_body #cinemaMap .cinemaInfo").innerHeight();baiduMapHeight=d-r-h,$(".html_body #cinemaMap #baiduMap").css("height",baiduMapHeight)},seat_selection:function(){function e(e){var i=0;return e.find("selected").each(function(){i+=t}),i}function i(e){e.forEach(function(e){$("#"+e).addClass("available_boy")})}$("title").html("电影选座");var t=35;$(document).ready(function(){var o=$("#seats_chose");o.children();$tickects_num=$("#tickects_num"),$total_price=$("#total_price"),$(".seatCharts-row div").html(" ");var c=["---------------","---------------","bccccccc_cc_ccc","bccccccc_cc_ccc","bccc__cc_cc_ccc","---------------","bcccccccccc_ccc","bccccccc_cc_ccc","bcccccccdcc_ccc","bccccccc_cc_ccc","bcccccccccc_ccc","bcccccccccc_ccc","bcccccccccc_ccc","bccccccc_cc_ccc","bccccccc_cc_ccc"],a=$("#seat_area").seatCharts({map:c,naming:{top:!1,getLabel:function(e,i,t){return t}},legend:{node:$("#legend"),items:[["c","available","可选座"],["c","unavailable","有人"]]},click:function(){return"available"==this.status()?o.find("li").length<4?($('<li class="del-seat"><span><img src="img/close_ico.png" alt=""/></span>'+(this.settings.row+1)+"排"+this.settings.label+"座</li>").attr("id","cart-item-"+this.settings.id).data("seatId",this.settings.id).appendTo(o),$tickects_num.text(a.find("selected").length+1),$total_price.text(e(a)+t),"selected"):(alert("亲爱的，你最多只能选4个座位"),"available"):"selected"==this.status()?($tickects_num.text(a.find("selected").length-1),$total_price.text(e(a)-t),$("#cart-item-"+this.settings.id).remove(),"available"):"unavailable"==this.status()?"unavailable":this.style()}});$("#seats_chose").on("click",".del-seat",function(){a.get($(this).data("seatId")).click()}),$(".body_content div.seatCharts-container").width(496);for(var n,s=document.querySelector(".seat_side ol"),l=1,d=0;d<=c.length-1;d++)n=document.createElement("li"),c[d].indexOf("c")>0?(n.innerText=l,l++):n.innerText="",s.appendChild(n);a.get(["1_9","1_6","4_4","4_5","4_6","4_7","5_8"]).status("unavailable"),i(["1_2","2_1","2_2"])})},payment_order:function(){$("title").html("支付确定订单"),$("#header").css("background","#f8f8f8"),$(".payment_content .timeOutText").downCount({date:"5/16/2017 17:30:50",offset:8},function(){$(".payment_content .timeOutText .days").text("00"),$(".payment_content .timeOutText .hours").text("00"),$(".payment_content .timeOutText .minutes").text("00"),$(".payment_content .timeOutText .seconds").text("00")})}};