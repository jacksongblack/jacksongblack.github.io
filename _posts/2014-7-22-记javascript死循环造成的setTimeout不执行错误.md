---
layout: post
category: 前端技术
title: 记javascript死循环造成的setTimeout不执行错误
describer: 一次比较隐秘的BUG调试，通过这了解了JS单线程setTimeOut机制
---
# 记javascript死循环造成的setTimeout不执行错误
![](/publics/images/blog_images/2014-7/javaSctript.jpg)</br>

今天在调试一段代码时，出现一个浏览器死机的现象，调试后发现是在理解setTimeout函数时一个误解，先上示范代码的代码

    function tank(){
    this.x = 12
    this.y =10
    }

    function test(){
     var obj = new tank()

     while(0 <= obj.x && obj.x <= 50 &&  0<= obj.y && obj.y <= 50){

       setTimeout(function(){
        obj.x = obj.x + 10;
        obj.y = obj.y + 10;
       },1000)
     }
    }

## 本来设想的工作过程

在`while`中循环的函数，以为进程会停在这里等待 但事实证明我想错了，程序运行到这并没有等待`setTimeout`函数执行，
而是继续执行下去，但是`setTimeout`函数里面有改变判断值的部分，由于迟迟不能改变判断值，`while`遂成死循环，最后页
面死掉。

## 修改

既然知道原因了，那么现在我们在更改这个函数

    function tank(){
        this.x = 12
        this.y =10
        }

    function test(){
     var obj = new tank()
     obj.x = obj.x + 10;
     obj.y = obj.y + 10;

     if(0 <= obj.x && obj.x <= 50 &&  0<= obj.y && obj.y <= 50){

       setTimeout(function(){
            test()   },1000)
     }
    }

（完）



