/**
 * Created by Administrator on 2017/6/12.
 */
/*入口*/
window.onload = function() {
    for(var j = 0;j < arr_elevator.length ; j++) {
        arr_elevatorY.push($(arr_elevator[j]).offsetTop);
    }
    //固定搜索栏
    fnHoverSearchBar.init();
    //头部广告
   fntopAdv.init();
    //定位的初始化
    fnlocation.init();
    //我的京东
    fnNavMyJd.init();
    //客服服务
    fnCustomerService.init();
    //网站导航
    fnSiteNavigation.init();
    //搜索栏
    fnsearch.init();
    //商品分类
    fnGoodsCate.init();
    //轮播图
    fnbanner.init();
    //轮播图行右边的服务分类
    fnSaleServer.init();
    //倒计时 设置时间为500000
    fnCountDownTime.init(500000);
    //toolbars栏
    fnToolbars.init();
    //电梯
    fnElevator.init();
    //这个事件全局只能有一个
    window.onscroll = windowScroll;
};
var windowScrollTimer = null;//窗口滑动监听的延时定时器，窗口滑动监听事件全局只能有一个，所以定时器也必须唯一
/*窗口的滑动事件*/
function windowScroll() {
    clearTimeout(windowScrollTimer);
    windowScrollTimer = setTimeout(function()
    {
        var top = My.scroll().top;
        //固定搜索栏
        if (fnHoverSearchBar.height <= top) {
            fnHoverSearchBar.hover_search_bar.style.display = "block";
        } else {
            fnHoverSearchBar.hover_search_bar.style.display = "none";
        }
        //电梯
        if (top < arr_elevatorY[0]) {
            fnElevator.elevator.style.display = "none";
        } else {
            fnElevator.elevator.style.display = "block";
            for (var j = 0; j < arr_elevatorY.length; j++) {
                if (top >= arr_elevatorY[j]) {
                    fnElevator.current = j;
                    for (var k = 0; k < fnElevator.lis.length; k++) {
                        fnElevator.lis[k].style.backgroundColor = "#918888";
                    }
                    fnElevator.lis[fnElevator.current].style.backgroundColor = "#C81623";
                }
            }
        }
    },500);
}
/*固定搜索栏*/
var fnHoverSearchBar = {
    "hover_search_bar":null,
    "inputTxt":null,
    "height":null,
    "init":function() {
        this.hover_search_bar = $("hover_search_bar");
        this.inputTxt = $("hover_search").children[0];
        this.height = $("jd_content").offsetTop;
        this.inputTxt.onfocus = this.focus;
        this.inputTxt.onblur = this.blur;
    },
    "focus":function()
    {
        if(fnHoverSearchBar.inputTxt.value == "U盘32g") {
            fnHoverSearchBar.inputTxt.value = "";
        }
        fnHoverSearchBar.inputTxt.style.color = "#000";
    },
    "blur":function()
    {
        if(fnHoverSearchBar.inputTxt.value == "") {
            fnHoverSearchBar.inputTxt.value ="U盘32g";
            fnHoverSearchBar.inputTxt.style.color = "#999";
        }
    }
};
/*顶部广告的部分*/
var fntopAdv = {
    "init":function()
    {
        $("close").onclick = this.closeAdv;
    },
    //关闭广告
    "closeAdv":function()
    {
        $("top_adv").style.display = "none";
    }
};
/* 城市定位 */
var fnlocation = {
    "init":function(){
        var ul = $("location_item").children[0];
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = "#";
        a.innerHTML = arr_city[0];
        li.appendChild(a);
        li.index = 0;
        li.onclick = this.onclick;
        ul.appendChild(li);
        for(var i= 0 ;i < arr_city.length-1 ; i++)
        {
            var newli = li.cloneNode(true);
            var a = newli.children[0];
            a.innerHTML = arr_city[i+1];
            newli.index = i+1;
            newli.onclick = this.onclick;
            ul.appendChild(newli);
        }
        var curli = ul.children[0];
        curli.className = "current-li";
        var curi = curli.children[0];
        curi.className = "current-i";
        $("location").onmouseover = this.onmouseover;
        $("location").onmouseout = this.onmouseout;
        $("location_item").onmouseover = this.onmouseover;
        $("location_item").onmouseout = this.onmouseout;
    },
    //鼠标悬浮
    "onmouseover":function() {
        $("location_item").style.display = "block";
        $("location").style.backgroundColor = "#fff";
        $("location").style.borderLeft = "1px solid #ccc";
        $("location").style.borderRight = "1px solid #ccc";
    },
    //鼠标离开
    "onmouseout":function() {
        $("location_item").style.display = "none";
        $("location").style.backgroundColor = "";
        $("location").style.border = "0";
    },
    //点击事件
    "onclick":function() {
        var ul = $("location_item").children[0];
        var lis = ul.children;
        for(var i = 0; i < lis.length; i++)
        {
            var curli = lis[i];
            curli.className = "";
            var curi = curli.children[0];
            curi.className = "";
        }
        var curli = lis[this.index];
        curli.className = "current-li";
        var curi = curli.children[0];
        curi.className = "current-i";
        $("city").innerHTML = curi.innerHTML;
        $("location_item").style.display = "none";
    }
};
/*我的京东*/
var fnNavMyJd = {
    "my_jd":null,
    "my_jd_down":null,
    "init":function() {
        this.my_jd = $("my_jd");
        this.my_jd_down = this.my_jd.children[2];
        this.my_jd.onmouseover = this.onmouseover;
        this.my_jd.onmouseout = this.onmouseout;
    },
    //鼠标悬浮
    "onmouseover":function() {
        fnNavMyJd.my_jd_down.style.display = "block";
        fnNavMyJd.my_jd.style.backgroundColor = "#fff";
        fnNavMyJd.my_jd.style.borderLeft = "1px solid #ccc";
        fnNavMyJd.my_jd.style.borderRight = "1px solid #ccc";
    },
    //鼠标离开
    "onmouseout":function() {
        fnNavMyJd.my_jd_down.style.display = "none";
        fnNavMyJd.my_jd.style.backgroundColor = "";
        fnNavMyJd.my_jd.style.borderLeft = "1px solid rgba(255,255,255,0)";
        fnNavMyJd.my_jd.style.borderRight = "1px solid rgba(255,255,255,0)";
    }
};
/*客户服务*/
var fnCustomerService = {
    "customer_service":null,
    "customer_service_down":null,
    "init":function() {
        this.customer_service = $("customer_service");
        this.customer_service_down = this.customer_service.children[1];
        this.customer_service.onmouseover = this.onmouseover;
        this.customer_service.onmouseout = this.onmouseout;
    },
    //鼠标悬浮
    "onmouseover":function() {
        fnCustomerService.customer_service_down.style.display = "block";
        fnCustomerService.customer_service.style.backgroundColor = "#fff";
        fnCustomerService.customer_service.style.borderLeft = "1px solid #ccc";
        fnCustomerService.customer_service.style.borderRight = "1px solid #ccc";
    },
    //鼠标离开
    "onmouseout":function() {
        fnCustomerService.customer_service_down.style.display = "none";
        fnCustomerService.customer_service.style.backgroundColor = "";
        fnCustomerService.customer_service.style.borderLeft = "1px solid rgba(255,255,255,0)";
        fnCustomerService.customer_service.style.borderRight = "1px solid rgba(255,255,255,0)";
    }
};
/*网站导航*/
var fnSiteNavigation = {
    "site_navigation":null,
    "site_navigation_down":null,
    "init":function() {
        this.site_navigation = $("site_navigation");
        this.site_navigation_down = this.site_navigation.children[1];
        this.site_navigation.onmouseover = this.onmouseover;
        this.site_navigation.onmouseout = this.onmouseout;
    },
    //鼠标悬浮
    "onmouseover":function() {
        fnSiteNavigation.site_navigation_down.style.display = "block";
        fnSiteNavigation.site_navigation.style.backgroundColor = "#fff";
        fnSiteNavigation.site_navigation.style.borderLeft = "1px solid #ccc";
        fnSiteNavigation.site_navigation.style.borderRight = "1px solid #ccc";
    },
    //鼠标离开
    "onmouseout":function() {
        fnSiteNavigation.site_navigation_down.style.display = "none";
        fnSiteNavigation.site_navigation.style.backgroundColor = "";
        fnSiteNavigation.site_navigation.style.borderLeft = "1px solid rgba(255,255,255,0)";
        fnSiteNavigation.site_navigation.style.borderRight = "1px solid rgba(255,255,255,0)";
    }
};
/*搜索栏*/
var fnsearch = {
    "inputTxt":null,
    "init":function(){
        var search = $("search");
        this.inputTxt = search.children[0];
        this.inputTxt.onfocus = this.focus;
        this.inputTxt.onblur = this.blur;
    },
    "focus":function()
    {
        if(fnsearch.inputTxt.value == "U盘32g") {
            fnsearch.inputTxt.value = "";
        }
        fnsearch.inputTxt.style.color = "#000";
    },
    "blur":function()
    {
        if(fnsearch.inputTxt.value == "") {
            fnsearch.inputTxt.value ="U盘32g";
            fnsearch.inputTxt.style.color = "#999";
        }
    }
}
/*商品分类*/
var fnGoodsCate = {
    "lis":null,
    "init":function()
    {
        var goods_cate = $("goods_cate");
        this.lis = goods_cate.children[0].children;
        for(var i = 0 ; i< this.lis.length;i++)
        {
            this.lis[i].onmouseover = this.onmouseover;
        }
        goods_cate.onmouseout = this.onmouseout;
    },
    "onmouseover":function()
    {
        for(var i = 0 ; i< fnGoodsCate.lis.length;i++)
        {
            fnGoodsCate.lis[i].style.backgroundColor = "#6E6568";
        }
        this.style.backgroundColor = "#999";
    },
    "onmouseout": function ()
    {
        for(var i = 0 ; i< fnGoodsCate.lis.length;i++)
        {
            fnGoodsCate.lis[i].style.backgroundColor = "#6E6568";
        }
    }
};
/* 轮播图 */
var fnbanner = {
    "index":0,
    "arrow_left":null,
    "arrow_right":null,
    "banner":null,
    "lis":null,
    "indicator":null,
    "timer":null,
    "init":function() {
        //控件的查找
        this.arrow_left = $("arrow_left");
        this.arrow_right = $("arrow_right");
        this.banner = $("banner");
        this.lis = banner.children[0].children;
        //初始化指示器
        this.indicator = this.initIndicator(banner.children[1]);
        //指示器的第一个选中
        this.indicator[0].setAttribute("class","current");
        //选中第一张图片
        this.lis[0].style.left = "0px";
        //设置各种监听器
        for (var i = 0; i < this.indicator.length; i++) {
            // 索引的监听器
           this.indicator[i].onmouseover = function()
           {
                if (fnbanner.index > this.index) {
                    My.animate(fnbanner.lis[fnbanner.index],{"left":790},10);
                    fnbanner.lis[this.index].style.left = "-790px";
                    My.animate(fnbanner.lis[this.index],{"left":0},10);
                    fnbanner.index = this.index;
                    fnbanner.indicatorCurrent(fnbanner.index);//选中指定的指示器
                }else if (fnbanner.index < this.index){
                    My.animate(fnbanner.lis[fnbanner.index],{"left":-790},10);
                    fnbanner.lis[this.index].style.left = "790px";
                    My.animate(fnbanner.lis[this.index],{"left":0},10);
                    fnbanner.index = this.index;
                    fnbanner.indicatorCurrent(fnbanner.index);//选中指定的指示器
                }
           }
        };
        this.banner.onmouseover = this.onmouseover;
        this.banner.onmouseout = this.onmouseout;
        this.arrow_right.onclick = this.onclick;
        this.arrow_left.onclick = this.onclick;
        //设置定时器
        fnbanner.timer = setInterval(fnbanner.to_right,3000);
    },
    "onmouseover":function() {
        fnbanner.arrow_left.style.display = "block"
        fnbanner.arrow_right.style.display = "block"
        clearInterval(fnbanner.timer);
    },
    "onmouseout":function() {
        fnbanner.arrow_left.style.display = "none"
        fnbanner.arrow_right.style.display = "none"
        fnbanner.timer = setInterval(fnbanner.to_right,3000);
    },
    "onclick":function(event) {
       switch(this.id)
       {
           case "arrow_left":
               fnbanner.to_left();//点击了轮播图的左边按钮
               break;
           case "arrow_right"://点击了轮播图的右边按钮
               fnbanner.to_right();
            break;
       }
    },
    //向左移动的动画
    "to_left":function() {
        My.animate(fnbanner.lis[fnbanner.index],{"left":790},10);
        fnbanner.index--;
        if(fnbanner.index < 0)
        {
            fnbanner.index = fnbanner.lis.length-1;
        }
        fnbanner.lis[fnbanner.index].style.left = "-790px";
        My.animate(fnbanner.lis[fnbanner.index],{"left":0},10);
        fnbanner.indicatorCurrent(fnbanner.index);//选中指定的指示器
    },
    //向右移动的动画
    "to_right":function() {
        My.animate(fnbanner.lis[fnbanner.index],{"left":-790},10);
        fnbanner.index++;
        if( fnbanner.index >= fnbanner.lis.length)
        {
            fnbanner.index = 0;
        }
        fnbanner.lis[fnbanner.index].style.left = "790px";
        My.animate(fnbanner.lis[fnbanner.index],{"left":0},10);
        fnbanner.indicatorCurrent(fnbanner.index);//选中指定的指示器
    },
    /*
        作用：初始化指示器
        parentEl:创建指示器的父类
        return：将指示器的圆点返回
     */
    "initIndicator":function(parentEl) {
        //动态创建指示器
        for(var j = 0 ; j < fnbanner.lis.length;j++)
        {
            var i = document.createElement("i");
            i.index = j;
            parentEl.appendChild(i);
        }
        //将所创建的指示器返回
        return parentEl.children;
    },
    /*
        作用：设置选中指示器
        current:当前选中的索引
     */
    "indicatorCurrent":function(current) {
        //干掉所有
        for(var i = 0; i < fnbanner.lis.length;i++)
        {
            fnbanner.indicator[i].setAttribute("class","");
        }
        //复活自己
        fnbanner.indicator[current].setAttribute("class","current");
    }
};
/*轮播图行右边的服务分类*/
var fnSaleServer = {
    "lis":null,
    "init":function() {
       var sale_server = $("sale_server");
        var ul = sale_server.children[0].children[0];
        for(var j = 0;j < 3; j++)
        {
            for(var k = 0;k < 4; k++)
                {
                    var li = document.createElement("li");
                    var i = document.createElement("i");
                    i.setAttribute("class", "icon");
                    i.style.background = "url(images/sprite_fs@1x.png) no-repeat "+k * -44+"px "+ j * -44 +"px"
                    li.appendChild(i);
                    var a = document.createElement("a");
                    a.innerHTML = "你好";
                    li.appendChild(a);
                    ul.appendChild(li);
                 }
        }
        this.lis = ul.children;
        //活动项目的设置
        this.activity(5,"减");
        this.activity(10,"抢");
    },
    /*
        作用：设置活动
        index:为那个设置活动，即索引
        txt: 设置的文本
    */
    "activity":function(index,txt) {
        var top = document.createElement("i");
        top.setAttribute("class","sub-top");
        top.innerHTML = txt;
        var down = document.createElement("i");
        down.setAttribute("class","sub-bottom");
        fnSaleServer.lis[index].appendChild(top);
        fnSaleServer.lis[index].appendChild(down);
    }
};
/*倒计时*/
var fnCountDownTime ={
    "timer":null,
    "time":0,
    "count_down_time_hour":null,
    "count_down_time_minute":null,
    "count_down_time_second":null,
    "init":function(time) {
        this.time = time;
        this.count_down_time_hour = $("count_down_time_hour");
        this.count_down_time_minute = $("count_down_time_minute");
        this.count_down_time_second = $("count_down_time_second");
        this.timer = setInterval(fnCountDownTime.downTime,1000);
    },
    /*倒计时的执行函数*/
    "downTime":function() {
        var s = fnCountDownTime.time % 60;
        var m = parseInt(fnCountDownTime.time / 60) %60;
        var h = parseInt(fnCountDownTime.time / 3600) %60;
        fnCountDownTime.count_down_time_second.innerHTML = fnCountDownTime.toggle(s);
        fnCountDownTime.count_down_time_minute.innerHTML = fnCountDownTime.toggle(m);
        fnCountDownTime.count_down_time_hour.innerHTML = fnCountDownTime.toggle(h);
        fnCountDownTime.time--;
    },
    /*小于10 的数前面添加个0*/
    "toggle":function(num) {
        return num < 10 ? "0"+num:num;
    }
};
/* toolbars栏 */
var  fnToolbars = {
    "items":null,
    "init":function() {
        var toolbar = $("toolbar");
        this.items = toolbar.getElementsByTagName("div");
        for (var j = 0; j < this.items.length; j++)
        {
            this.items[j].index = j;
            this.items[j].onmouseover = this.mouseover;
            this.items[j].onmouseout = this.mouseout;
        }
    },
    "mouseover":function()
    {
        var content = fnToolbars.items[this.index].children[0];
        var picture = fnToolbars.items[this.index].children[1];
        var dot = fnToolbars.items[this.index].children[2];
        My.animate(content, {"left":-55},10);
        picture.style.borderRadius = "0";
        picture.style.backgroundColor = "#C81623";
        dot.style.display = "none";
    },
    "mouseout":function() {
        var content = fnToolbars.items[this.index].children[0];
        var picture = fnToolbars.items[this.index].children[1];
        var dot = fnToolbars.items[this.index].children[2];
        My.animate(content, {"left": 33}, 10);
        picture.style.borderRadius = "3px 0 0 3px";
        picture.style.backgroundColor = "#7A6E6E";
        if (this.index == 0) {
            dot.style.display = "block";
        }
    }

};
/*电梯*/
var fnElevator = {
    "lis":null,
    "current":0,//当前的电梯位置
    "elevator":null,
    "init":function()
    {
        this.elevator = $("elevator");
        this.lis = elevator.children[0].children;
        //居中处理
        this.elevator.style.marginTop = -this.elevator.offsetHeight / 2 + "px";
        for(var j = 0 ;j <  this.lis.length ; j++) {
            this.lis[j].index = j;
            this.lis[j].onmouseover = this.mouseover;
            this.lis[j].onmouseout = this.mouseout;
            this.lis[j].onclick = this.click;
        }
        this.elevator.style.display = "none";
    },
    "click":function()
    {
        fnElevator.current = this.index;
        //变速移动到指定位置
        My.scrollToY(arr_elevatorY[this.index]);
        for(var j = 0 ;j <  fnElevator.lis.length ; j++) {
            fnElevator.lis[j].style.backgroundColor = "#918888";
        }
        this.style.backgroundColor = "#C81623";
    },
    "mouseover":function() {
        for(var j = 0 ;j <  fnElevator.lis.length ; j++) {
            fnElevator.lis[j].style.backgroundColor = "#918888";
        }
        fnElevator.lis[fnElevator.current].style.backgroundColor = "#C81623";
        this.style.backgroundColor = "#C81623";
    },
    "mouseout":function() {
        for(var j = 0 ;j <  fnElevator.lis.length ; j++) {
            fnElevator.lis[j].style.backgroundColor = "#918888";
        }
        fnElevator.lis[fnElevator.current].style.backgroundColor = "#C81623";
    }
};
/*模拟数据-----城市数组*/
var arr_city = ["北京","上海","天津","重庆","河北","北京","上海","天津","重庆","河北","北京","上海","天津","重庆","河北","北京","上海","天津","重庆","河北"];
/*模拟数据-----电梯*/
var arr_elevator = ["jdms","jd_content"];//对应的控件id
var arr_elevatorY = [];//对应的y的高度