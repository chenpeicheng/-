/**
 * Created by CPC on 2017/7/3.
 */
/*个人封装的函数*/
var My = {
    /*
     作用：多属性动画
     obj: 需要获得样式Style的控件,
     json ：json对象，
     delay: 定时器的时间(不写默认为30)
     fn：回调函数（不写默认不回调，如果写了回调函数，定时器事件必须写上）
     */
    animate: function (obj, json, delay, fn) {
        var myStyle = My.getStyle(obj);
        clearInterval(obj.timer);
        if (!delay) {
            delay = 30;
        }
        ;
        obj.timer = setInterval(function () {
            var stopTimer = true;//是否停止定时器
            for (attr in json) {
                var attrVar = parseInt(myStyle[attr]);
                if (attr == "opacity") {
                    attrVar = myStyle[attr] * 100;
                }
                ;
                //缓动动画---计算
                var result = (json[attr] - attrVar) / 10;
                result = result > 0 ? Math.ceil(result) : Math.floor(result);
                //特殊属性的划分处理
                switch (attr) {
                    case "opacity"://透明度的处理
                        //如果attrVar是数字，代表可以获得属性
                        if (isNaN(attrVar)) {
                            setOpacity(obj, json[attr]);
                            result = 0;//说明透明度达到的预期值
                        } else {
                            setOpacity(obj, attrVar + result);
                        }
                        ;
                        break;
                    case "zIndex":
                        obj.style.zIndex = json[attr];
                        break;
                    default://需要添加px的处理（如:left width...）
                        obj.style[attr] = attrVar + result + "px";
                        break;
                }
                //result为0 的时候，说明属性已经到达了预期的值了。
                if (result) {
                    stopTimer = false;
                }
                ;

            }
            //判断是否可以关闭定时器
            if (stopTimer) {
                clearInterval(obj.timer);
                if (fn) {
                    fn();
                }
                ;
            }
            ;
        }, delay);
    },
    /* 作用：变速的移动到页面的指定位置
    *  y : y轴距离
    */
    "toYtimer":null,
    "scrollToY": function (y) {
        clearInterval(My.toYtimer);
        My.toYtimer = setInterval(function () {
            var stepY = (y - My.scroll().top) / 10;
            stepY = stepY > 0 ? Math.ceil(stepY) : Math.floor(stepY);
            window.scrollTo(0, My.scroll().top + stepY);
            if (stepY == 0) {
                clearInterval(My.toYtimer);
            }
        }, 30);
    },

    /*
     作用：解决获得样式的兼容性问题
     obj: 需要获得样式Style的控件
     返回：对应的样式
     */
    "getStyle": function (obj) {
        // ie 等obj.currentStyle
        //w3c 浏览器 window.getComputedStyle
        return obj.currentStyle ? obj.currentStyle : window.getComputedStyle(obj, null);
    },
    /*
     作用：解决设置透明度的兼容性问题
     obj: 需要设置透明度的控件，
     alpha：透明度，0-100 之间的数
     */
    "setOpacity": function (obj, alpha) {
        //判断游览器支持opacity这种写法 IE678不支持
        if ("opacity" in obj.style) {
            obj.style.opacity = alpha / 100;
        }
        else {
            console.log("IE" + alpha);
            obj.style.filter = "alpha(opacity = " + alpha + ")";
        }
        ;
    },
    /*
     作用：根据类名获得对应的标签，兼容性写法支持IE 6 7 8
     className: 需要获得标签的类名
     id : 指定标签的id
     返回：对应的类名的标签 返回type:数组
     */
    "getClass": function (className, id) {
        var idEle = null;
        //是否有id，没有就全局查找
        if (id) {
            idEle = document.getElementById(id);
        }
        else {
            idEle = document;
        }
        //判断是否可用，如果可用，直接返回即可
        // document.getElementsByClassName 普通游览器支持
        if (document.getElementsByClassName) {
            return idEle.getElementsByClassName(className);
        }
        //存放满足条件的标签
        var arr = [];
        //获取指定id范围中的所有标签
        var tagAll = idEle.getElementsByTagName("*");
        //遍历所有的标签
        for (var i = 0; i < tagAll.length; i++) {
            // 分割类名转化为数组
            var names = tagAll[i].className.split(" ");
            // 遍历 类名分割的数组
            for (var j = 0; j < names.length; j++) {
                // 判断满足条件的标签放入arr中
                if (names[j] == className) {
                    arr.push(tagAll[i]);
                }
            }
        }
        return arr;
    },
    /*作用：兼容性的获取卷起顶部或者左部的大小
      return：json数据
    */
    "scroll": function () {
        // ie9+ 和高级游览器支持
        if (window.pageYOffset != null) {
            return {
                top: window.pageYOffset,
                left: window.pageXOffset
            }
            // 判断是否是怪异游览器 （是否声明了DTD）
        } else if (document.compatMode == "CSS1Compat") {
            return {
                top: document.documentElement.scrollTop,
                left: document.documentElement.scrollLeft
            }
        }
        // 剩下的都是怪异游览器，即没有声明<!DOCTYPE html>
        return {
            top: document.body.scrollTop,
            left: document.body.scrollLeft
        }
    }
};
/*控件查找*/
function $(id) {
    return document.getElementById(id);
}
