var js_ = {
    index: function() {
        /*banner轮播图*/
        var mySwiper = new Swiper('#home .swiper-container', {
            autoplay: 5000, //可选选项，自动滑动
            loop: true, //循环
            pagination: '.swiper-pagination', //导航
        });
        /*banner轮播图结束*/

        /*热映电影列表*/
        var mySwiper2 = new Swiper('#home .swiper-container2', {
            freeMode: true, //自由拖动
            slidesPerView: 'auto', //宽度用自己的 width
        });
        /*热映电影列表结束*/

        //$('#myModal').modal('show');
        //显示弹窗
        //$('#myModal').modal('hide');
        //隐藏弹窗

        //当刚进入页面时，页面滚动条到顶部，防止刷新后，滚动条在中间
        $('html,body').stop(true, true).animate({
            scrollTop: (1)
        }, 0);

        var windowHeight = $(window).height();
        //console.log(windowHeight);
        var footerHeight = $('#footer').height();

        /*下拉加载数据*/
        var cinemaNum = [
            ['1', '2', '3'],
            ['1', '2', '3'],
            ['1', '2', '3']
        ];
        //加载的影院数组，举个例子
        var scrollOver = true;
        //判断是否还能加载影院
        var index = 0;
        //index=0 默认为 cinemaNum 的一维数组，根据上面例子为 每组有3个
        var timeOk = true;
        //上一组影院是否加载完成

        $(window).scroll(function() {
            console.log('1');
            var lastBoxBottom = parseFloat($('#home .moviePlace .box:last').offset().top) + parseFloat($('#home .moviePlace .box').height());
            //最后一个影院底部距离
            console.log(lastBoxBottom);
            var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            //页面滚动距离
            //console.log(scrollTop);

            if (lastBoxBottom < scrollTop + windowHeight && scrollOver && timeOk) {
                //如果 最后一个影院位置距离小于 页面滚动距离 + 屏幕设备高度 并且 可以继续加载 并且 上一组影院加载完成
                console.log('加载影院');
                timeOk = false;
                //影院还没有加载完成
                if (index < cinemaNum.length) {
                    //判断影院一维数组，如果影院还能继续加载，就显示 loading
                    $('#home .loadingIcon').show();
                }

                var t = setTimeout(function() {
                    //举个例子，就当之前 loading 了 2秒，这里是 loading 结束后

                    $('#home .loadingIcon').hide();
                    //loading消失

                    for (index; index < cinemaNum.length;) {
                        //循环影院一维数组
                        for (var j = 0; j < cinemaNum[index].length; j++) {
                            //循环影院二维数组
                            $('#home .moviePlace').append('<div class="box"><dl><dt>万达国际影城（南海万达广场）</dt><dd class="clear"><div class="d-b f-l">佛上市南海区桂澜北路28号南海万达广场</div><span class="d-b f-r ta-r">1.4km</span></dd></dl></div>');
                            //页面加载进下一组影院
                        }
                        index += 1;
                        //一维数组索引 +1

                        break;
                        //跳出 for 循环
                    }

                    timeOk = true;
                    //可以继续加载下一组影院了

                }, 2000);
                //console.log('index'+index);
                //影院一维数组，当前加载到第几组影院

                if (index == cinemaNum.length) {
                    //如果当前加载的影院一维数组数，等于一维数组最大值
                    scrollOver = false;
                    //所有影院加载完成，不能继续加载影院了
                    $('#home .noThing').show();
                    //提示用户已经到底部了
                }
                //console.log(scrollOver);
            }
        });

    },
    selectCity: function() {

        /*获取 原生H5手机定位坐标*/
        var showCoordinate = document.getElementById("demo");
        var h5_x, h5_y;

        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            } else {
                showCoordinate.innerHTML = "Geolocation is not supported by this browser.";
            }
        }

        function showPosition(position) {
            showCoordinate.innerHTML = "Latitude: " + position.coords.latitude +
                "<br />Longitude: " + position.coords.longitude;
            console.log('x：' + position.coords.latitude + ',y：' + position.coords.longitude);
            h5_x = position.coords.longitude;
            h5_y = position.coords.latitude;
            $('#demo').text('手机原生h5定位，经度：' + position.coords.longitude + ', 纬度：' + position.coords.latitude);

        }

        function showError(error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    showCoordinate.innerHTML = "定位失败,用户拒绝请求地理定位";
                    break;
                case error.POSITION_UNAVAILABLE:
                    showCoordinate.innerHTML = "定位失败,位置信息是不可用";
                    break;
                case error.TIMEOUT:
                    showCoordinate.innerHTML = "定位失败,请求获取用户位置超时";
                    break;
                case error.UNKNOWN_ERROR:
                    showCoordinate.innerHTML = "定位失败,定位系统失效";
                    break;
            }
        }
        getLocation();
        /*获取 原生H5手机定位坐标 结束*/

        /*百度地图API定位*/
        var baidu_x, baidu_y;

        var map = new BMap.Map("allmap");
        var point = new BMap.Point(h5_x, h5_y);
        //向百度地图 API 传入手机H5的经纬度
        map.centerAndZoom(point, 12);

        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                var mk = new BMap.Marker(r.point);
                map.addOverlay(mk);
                map.panTo(r.point);
                baidu_x = r.point.lng;
                baidu_y = r.point.lat;
                $('#baiduMap').text('百度地图 API 经度：' + r.point.lng + ', 纬度：' + r.point.lat);
                // 百度地图，精确经纬度定位
                /*
                  这里显示百度地图 API 的经纬度
                  由手机 H5 的经纬度，用百度地图 API 计算偏移量，得到精确的经纬度，
                  注意：如果上面的 原生H5手机定位 没有显示经纬度值，
                  那么百度地图的经纬度是不准的
                */
            } else {
                //alert('failed'+this.getStatus());
            }
        }, {
            enableHighAccuracy: true
        });

        //关于状态码
        //BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
        //BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
        //BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
        //BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
        //BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
        //BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
        //BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
        //BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
        //BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增)

        /*百度定位结束*/
    },
    movieDetails: function() {
        var textAll = $('.textAll').height();
        $('.bottomBox').click(function() {
            if ($('.story').hasClass('max_3h')) {
                $('.story').removeClass('max_3h').addClass('max_h');
                $('.bottomShadow').hide();
                $('.bottomBox .arrowsIcon').addClass('perversion');
            } else {
                $('.story').removeClass('max_h').addClass('max_3h');
                $('.bottomShadow').show();
                $('.bottomBox .arrowsIcon').removeClass('perversion');
            }
        });

        /*热映电影列表*/
        var mySwiper = new Swiper('#movieDetails .swiper-container', {
            freeMode: true, //自由拖动
            slidesPerView: 'auto', //宽度用自己的 width
        });
        /*热映电影列表结束*/

    },
    movieScreening: function() {

        //当刚进入页面时，页面滚动条到顶部，防止刷新后，滚动条在中间
        $('html,body').stop(true, true).animate({
            scrollTop: (1)
        }, 0);

        var listWrapTop = $('.html_body #movieScreening .listWrap').offset().top;
        //console.log(listWrapTop);
        var windowHeight = $(window).height();
        //console.log(windowHeight);
        var footerHeight = $('#footer').height();

        var listWrapHeight = Math.round(windowHeight - listWrapTop - footerHeight);
        //console.log(listWrapHeight);
        var cityNavHeight = $('.html_body #movieScreening .fixWrap .boxWrap .cityNav').height();
        //console.log(cityNavHeight);
        var listWrapHeight2 = Math.round(windowHeight - listWrapTop - cityNavHeight - footerHeight);
        //console.log(listWrapHeight2);

        /*下拉加载数据*/
        var cinemaNum = [
            ['1', '2', '3'],
            ['1', '2', '3'],
            ['1', '2', '3']
        ];
        //加载的影院数组，举个例子
        var scrollOver = true;
        //判断是否还能加载影院
        var index = 0;
        //index=0 默认为 cinemaNum 的一维数组，根据上面例子为 每组有3个
        var timeOk = true;
        //上一组影院是否加载完成

        $(window).scroll(function() {
            console.log('1');
            var lastBoxBottom = parseFloat($('#movieScreening .listWrap .filmList .box:last').offset().top) + parseFloat($('#movieScreening .listWrap .filmList .box').height());
            //最后一个影院底部距离
            console.log(lastBoxBottom);
            var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            //页面滚动距离
            //console.log(scrollTop);
            if (lastBoxBottom < scrollTop + windowHeight && scrollOver && timeOk) {
                //如果 最后一个影院位置距离小于 页面滚动距离 + 屏幕设备高度 并且 可以继续加载 并且 上一组影院加载完成
                console.log('加载影院');
                timeOk = false;
                //影院还没有加载完成
                if (index < cinemaNum.length) {
                    //判断影院一维数组，如果影院还能继续加载，就显示 loading
                    $('#movieScreening .loadingIcon').show();
                }

                var t = setTimeout(function() {
                    //举个例子，就当之前 loading 了 2秒，这里是 loading 结束后

                    $('#movieScreening .loadingIcon').hide();
                    //loading消失

                    for (index; index < cinemaNum.length;) {
                        //循环影院一维数组
                        for (var j = 0; j < cinemaNum[index].length; j++) {
                            //循环影院二维数组
                            $('#movieScreening .filmList').append('<div class="box"><dl><dt class="clear"><div class="leftBox d-b f-l">万达国际影城（南海万达广场）</div><div class="rightBox d-b f-r ta-r"><span>￥28</span> 起</div></dt><dd class="clear"><div class="leftBox d-b f-l">佛上市南海区桂澜北路28号南海万达广场</div><div class="rightBox d-b f-r ta-r">1.4km</div></dd></dl></div>');
                            //页面加载进下一组影院
                        }
                        index += 1;
                        //一维数组索引 +1

                        break;
                        //跳出 for 循环
                    }

                    timeOk = true;
                    //可以继续加载下一组影院了

                }, 2000);
                //console.log('index'+index);
                //影院一维数组，当前加载到第几组影院

                if (index == cinemaNum.length) {
                    //如果当前加载的影院一维数组数，等于一维数组最大值
                    scrollOver = false;
                    //所有影院加载完成，不能继续加载影院了
                    $('#movieScreening .noThing').show();
                    //提示用户已经到底部了
                }
                //console.log(scrollOver);
            }
        });
        /*下拉加载数据 结束*/

        $('.html_body #movieScreening .nav .navBox').click(function() {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $('.html_body #movieScreening .fixWrap .boxWrap').hide();
                $('.shadow').hide();
                $('body').css({
                    "overflow-y": "auto",
                    'height': 'auto'
                });
            } else {
                var this_index = $(this).index();
                $(this).addClass('active').siblings().removeClass('active');
                $('.html_body #movieScreening .fixWrap .boxWrap').eq(this_index).show().siblings().hide();
                $('.shadow').show();
                $('body').css({
                    "overflow-y": "hidden",
                    'height': '100%'
                });
            }
        });

        $('.html_body #movieScreening .fixWrap .boxWrap .cityNav .navBox').click(function() {
            var this_index2 = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            $('.html_body #movieScreening .fixWrap .boxWrap .cityListWrap .boxList').eq(this_index2).show().siblings().hide();
        });

        $('.html_body #movieScreening .fixWrap .listHeight1').css('height', listWrapHeight + 'px');
        $('.html_body #movieScreening .fixWrap .listHeight2').css('height', listWrapHeight2 + 'px');

        $('.html_body #movieScreening .fixWrap .boxWrap .boxList .box').click(function() {

            $(this).addClass('active').siblings().removeClass('active');

            $('.shadow').css('z-index', '11').show();
            $('.loadIcon').show();
            $('body').css({
                "overflow-y": "hidden",
                'height': '100%'
            });

            /*模拟数据*/
            var boxInfo = [];
            var boxInfoNum = 10;
            var boxText = '<div class="box"><dl><dt class="clear"><div class="leftBox d-b f-l">万达国际影城（南海万达广场）</div><div class="rightBox d-b f-r ta-r"><span>￥28</span> 起</div></dt><dd class="clear"><div class="leftBox d-b f-l">佛上市南海区桂澜北路28号南海万达广场</div><div class="rightBox d-b f-r ta-r">1.4km</div></dd></dl></div>';
            for (var i = 0; i < boxInfoNum; i++) {
                boxInfo.push(boxText);
            }
            $('.html_body #movieScreening .listWrap .filmList').html(boxInfo);
            /*模拟数据 结束*/

            /*模拟重新加载数据*/
            var time = setTimeout(function() {

                /*假如切换了筛选条件后，数据需要下拉刷新*/
                cinemaNum = [
                    ['1', '2', '3', '4'],
                    ['1', '2']
                ];
                //加载的影院数组，举个例子
                scrollOver = true;
                //判断是否还能加载影院
                index = 0;
                //index=0 默认为 cinemaNum 的一维数组，根据上面例子为 每组有3个
                timeOk = true;
                //上一组影院是否加载完成
                $('#movieScreening .noThing').hide();
                /*假如切换了筛选条件后，数据需要下拉刷新 结束*/

                $('.html_body #movieScreening .fixWrap .boxWrap').hide();
                $('.html_body #movieScreening .nav .navBox').removeClass('active');
                $('.shadow').css('z-index', '8').hide();
                $('.loadIcon').hide();
                $('html,body').stop(true, true).animate({
                    scrollTop: (0)
                }, 0);
                $(document.body).css({
                    "overflow-y": "auto",
                    'height': 'auto'
                });
            }, 2000);
            /*模拟重新加载数据结束*/

        });


    },
    cinemaBuyTicket: function() {

        var windowHeight = $(window).height();
        //console.log(windowHeight);
        var dateChoose = $('.movieBanner .blackBg').height();
        //console.log(dateChoose);
        var headerHeight = $('#header').innerHeight();
        //console.log(headerHeight);

        var scrollHeight;

        var fixBoxHeight = $('.fixBox').height();
        var listWrapHeight = Math.round(windowHeight - headerHeight - dateChoose - fixBoxHeight) / 2;
        //console.log(listWrapHeight);

        var cityNavHeight = $('.html_body #cinemaBuyTicket .fixWrap .boxWrap .cityNav').height();
        var listWrapHeight2 = Math.round(windowHeight - headerHeight - dateChoose - fixBoxHeight - cityNavHeight) / 2;
        //console.log(listWrapHeight2);

        $('.html_body #cinemaBuyTicket .fixWrap .listHeight1').css('height', listWrapHeight + 'px');
        $('.html_body #cinemaBuyTicket .fixWrap .listHeight2').css('height', listWrapHeight2 + 'px');

        $(window).scroll(function() {
            //当页面滚动时
            if ($(document).scrollTop() > dateChoose) {
                $('.fixBox').css({
                    'position': 'fixed',
                    'top': headerHeight
                });
                $('.html_body #cinemaBuyTicket .listWrap').css('top', fixBoxHeight);
            } else {
                $('.fixBox').css({
                    'position': 'relative',
                    'top': '0'
                });
                $('.html_body #cinemaBuyTicket .listWrap').css('top', '0');
            }
            if ($(document).scrollTop() < dateChoose) {
                scrollHeight = document.body.scrollTop;
            } else {
                scrollHeight = dateChoose;
            }
            //console.log(scrollHeight);

            listWrapHeight = Math.round(windowHeight - headerHeight - dateChoose - fixBoxHeight + scrollHeight) / 1.5;
            //console.log(listWrapHeight);
            $('.html_body #cinemaBuyTicket .fixWrap .listHeight1').css('height', listWrapHeight + 'px');

            listWrapHeight2 = Math.round(windowHeight - headerHeight - dateChoose - fixBoxHeight - cityNavHeight + scrollHeight) / 1.5;
            //console.log(listWrapHeight2);
            $('.html_body #cinemaBuyTicket .fixWrap .listHeight2').css('height', listWrapHeight2 + 'px');
        });

        $('.html_body #cinemaBuyTicket .nav .navBtn').click(function() {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
                $('.html_body #cinemaBuyTicket .fixWrap .boxWrap').hide();
                $('.shadow').hide();
                $('body').css({
                    "overflow-y": "auto",
                    'height': 'auto'
                });
            } else {
                var this_index = $(this).index();
                $(this).addClass('active').siblings().removeClass('active');
                $('.html_body #cinemaBuyTicket .fixWrap .boxWrap').eq(this_index).show().siblings().hide();
                $('.shadow').show();
                $('body').css({
                    "overflow-y": "hidden",
                    'height': '100%'
                });
            }

        });

        $('.html_body #cinemaBuyTicket .fixWrap .boxWrap .cityNav .navBox').click(function() {
            var this_index2 = $(this).index();
            $(this).addClass('active').siblings().removeClass('active');
            $('.html_body #cinemaBuyTicket .fixWrap .boxWrap .cityListWrap .boxList').eq(this_index2).show().siblings().hide();
        });

        $('.html_body #cinemaBuyTicket .fixWrap .boxWrap .boxList .box').click(function() {
            $('.html_body #cinemaBuyTicket .fixWrap .boxWrap .boxList .box').removeClass('active');
            $(this).addClass('active');
            update();
            $('body').css({
                "overflow-y": "auto",
                'height': 'auto'
            });
        });

        function update() {
            //更新影院数据
            $('.shadow').css('z-index', '11').show();
            $('.loadIcon').show();

            /*模拟数据*/
            var boxInfo = [];
            var boxInfoNum = 10;
            var boxText = '<div class="box"><dl><dt class="clear"><div class="leftBox d-b f-l">万达国际影城（南海万达广场）</div><div class="rightBox d-b f-r ta-r"><span>￥28</span> 起</div></dt><dd class="clear"><div class="leftBox d-b f-l">佛上市南海区桂澜北路28号南海万达广场</div><div class="rightBox d-b f-r ta-r">1.4km</div></dd></dl></div>';
            for (var i = 0; i < boxInfoNum; i++) {
                boxInfo.push(boxText);
            }
            $('.html_body #cinemaBuyTicket .listWrap .filmList').html(boxInfo);
            /*模拟数据 结束*/

            /*模拟重新加载数据*/
            var t = setTimeout(function() {

                $('.html_body #cinemaBuyTicket .fixWrap .boxWrap').hide();
                $('.html_body #cinemaBuyTicket .nav .navBtn').removeClass('active');
                $('.shadow').css('z-index', '8').hide();
                $('.loadIcon').hide();
                $('html,body').stop(true, true).animate({
                    scrollTop: (0)
                }, 0);

            }, 2000);
            /*模拟重新加载数据结束*/
        }

        /*日期选择*/
        var mySwiper = new Swiper('#cinemaBuyTicket .swiper-container', {
            freeMode: true, //自由拖动
            slidesPerView: 'auto', //宽度用自己的 width
            loop: true,
            slideToClickedSlide: true, //点击slide会过渡到这个slide。
            onTap: function(swiper) {
                //alert(swiper.activeIndex) //切换结束时，告诉我现在是第几个slide
                var this_slide = $('.html_body #cinemaBuyTicket .swiper-slide-active');
                //现在选中这个 日期
                this_slide.addClass('active').siblings().removeClass('active');
                console.log(this_slide.attr('data-swiper-slide-index'));
                //这个日期的标记
                update();

                $('.html_body #cinemaBuyTicket .fixWrap .boxWrap .boxList .box').removeClass('active');
                $('.html_body #cinemaBuyTicket .nav .navBox').eq(1).removeClass('active');
                $('.html_body #cinemaBuyTicket .nav .navBox').eq(0).addClass('active');
            }
        });
        /*日期选择 结束*/

    },
    buyTicketTime: function() {
        /*影片选择*/
        var mySwiper = new Swiper('#buyTicketTime .swiper-container', {
            slidesPerView: 'auto', //宽度用自己的 width
            loop: true,
            slideToClickedSlide: true, //点击slide会过渡到这个slide。
            initialSlide: 0, //初始化时显示的索引
            centeredSlides: true, //选中的居中
            autoHeight: true,
            onSlideChangeEnd: function(swiper) {
                var this_slide = $('.html_body #buyTicketTime .swiper-container .swiper-slide-active');
                //每当点击电影
                //console.log(this_slide.attr('data-movieId'));
                //得到这个电影的id

                var thisImg = this_slide.find('img').attr('src');
                //console.log(thisImg);
                $('.html_body #buyTicketTime .movieBg').css('background', 'url(' + thisImg + ')');
                updata();
            }
        });
        /*影片选择 结束*/


        /*日期选择*/
        var mySwiper2 = new Swiper('#buyTicketTime .swiper-container2', {
            freeMode: true, //自由拖动
            slidesPerView: 'auto', //宽度用自己的 width
            loop: true,
            slideToClickedSlide: true, //点击slide会过渡到这个slide。
            onTap: function(swiper) {
                //alert(swiper.activeIndex) //切换结束时，告诉我现在是第几个slide
                var this_slide2 = $('.html_body #buyTicketTime .swiper-container2 .swiper-slide-active');
                //现在选中这个 日期
                this_slide2.addClass('active').siblings().removeClass('active');
                console.log(this_slide2.attr('data-swiper-slide-index'));
                //这个日期的标记
                updata();
            }
        });
        /*日期选择 结束*/

        function updata() {
            $('.shadow,.loadIcon').show();

            /*模拟重新加载数据*/
            var t = setTimeout(function() {
                $('.shadow,.loadIcon').hide();
                $('html,body').stop(true, true).animate({
                    scrollTop: (0)
                }, 0);

                var movieBox = [];
                for (var i = 0; i < 3; i++) {
                  if(i==1){
                    movieBox.push('<div class="box d-b clear"><dl class="time d-b f-l"><dt>11:30</dt><dd>13:30</dd></dl><dl class="place d-b f-l ta-c"><dt>国语</dt><dd>3厅</dd></dl><div class="price d-b f-l ta-c">28 <span>元</span></div><div class="btnBuy d-b f-r ta-c none">已卖完</div></div>');
                  }else{
                    movieBox.push('<div class="box d-b clear"><dl class="time d-b f-l"><dt>11:30</dt><dd>13:30</dd></dl><dl class="place d-b f-l ta-c"><dt>国语</dt><dd>3厅</dd></dl><div class="price d-b f-l ta-c">28 <span>元</span></div><div class="btnBuy d-b f-r ta-c">选座购票</div></div>');
                  }

                }
                $('.html_body #buyTicketTime .sessionList').html(movieBox);
            }, 2000);
            /*模拟重新加载数据结束*/
        }
    },
    moviePhotos: function() {

        var windowHeight = $(window).height();
        //console.log(windowHeight);
        var headerHeight = $('.html_body #header').innerHeight();
        //console.log(headerHeight);
        var fixBoxHeight = windowHeight - headerHeight;

        $('.html_body #moviePhotos .fixBox').css('height', fixBoxHeight);

        function photoClick() {
            $('.html_body #moviePhotos .photoList .box').bind("click", function() {
                $('body').css({
                    'height': windowHeight,
                    'overflow-y': 'hidden'
                });
                //页面不能滚动
                var thisIndex = $(this).index();
                //点中图片的索引
                console.log(thisIndex);
                var thisImg = $(this).find('.img').attr('data-img');
                mySwiper.slideTo(thisIndex, 0, true); //切换到第一个slide，速度为1秒
                //切换到第几个 slide
                //mySwiper.update();
                //更新 mySwiper
                $('.html_body #moviePhotos .fixBox').css({
                    'z-index': '11',
                    'visibility': 'visible'
                });
            });
        }
        photoClick();
        /*剧照选择*/
        var mySwiper = new Swiper('#moviePhotos .swiper-container', {
            autoHeight: true,
            pagination: '.swiper-pagination',
            //显示分页器
            paginationType: 'fraction',
            //分页器，按 1/2 的显示方式
        });
        /*剧照选择结束*/

        $('.html_body #moviePhotos .fixBox .closeBtn').click(function() {
            $('.html_body #moviePhotos .fixBox').css({
                'z-index': '-1',
                'visibility': 'hidden'
            });
            $('body').css({
                'height': 'auto',
                'overflow-y': 'auto'
            });
            //页面可以滚动
        });

        var scrollOver = true;
        //是否还有需要加载的剧照
        var timeOk = true;
        //是否加载完成
        var photoArray = [
            ['1', '2', '3', '4'],
            ['5', '6', '7', '8'],
            ['9', '10', '11', '12']
        ];
        //需要加载的剧照二维数组
        var i = 0;
        $(window).scroll(function() {
            //当页面滚动时
            var lastBoxBottom = parseFloat($('#moviePhotos .list .box:last').offset().top) + parseFloat($('#moviePhotos .list .box').height());
            //位置最下面的 .box 距离顶部的距离
            var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            //页面滚动高度
            if (lastBoxBottom < scrollTop + windowHeight && scrollOver && timeOk) {
                //如果 最后一个图片位置距离小于 页面滚动距离 + 屏幕设备高度 并且 可以继续加载 并且 上一组图片加载完成
                timeOk = false;
                //剧照还没有加载完成

                if (i < photoArray.length) {
                    //判断剧照一维数组，如果剧照还能继续加载，就显示 loading
                    $('.html_body #moviePhotos .photoList .loadingIcon').show();
                    //loading显示
                }
                var t = setTimeout(function() {
                    //举个例子，就当之前 loading 了 2秒，这里是 loading 结束后
                    $('.html_body #moviePhotos .photoList .loadingIcon').hide();
                    //loading消失

                    for (i; i < photoArray.length;) {
                        //循环剧照一维数组
                        for (var j = 0; j < photoArray[i].length; j++) {
                            //循环剧照二维数组
                            $('.html_body #moviePhotos .list').append('<div class="box d-b f-l"><div class="wrap">.id<div class="img d-b" style="background-image:url(img/photoImg1.jpg)"></div></div></div>');
                            //页面加载进下一组影院
                            mySwiper.appendSlide('<div class="swiper-slide"><div class="box d-b p-a"><img class="img d-b" src="img/photoImg1.jpg"></div></div>');
                        }
                        i += 1;
                        //一维数组索引 +1

                        break;
                        //跳出 for 循环
                    }
                    mySwiper.update();
                    //更新 mySwiper

                    timeOk = true;
                    //可以继续加载下一组影院了

                    photoClick();
                    //重新绑定click事件

                }, 2000);

                if (i == photoArray.length) {
                    //如果当前加载的剧照一维数组数，等于一维数组最大值
                    scrollOver = false;
                    //所有剧照加载完成，不能继续加载剧照了

                    $('#moviePhotos .noPhoto').show();
                    //提示用户已经到底部了
                }

            }
        });

    },
    film_order: function() {
        $('title').html('电影订单');
        $('#header').css('background', '#f8f8f8');
        $('body').css('background', '#f6f6f6');
    },
    c_ticket_details: function() {
        $('title').html('电影票详情');
        if (window.location.href.indexOf("c_ticket_details.html") >= 0) {
            $('.foot_text').css('marginTop', '38px');
            $('.foot_text').css('marginBottom', '20px');
        }
    },
    film_list: function() {
        $('title').html('电影列表');

        var html_body = $('html,body');
        var loadingA = $('.shadow,.loadIcon');
        var noThing = $('.noThing');
        var loadingIcon = $('.loadingIcon');

        var windowHeight = $(window).height();
        //屏幕高度
        var timeOk = true;
        //为 true 时，上一组数据已经加载完成，可以继续加载下一组数据
        var dataNum = [];
        //list里的 box 数据都放在这里
        var scrollOver;
        //判断是否还需要加载数据
        var defaultNum;
        //默认加载几个数据，去拿 html里导航 li 标签上的 data-index 属性值
        var loadData;
        //每次加载几个数据，可以给每个列表不同的值
        var listBox;
        //当前显示的数据列表是哪个 list
        var tabName = 'now';
        //当前切换的 tab 名，默认为第一个导航
        var index = 0;
        //表示加载到第几个
        var loadEndNum;
        //每次加载后，list 的最后一组索引值

        var nowData = [
        //正在热映电影列表
          {'id':'1','num':'1'},
          {'id':'2','num':'2'},
          {'id':'3','num':'3'},
          {'id':'4','num':'4'},
          {'id':'5','num':'5'},
          {'id':'6','num':'6'},
          {'id':'7','num':'7'},
          {'id':'8','num':'8'},
          {'id':'9','num':'9'},
          {'id':'10','num':'10'},
          {'id':'11','num':'11'},
          {'id':'12','num':'12'},
          {'id':'13','num':'13'},
          {'id':'14','num':'14'},
          {'id':'15','num':'15'},
          {'id':'16','num':'16'},
          {'id':'17','num':'17'},
          {'id':'18','num':'18'},
          {'id':'19','num':'19'},
          {'id':'20','num':'20'}];

        var laterData = [
        //即将上映电影列表
          {'id':'21','num':'21'},
          {'id':'22','num':'22'},
          {'id':'23','num':'23'},
          {'id':'24','num':'24'},
          {'id':'25','num':'25'},
          {'id':'26','num':'26'},
          {'id':'27','num':'27'},
          {'id':'28','num':'28'},
          {'id':'29','num':'29'},
          {'id':'30','num':'30'},
          {'id':'31','num':'31'},
          {'id':'32','num':'32'},
          {'id':'33','num':'33'},
          {'id':'34','num':'34'},
          {'id':'35','num':'35'},
          {'id':'36','num':'36'},
          {'id':'37','num':'37'},
          {'id':'38','num':'38'},
          {'id':'39','num':'39'},
          {'id':'40','num':'40'}];

        //先给 nowData 和 laterData 数据值，后运行 getData('now')  
        getData('now');
        //默认页面获取数据列表 now 的值，相当于获得不同的 ajax 数据列表

        function getData(dataClass) {
        //获取 或 切换 需要加载的数据
          switch (dataClass) {
              case 'now':
              //获得数据列表 now 的数据，相当于获得 ajax 数据列表
                dataNum = nowData;
                //console.log(dataNum[0].id);
                //获取 dataNum 数据列表里第一个值的 id

                //console.log(dataNum.length);
                //dataNum 数据有几组

                loadData = 5;
                //每次加载几组数据

                break;

              case 'later':
              //获得数据列表 later 的数据，相当于获得 ajax 数据列表
                dataNum = laterData;
                //console.log(dataNum[0].id);
                //获取 dataNum 数据列表里第一个值的 id

                //console.log(dataNum.length);
                //dataNum 数据有几组

                loadData = 3;
                //每次加载几组数据

                break;
          }
          defaultNum = $('#filmNav li[data-name='+dataClass+']').attr('data-index');
          //默认显示数据数
          //console.log(defaultNum);
          index = $('#filmNav li[data-name='+dataClass+']').attr('data-index');
          //开始算加载的数据

          if (dataNum.length > defaultNum) {
              //如果数据列表的组数，大于默认加载的数量，那么可以继续加载数据
              scrollOver = true;
              //可以继续加载数据
          } else {
              scrollOver = false;
              //不可以继续加载数据
              defaultNum = dataNum.length;
              //默认加载数量，等于 ajax 传来的数量
              $('#filmNav li[data-name='+dataClass+']').attr('data-index',dataNum.length);
          }
          listBox = $('.divWrap[data-listName=' + dataClass + ']');
          //获得和 tab 相应的 list
          listBox.show().siblings().hide();
          //只有相应的 list 显示
          getDefault();
          //在 list 写入默认数据组（不包含需要加载的数据组）
          //console.log('scrollOver:'+scrollOver);
          tabData();
        }

        function loadingAnimate() {
          html_body.stop(true, true).animate({
              scrollTop: (0)
          }, 10);
          //页面返回到顶部
          loadingA.show();
          //显示加载动画

          $('body').css({
              'height': windowHeight,
              'overflow': 'hidden'
          });
          //body 设置无法滚动

          var t = setTimeout(function() {
            loadingA.hide();
            //加载动画消失
            $('body').css({
                'height': 'auto',
                'overflow': 'auto'
            });
            //body 设置可以滚动
          }, 2000);
        }
        function tabData() {
          //点击上面的 tab 切换数据列表
          $('#filmNav li').bind('click', function() {
            var filmNavIndex = $(this).index();
            //获取点击的 tab

            if(timeOk===true){
            //只有在不记载数据的情况下可以点，不然数据会串行

              $('#filmNav li').removeClass('play_li_active');
              $('#filmNav li').eq(filmNavIndex).addClass('play_li_active');
              //导航加选中样式

              timeOk = false;
              loadingAnimate();
              //正在加载中动画启动

              $('.loadingIcon,.noThing').hide();

              tabName = $(this).attr('data-name');
              //获取当前选中的导航 tab 名
              //console.log(tabName);

              var t = setTimeout(function() {
              //2秒加载时间
                  getData(tabName);
                  //获得切换到的 数据列表，相当于切换 ajax 数据
                  timeOk = true;
                  //可以再次进行加载了
              }, 2000);
            }
          });
        }

        function getDefault() {
        //获取默认数据

            html_body.stop(true, true).animate({
                scrollTop: (0)
            }, 10);

            listBox.html('');
            //清空列表

            switch (tabName) {
            //对不同 list 添加不同写法的 数据 写法
                case 'now':
                  for (var i = 0; i < defaultNum; i++) {
                  //写入默认数量的 box
                      listBox.append('<ol><li><a href="javascript:;"class="clearfix"><span class="f-l"><img src="img/film_list01.png"alt=""></span><em class="f-l"><h2 class="clear"><span class="movieName">驯龙高手'+dataNum[i].id+'</span><i>3D</i></h2><strong><div class="starBox"><div class="starImg starImg1" style="width:50%;"></div><div class="starImg starImg2"></div></div><div class="gradeNum">5.0</div></strong><p class="paly_content_p">导演：迪恩·德布洛斯</p><p>主演：杰伊·巴鲁切尔，艾米莉卡·费雷拉</p></em></a></li></ol>');
                  }
                  break;
                case 'later':
                  for (var j = 0; j < defaultNum; j++) {
                      listBox.append('<ol><li><a href="javascript:;"class="clearfix"><span class="f-l"><img src="img/film_list02.png"alt=""></span><em class="f-l"><h2 class="clear"><span class="movieName">金刚狼3:殊死一战'+dataNum[j].id+'</span><i>IMAX 3D</i></h2><strong><div class="starBox"><div class="starImg starImg1" style="width:60%;"></div><div class="starImg starImg2"></div></div><div class="gradeNum">6.0</div></strong><p class="paly_content_p">导演：迪恩·德布洛斯</p><p>主演：杰伊·巴鲁切尔，艾米莉卡·费雷拉</p></em></a></li></ol>');
                  }
                  break;
            }
            slideLoad();
        }
        function slideLoad() {
        //滚动加载
          $(window).scroll(function() {
            var lastBoxBottom = parseFloat(listBox.children("ol:last-child").offset().top) + parseFloat(listBox.children('ol').height());
            //最后一个影院底部距离
            //console.log(lastBoxBottom);

            var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            //页面滚动距离
            //console.log('scrollOver'+scrollOver);

            var thisTabIndex = Number($('#filmNav li[data-name='+tabName+']').attr('data-index'));
            //获得当前数据加载到索引几

            if(thisTabIndex>=dataNum.length){
            //如果当前加载的索引值大于数据个数
              noThing.show();
              //提示用户已经到底部了
              scrollOver=false;
            } else {
              noThing.hide();
              scrollOver=true;
            }

            if (lastBoxBottom < scrollTop + windowHeight && scrollOver && timeOk) {
            //如果 最后一个影院位置距离小于 页面滚动距离 + 屏幕设备高度 并且 可以继续加载 并且 上一组影院加载完成
              //console.log('加载数据');
              timeOk = false;
              //数据还没有加载完成

              if (index < dataNum.length) {
                //判断影院一维数组，如果影院还能继续加载，就显示 loading
                loadingIcon.show();
              }

              loadEndNum = thisTabIndex + loadData;
              //获得这次加载后，得到的加载到索引值多少
              //console.log(loadData);
              if (loadEndNum > dataNum.length) {
              //如果加载的索引值大于ajax数据个数
                //console.log(loadEndNum);
                loadEndNum = dataNum.length;
              }
              //console.log('loadEndNum,'+loadEndNum);

              var t = setTimeout(function() {
              //举个例子，就当之前 loading 了 2秒，这里是 loading 结束后
                loadingIcon.hide();
                //loading消失

                for (index; index < loadEndNum; index++) {
                    switch (tabName) {
                        case 'now':

                          listBox.append('<ol><li><a href="javascript:;"class="clearfix"><span class="f-l"><img src="img/film_list01.png"alt=""></span><em class="f-l"><h2 class="clear"><span class="movieName">驯龙高手'+dataNum[index].id+'</span><i>3D</i></h2><strong><div class="starBox"><div class="starImg starImg1" style="width:50%;"></div><div class="starImg starImg2"></div></div><div class="gradeNum">5.0</div></strong><p class="paly_content_p">导演：迪恩·德布洛斯</p><p>主演：杰伊·巴鲁切尔，艾米莉卡·费雷拉</p></em></a></li></ol>');
                          break;

                        case 'later':

                          listBox.append('<ol><li><a href="javascript:;"class="clearfix"><span class="f-l"><img src="img/film_list02.png"alt=""></span><em class="f-l"><h2 class="clear"><span class="movieName">金刚狼3:殊死一战'+dataNum[index].id+'</span><i>IMAX 3D</i></h2><strong><div class="starBox"><div class="starImg starImg1" style="width:60%;"></div><div class="starImg starImg2"></div></div><div class="gradeNum">6.0</div></strong><p class="paly_content_p">导演：迪恩·德布洛斯</p><p>主演：杰伊·巴鲁切尔，艾米莉卡·费雷拉</p></em></a></li></ol>');
                          break;

                    }
                }
                timeOk = true;
                //可以继续加载下一组影院了
                $('#filmNav li[data-name='+tabName+']').attr('data-index',loadEndNum);
                //加载完数据后，给列表写入 已加载到什么索引位置
                //console.log('a,'+loadEndNum);
              }, 2000);
              //console.log('index'+index);
              if (index == dataNum.length) {
                //如果当前加载的影院一维数组数，等于一维数组最大值
                scrollOver = false;
                //所有影院加载完成，不能继续加载影院了
                noThing.show();
                //提示用户已经到底部了
              }
              //console.log('scrollOver'+scrollOver);
            }
          });
        }
    },
    search_cinema: function() {
        $('body').css('background', '#fff');
        $('title').html('电影搜索');
        $('#header').css('background', '#f8f8f8');
        $('.search_content p').click(function() {
            $(this).parent().remove();
        });
        $('.search_btn form div em').on('click', function() {
            $('.search_btn form div input').val('');
        });
    },
    cinemaMap: function() {
        var showCoordinate = document.getElementById("h5Point");
        var h5_x, h5_y;

        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            } else {
                showCoordinate.innerHTML = "Geolocation is not supported by this browser.";
            }
        }

        function showPosition(position) {
            showCoordinate.innerHTML = "Latitude: " + position.coords.latitude +
                "<br />Longitude: " + position.coords.longitude;
            console.log('x：' + position.coords.latitude + ',y：' + position.coords.longitude);
            h5_x = position.coords.longitude;
            h5_y = position.coords.latitude;
            $('#h5Point').text('手机原生h5定位，经度：' + position.coords.longitude + ', 纬度：' + position.coords.latitude);
            baiduPoint(h5_x, h5_y);
        }

        function showError(error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    showCoordinate.innerHTML = "定位失败,用户拒绝请求地理定位";
                    break;
                case error.POSITION_UNAVAILABLE:
                    showCoordinate.innerHTML = "定位失败,位置信息是不可用";
                    break;
                case error.TIMEOUT:
                    showCoordinate.innerHTML = "定位失败,请求获取用户位置超时";
                    break;
                case error.UNKNOWN_ERROR:
                    showCoordinate.innerHTML = "定位失败,定位系统失效";
                    break;
            }
        }
        getLocation();
        /*获取 原生H5手机定位坐标 结束*/

        //baiduPoint(cinema_x,cinema_y);
        //在这里传入影院的经纬度

        var baidu_x, baidu_y;

        function baiduPoint(h5_x, h5_y) {
            var map = new BMap.Map("baiduMap");
            var point = new BMap.Point(h5_x, h5_y);
            //向百度地图 API 传入手机H5的经纬度
            map.centerAndZoom(point, 15);

            var geolocation = new BMap.Geolocation();
            geolocation.getCurrentPosition(function(r) {
                if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                    var mk = new BMap.Marker(r.point);
                    map.addOverlay(mk);
                    map.panTo(r.point);
                    baidu_x = r.point.lng;
                    baidu_y = r.point.lat;
                    baiduMap(baidu_x, baidu_y);
                    //$('#baiduMap').text('百度地图 API 经度：'+r.point.lng+', 纬度：'+r.point.lat);
                    // 百度地图，精确经纬度定位
                    /*
                      这里显示百度地图 API 的经纬度
                      由手机 H5 的经纬度，用百度地图 API 计算偏移量，得到精确的经纬度，
                      注意：如果上面的 原生H5手机定位 没有显示经纬度值，
                      那么百度地图的经纬度是不准的
                    */
                } else {
                    //alert('failed'+this.getStatus());
                }
            }, {
                enableHighAccuracy: true
            });
        }

        function baiduMap(baidu_x, baidu_y) {

            var map = new BMap.Map("baiduMap");
            var point = new BMap.Point(baidu_x, baidu_y);
            map.centerAndZoom(point, 15);

            var pt = new BMap.Point(baidu_x, baidu_y);
            var myIcon = new BMap.Icon("../img/mapPointIcon.png", new BMap.Size(32, 32));
            var marker2 = new BMap.Marker(pt, {
                icon: myIcon
            }); // 创建标注
            map.addOverlay(marker2); // 将标注添加到地图中
        }
        /*设置百度地图 高度*/
        var windowHeight = $(window).height();
        //console.log(windowHeight);
        var headerHeight = $('.html_body #header').innerHeight();
        //console.log(headerHeight);
        var cinemaInfoHeight = $('.html_body #cinemaMap .cinemaInfo').innerHeight();
        baiduMapHeight = windowHeight - headerHeight - cinemaInfoHeight;
        $('.html_body #cinemaMap #baiduMap').css('height', baiduMapHeight);
        /*设置百度地图 高度 结束*/
    },
    seat_selection:function(){
    $('title').html('电影选座');
    var price = 35; //电影票价

    $(document).ready(function() {

        var $cart = $('#seats_chose'), //座位区
            $cart_li = $cart.children();

            $tickects_num = $('#tickects_num'); //票数

            $total_price = $('#total_price'); //票价总额
        $('.seatCharts-row div').html(' ');
        var cinimaMap = [
          '---------------',

          '---------------',

          'bccccccc_cc_ccc',

          'bccccccc_cc_ccc',

          'bccc__cc_cc_ccc',

          '---------------',

          'bcccccccccc_ccc',

          'bccccccc_cc_ccc',

          'bcccccccdcc_ccc',

          'bccccccc_cc_ccc',

          'bcccccccccc_ccc',

          'bcccccccccc_ccc',

          'bcccccccccc_ccc',

          'bccccccc_cc_ccc',

          'bccccccc_cc_ccc'
        ];
        var sc = $('#seat_area').seatCharts({
            map: cinimaMap,

            naming: {//设置行列等信息

                top: false, //不显示顶部横坐标（行）

                getLabel: function(character, row, column) { //返回座位信息

                    return column;

                }

            },

            legend: {//定义图例

                node: $('#legend'),

                items: [

                    ['c', 'available', '可选座'],

                    ['c', 'unavailable', '有人']

                ]
            },
            click: function() {
                if (this.status() == 'available') { //若为可选座状态，添加座位
                    if($cart.find('li').length < 4){
                       $('<li class="del-seat">'+ '<span><img src="img/close_ico.png" alt=""/></span>' + (this.settings.row + 1) + '排' + this.settings.label + '座</li>')
                            .attr('id', 'cart-item-' + this.settings.id)
                            .data('seatId', this.settings.id)
                            .appendTo($cart);
                            $tickects_num.text(sc.find('selected').length + 1);  //统计选票数量
                            $total_price.text(getTotalPrice(sc) + price);  //计算票价总金额
                            return 'selected';

                    }else{
                       alert('亲爱的，你最多只能选4个座位');
                       return 'available';
                    }
                    // $tickects_num.text(sc.find('selected').length + 1); //统计选票数量
                    // $total_price.text(getTotalPrice(sc) + price);//计算票价总金额
                    return 'selected';
                } else if (this.status() == 'selected') { //若为选中状态
                    $tickects_num.text(sc.find('selected').length - 1);//更新票数量
                    $total_price.text(getTotalPrice(sc) - price);//更新票价总金额
                    $('#cart-item-' + this.settings.id).remove();//删除已预订座位
                    return 'available';
                } else if (this.status() == 'unavailable') { //若为已售出状态
                    return 'unavailable';
                } else {
                    return this.style();
                }
            }
        });
        //点击已选按钮X，删除
        $('#seats_chose').on('click', '.del-seat', function () {
          sc.get($(this).data('seatId')).click();
        });

        // $('#seats_chose li').click(function(){
        //   sc.get($(this).parent().parent().data('seatId')).click();
        // })



        //横向一排的座位宽度等于座位个数*座位宽度
        // var oSeat_num = $('#seat_area .seatCharts-row:eq(0) div');
        $('.body_content div.seatCharts-container').width(16*31);

        //动态生成左侧数字序号
        var oSeat_side = document.querySelector('.seat_side ol');
        var li;
        var cinimaIndex = 1;
        for(var i=0;i<=cinimaMap.length-1;i++){
          li = document.createElement('li');
          if(cinimaMap[i].indexOf('c')>0){
          //判断此排是否有座位
            li.innerText = cinimaIndex;
            cinimaIndex++;
          }else{
          //如果此排全是走廊
            li.innerText = '';
          }
          oSeat_side.appendChild(li);
        }

        //设置已卖出的座位
        sc.get(['1_9', '1_6', '4_4', '4_5', '4_6', '4_7', '5_8']).status('unavailable');

        // 设置情侣座
        setStyleQinglv(['1_2', '2_1', '2_2']);
    });
    function getTotalPrice(sc) { //计算票价总额
        var total = 0;
        sc.find('selected').each(function() {
            total += price;
        });
        return total;
    }
    function setStyleQinglv(arr) { //计算票价总额
        arr.forEach(function(id){
          $("#" + id).addClass('available_boy');
        });
    }

  },
    payment_order: function() {
        $('title').html('支付确定订单');
        $('#header').css('background', '#f8f8f8');
        $('.payment_content .timeOutText').downCount({
            //倒计时
            date: '5/16/2017 17:30:50',
            offset: +8
            //别删
        }, function() {
            //倒计时结束后
            $('.payment_content .timeOutText .days').text('00');
            $('.payment_content .timeOutText .hours').text('00');
            $('.payment_content .timeOutText .minutes').text('00');
            $('.payment_content .timeOutText .seconds').text('00');
            //alert('倒计时结束!');
        });
    },
};
