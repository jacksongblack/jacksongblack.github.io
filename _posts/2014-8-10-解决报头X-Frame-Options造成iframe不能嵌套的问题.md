---
layout: post
category: 后台技术
describer: 通过设置x-Frame-Options限制网页嵌套
title: 使用设置报头x-Frame-Options限制iframe网页嵌套
---

# 使用设置报头x-Frame-Options限制iframe网页嵌套

&emsp;最近做web-app,在设计的时候使用angularJS做前端页面框架（关于angularJS使用心得后面将慢慢记录），现在有这么一个设计，我前台只是做页面框机显示，主要业务流程还是由后台API提贡表单页面我嵌套就OK，这样的目的是让后台更加专注页面流程，也方便以后做成平台+API方式部署整个系统，好吧现在还是回到我本文的主要内容。
## 关于x-Frame-Options参数说明

### 浏览器支持

x-frame-options的出现不久，最初设计我猜测是为了防止一些别有用心的者制作钓鱼网站，现在支持的浏览器有一下

* chrome 4.1.249.1042
* firefox 3.6.9(1.9.2.9)
* IE 8.0
* opera 10.50
* safari

### 主要参数

他主要由三个参数

* DENY 只允许本域名下的ifrema 调用
* SAMEORIGIN 只允许不本站点的下内容调用
* ALLOW-From 允许制定的地址调用。

### 在grape&Sinatra中设置办法

如果想在由`grape$sinatra`设置报头可以按下面方法设置

     response.headers["X-Frame-Options"] = ''

## 参考资料

[x-frame-options介绍](https://www.owasp.org/index.php/Clickjacking_Defense_Cheat_Sheet)</br>
[grape&sinatra github介绍](https://github.com/intridea/grape#alongside-sinatra-or-other-frameworks)</br>
(完)
