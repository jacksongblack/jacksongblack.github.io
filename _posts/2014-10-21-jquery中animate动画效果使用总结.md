---
layout: post
title: jquery中animate动画效果详解
category: 前端技术
---

## jquery中animate动画效果详解

在css3的animation属性没出来之前，前端实现动画效果大多采用的是jquery的实例方法animate，下面是这个方法的一般用法

     $("selector").animate({opacity:0;},"slow")

这是最简单的用法,有时候我们为了达到某些效果，简单用法可能不能满足我们，比如我们在使用css3的transForm（变型）时候，
比如旋转我们需要这样写css

     transform: rotateY(30deg); /绕Y轴旋转

如果你不想使用css3动画，这里用animate将遇到一个很大的问题，animate不会计算30deg这个单位的数字，也就是他不能完成这样的动画效果，那怎么办，我在看W3School时候，虽然有参数的解释，但是却没有Example不知到怎么传回调下面是我在stack overflow中找一个，所以记录下来

     $("selector").animate({borderSpacing:90;},{
         duration: 1000，  /*执行时间，可以是数字或是“slow”等字符串*/         step:function(now,fx){
              $(fx.elem).attr("style","transform:("+ now.toString +"deg)")
         },/*每步执行完后的回调 主要有两个参数很有用now，fx 分别是指现在执行的数值 fx当前执行对象*/
         complete:function(){
          callback();/*全部执行完的回调*/ 
         }
        })
到此animate用法就比较明细了，最近一直想用nodejs做前端构建工具，希望下次博客可以增加这方面的内容
