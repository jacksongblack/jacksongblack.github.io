---
layout: post
category: 前端技术
title: Github搭建的博客实现JS搜索功能
describer: 只用JS实现全站博客文章的关键字搜索
---
## Github搭建的博客实现JS搜索功能
<br/>
<br/>
<br/>
![](/publics/images/blog_images/2014-7/search.jpg)
<br/>
<br/>
<br/>
&emsp;&emsp;在github上搭建博客时候，唯一使用一点算是后端的环境就是jekyll，但是这个东西设计就是用来生成静态页面的。
并没有设计数据库什么的，更不要提搜索功能了,那怎么来实现搜索功能呢？

### 我的解决思路

全部代码

    Search.prototype = {
        constructor: SearchBlog,
    //    异步获取数据内容后的处理函数调用
        init: function (xml) {
            searchBlogObj.xmlToObjectArray(xml)
            searchBlogObj.formTableSubmit()
        },
    //    异步获取整个站点文章
        getXmlHttpResponse: function () {
            var fn = searchBlogObj.init
            $.ajax({
                    url: this.url,
                    dataType: "xml",
                    success: function (xml) {
                        fn(xml)
                    }
                }
            )
        },
    //    将xml转换为对象的数组
        xmlToObjectArray: function (xml) {
            var json = []
            $(xml).find("*:first").children().each(function (i) {
                var obj = {title: $(this).find("title").text(), content: $(this).find("content").text(), url: $(this).find("url").text(),time:$(this).find("time").text()}
                json.push(obj)
            })
            searchBlogObj.json = json
        },
    //    全站搜索
        fullTextSearch: function (keyword) {
            var reg = new RegExp(keyword)
            var regArray = []
            $.each(searchBlogObj.json, function (n, v) {
                if (reg.test(this.title) || reg.test(this.content)) {
                    regArray.push(this)
                }
            })
            return regArray
        },
    //   搜索成功后重新渲染页面
        review: function (regArray) {
             var html = "<div class='container'><div class='row'><h2>下面是包含关键字的文章</h2>"
            $.each(regArray,function(){
                html =  html + '<a href="'+ this.url +'" class="col-md-7">'+'<hr class="featurette-divider"><h3>' + this.title +'</h3><p>'+ this.time +'</p><p>'+ $(this.content).text()  +'</p>'+'<hr class="featurette-divider">'+'</a>' + ""

            })
            html + "</div></div>"
            $("#show_post").html(html)
        },
    //    绑定搜索输入框获取输入框内容
        formTableSubmit: function () {
            var thisObj = this
            $("#search_form").submit(function (e) {
                e.preventDefault();
                var regArray = searchBlogObj.fullTextSearch($("#search_input").val())
                if (regArray.length === 0) {
                    alert("没有搜到任何东西")
                    return
                }
                thisObj.review(regArray);
            })
        }
    }


#### 数据来源

##### 思路

&emsp;&emsp; 我们知道jekyll不但能生成html，也能生成XML（比如生成站点地图），为什么不利用这点将网站所有的文章做个XML，
作为检索用的原始数据，

##### 实现

下面是jekyll实现代码

    <?xml version="1.0" encoding="UTF-8"?>
    <blogs>
    { % for post in site.posts % }
    <blog>
      <title>{ {post.title | xml_escape} }</title>
      <content>{ {post.content | xml_escape} }</content>
      <url>http://www.yourUrl.com{ {post.url} }</url>
      <time>{ { post.date | date: "%Y-%m-%d"} }</time>
    </blog>
      { % endfor % }
    </blogs>

上面代码将整个站点的搜索文章全部打印了出来，这里要注意一下因为是生成XML，jekyll使用的是Liquid，在生成XML时候如果不使用
XML_escape，逃避一些格式，就会造成jekyll出现错误。

##### 数据处理

理论上jquery应该有更好的XML处理办法，只是我没有找到，于是自己写了JS代码，将异步读取的XML转化为对象的数组

    xmlToObjectArray: function (xml) {
        var json = []
        $(xml).find("*:first").children().each(function (i) {
            var obj = {title: $(this).find("title").text(), content: $(this).find("content").text(), url: $(this).find("url").text(),time:$(this).find("time").text()}
            json.push(obj)
        })
        searchBlogObj.json = json
    },

##### 内容搜索

我已经拿到转换成对象数组的整站数据，现在就是我们搜索过程，我的搜索过程比较简单，一旦`正則匹配`出有关键字
就将这个对象放在匹配成功的数组里面，实现代码如下

        fullTextSearch: function (keyword) {
            var reg = new RegExp(keyword)
            var regArray = []
            $.each(searchBlogObj.json, function (n, v) {
                if (reg.test(this.title) || reg.test(this.content)) {
                    regArray.push(this)
                }
            })
            return regArray
        }

#### 前端实现

上面我们看到的基本就是整个代码"后台"部分,现在我们要为用户制作一个输入关键字form表单，这个表单不能真正被提交，而是当点击
提交事件时候，更改点击后的操作处理方法为获取关键字，

    formTableSubmit: function () {
            var thisObj = this
            $("#search_form").submit(function (e) {
                e.preventDefault();
                var regArray = searchBlogObj.fullTextSearch($("#search_input").val())
                if (regArray.length === 0) {
                    alert("没有搜到任何东西")
                    return
                }
                thisObj.review(regArray);
            })
        }

重新渲染页面，通过JS生成HTML

    review: function (regArray) {
                 var html = "<div class='container'><div class='row'><h2>下面是包含关键字的文章</h2>"
                $.each(regArray,function(){
                    html =  html + '<a href="'+ this.url +'" class="col-md-7">'+'<hr class="featurette-divider"><h3>' + this.title +'</h3><p>'+ this.time +'</p><p>'+ $(this.content).text()  +'</p>'+'<hr class="featurette-divider">'+'</a>' + ""

                })
                html + "</div></div>"
                $("#show_post").html(html)
     },

