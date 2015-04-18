---
layout: post
title: django创建多条数据
category: 后端技术
describer: django的orm由于操作延迟造成迭代创建只能保存最后一个
---
## django创建多条数据

我在用迭代创建多条数据时，发现只有最后一条才保存了，不管我用什么方法都不行，后来想起django对数据库都是延时执行的，是不是
这个原因造成的呢？？后来gg出来一个办法，用manage_obj 一个多个创建的方法（django1.4以后版本有，以前的只有实现这个方法）
   
    Model.object.bulk_create(Obj)

这个方法还有个好处是只会链接一次数据库
    
