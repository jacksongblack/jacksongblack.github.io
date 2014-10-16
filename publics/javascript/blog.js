// 异步载入对象
function AjaxLoadpage(element, url) {
    if (typeof(url) != "undefined") {
        this.url = url;
    } else {
        this.element = $(element);
        this.url = this.element.attr("href");
    }
    this.reviewHtml = new ReviewPage(".show_post");
}
AjaxLoadpage.prototype = {
    constructor: AjaxLoadpage,
    addUrlHistory: function (response) {
        var state = {htmlContent: response};
        try{
            window.history.pushState(state, '', this.url);
        }catch (err){
            alert("你阅览器版本太低无法使用更改地址栏功能");
            console.log(err);
        }
    },
    changeBlogContent: function (response) {
        var ajaxHtml = $(response).find("div#show_post").children();
        $("#show_post").html(ajaxHtml);
    },
    changeBlogTitle: function (response) {
        var ajaxHtml = $(response)[3].text;
        $("title").html(ajaxHtml);
    },
    reviewPage: function (response, fn) {
        var me =this;
        $("#show_post").page("open",function(){
        me.reviewHtml.empty();
        me.changeBlogContent(response);
        me.addUrlHistory(response);
        me.changeBlogTitle(response);
        toggleDuoshuoComments("#show_post");
        $("#show_post").page("close");
        });
    },
//  请求数据方法
    getServer: function (fn, el) {
        var thisMe = this;
        $('.progress').show();
        if (typeof(fn) == "function") {
            $.get(this.url, function (response) {
                $('.progress').hide();
                thisMe.reviewPage(response, fn);
            });
        }
    }
};
//清空或是增加页面内容
function ReviewPage(docObj){
    this.centent = $(docObj);
}
ReviewPage.prototype = {
    constructor: ReviewPage,
    empty: function () {
        this.centent.empty();
    },
    changerContent: function (html) {
        this.centent.html(html);
    }
};


//页面载入后初始化程序
function initPage() {
    var category_switch = $(".category_switch");
    var category_link_display_mode = factoryBlogDisplayModel(".category_switch");
    var display_mode = new DisplayMode();
    var sidebar_link = $("#open_sidebar");

    var searchBlog = {
       init:function(url){
           var me =this;
           var regKey = "";
           $.ajax({
               url: url,
               dataType: "xml",
               success: function (xml) {
                   me.xmlToObjectArray(xml);
                   me.formTableSubmit();
               }
           });
       },
        xmlToObjectArray: function (xml) {
            var me = this;
            var json = [];
            $(xml).find("*:first").children().each(function (i) {
                var obj = {title: $(this).find("title").text(), content: $(this).find("content").text(), url: $(this).find("url").text(),time:$(this).find("time").text()};
                json.push(obj);
            });
            me.json = json;
        },
        //    全站搜索
        fullTextSearch: function (keyword) {
            var reg = new RegExp(keyword);
            var regArray = [];
            $.each(this.json, function (n, v) {
                if (reg.test(this.title) || reg.test(this.content)) {
                    regArray.push(this);
                }
            });
            regKey = keyword;
            return regArray;
        },
        review: function (regArray) {
            var reg = RegExp('.*?'+regKey+'.*');
            var html = '<table class="table table-hover"><thead><h2>下面是包含关键字的文章<small>Search results</small>' +
                '</h2></thead><tbody>';
            $.each(regArray,function(){
                var content = "内容中没有匹配到关键字";
                var reTag = /<(?:.|\s)*?>/g;
                if(this.content.match(reg) != null){
                     content = this.content.match(reg);
                     content =  content.toString().replace(reTag,"");
                }
                html =  html + '<tr class="search_results"><td><a href="'+ this.url +
                    '" onclick="return false">'+
                    '<h3>' + this.title +'<small>'+
                    this.time +'</small></h3>'+'</a>' +
                    "<p>"+ content  +'</p>';
            });
         html=   html + "</td></tr></tbody></table>";
            $("#show_post").html(html);
        },
        formTableSubmit: function () {
            var me = this;
            $("#search_form").submit(function (e) {
                e.preventDefault();
                var regArray = me.fullTextSearch($("#search_input").val());
                if (regArray.length === 0) {
                    alert("没有搜到任何东西");
                    return;
                }
                me.review(regArray);
                searchResultsWalkel();
            });
        }
    };

    var linksObjArray =[{selector:"#category li a",fn:addCategoryLinkBackgroundColor},
        {selector:"#show_post table tbody tr td a",fn:bindBlogLinkClickEvent},
        {selector:"#posts ul li a",fn:bindBlogLinkClickEvent},
        {selector:"#recent ul li a ",fn:bindBlogLinkClickEvent}];
    function traversalLinks(array){
        $.each(array,function(n,v){
            var obj = this;
            $(this.selector).each(function(){
                obj.fn.call(this);
            });
        });

    }
    function init() {
        bindCategoryLinkOnclickEvent();
        bindSidebarClickEvent();
        traversalLinks(linksObjArray);
        addHoverEventInSidebarLink();
        addPostHoverEvent();
        addHoverEventIncategoryNav();
        addHoverEventInCategoryLink();
        checkBrowserVersion();
        searchBlog.init("http://www.songyuchao.com/search.xml");
        $("#myModal").modal("hide");
     }
//   检测浏览器版本信息
    function checkBrowserVersion() {
        var userAgent = navigator.userAgent.toLowerCase();
        // Figure out what browser is being used
        jQuery.browser = {
            version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
            safari: /webkit/.test(userAgent),
            opera: /opera/.test(userAgent),
            msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
            mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)
        };

        var ie_version = ["6.0", "7.0", "8.0", "9.0"];

        $.each(ie_version, function (n, value) {
            if ($.browser.msie && ($.browser.version == value) && !$.support.style) {
                alert("亲～～！你的浏览器版本太低了，本博客可能达不到最佳显示效果！！");
            }
        });

    }
// 绑定category超链接鼠标悬浮事件为点击该超链接
    function addHoverEventInCategoryLink() {
        $("#category li a ").each(function () {
            $(this).hover(function () {
                $(this).click();
            });
        });
    }
//绑定侧边栏超链接鼠标悬浮事件为点击事件
    function addHoverEventInSidebarLink() {
        sidebar_link.hover(function () {
            if (sidebar_link.text() == "最近文章") {
                sidebar_link.click();
            }
        });
    }
//绑定种类超链接鼠标悬浮事件为点击事件
    function addHoverEventIncategoryNav() {
        var category_menu = $("#category_menu");
        category_menu.hover(function () {
            if (category_switch.text() == "打开种类") {
                category_switch.click();
            }
        });

    }
    function addHoverEventCloseSidebar(jqueryObj, link) {
        jqueryObj.hover(function () {
            if (link.text() == "关闭最近") {
                link.click();
            }
            if (category_switch.text() == "关闭种类") {
                category_switch.click();
            }
        });
    }

    function addPostHoverEvent() {
        var show_post = $("#show_post");
        var post = $("#post");
        addHoverEventCloseSidebar(show_post, sidebar_link);
        addHoverEventCloseSidebar(post, sidebar_link);
    }


    function bindCategoryLinkOnclickEvent() {
        category_switch.click(function () {
            if (category_link_display_mode.getStatus("glyphicon-minus")) {
                category_link_display_mode.show(function (link) {
                    display_mode.openUp();
                    link.html("关闭种类");
                });

            } else {
                category_link_display_mode.hide(function (link) {
                    display_mode.shutDown();
                    link.html("打开种类");
                });
            }
        });
    }

    function removeCategoryLinkBackgroundColor(currentLink) {
        $("#category li a").each(
            function () {
                if (this != currentLink) {
                    factoryBlogDisplayModel("[data-url=" + $(this).attr("data-url") + "]").hide(function (link) {
                        link.removeClass("marker_color");
                    });
                }
            }
        );
    }
    function addCategoryLinkBackgroundColor() {
        var displayModel = factoryBlogDisplayModel("[data-url=" + $(this).attr("data-url") + "]");
        var currentLink = this;
        $(this).click(function () {
            displayModel.show(function (link) {
                link.addClass("marker_color");
            });
            removeCategoryLinkBackgroundColor(currentLink);
        });
    }
   function searchResultsWalkel(){
       var srarch_results =[{selector:".search_results td a",fn:bindBlogLinkClickEvent}];
       traversalLinks(srarch_results);
   }
    function bindBlogLinkClickEvent() {
        var load = new AjaxLoadpage(this);
        $(this).click(function () {
            load.getServer(function () {
            });
        });
    }
    function bindSidebarClickEvent() {
        $("#open_sidebar").sidr({
                side: 'right',
                name: "recent",
                onOpen: function () {
                    window.setTimeout(function () {
                        var recent_width = $("#recent").width();
                        var sidebarObj = $(".sidebar_right_menu");
                        sidebarObj.css("right", recent_width);
                        sidebarObj.find("a").html("关闭最近");
                    }, 200);
                },
                onClose: function () {
                    window.setTimeout(function () {
                        var sidebarObj = $(".sidebar_right_menu");
                        sidebarObj.css("right", 0);
                        sidebarObj.find("a").html("最近文章");
                    }, 200);
                }
            }
        );
    }

    return {init: init};
}
/*
 *加载多说评论框
 * */ 
function toggleDuoshuoComments(container) {
    var obj = $(".ds-thread");
    var el = document.createElement('div');//该div不需要设置class="ds-thread"
    el.setAttribute('data-thread-key', obj.attr("data-thread-key"));//必选参数
    el.setAttribute('data-url', obj.attr("data-url"));//必选参数
    DUOSHUO.EmbedThread(el);
    jQuery(container).append(el);
}
/*翻页动画效果*/
(function($){
    $.fn.extend({
        page:function(state,fn){
            var me =this;
            function animationArray(moves,step,fn){
                $.each(moves,function(index,v){
                    $(me).animate(v,{
                        duration:3000,
                        step:function(now,fx){
                        step(now,fx);
                    },speed:1000,
                    complete:fn});
                });
            }
           var moves= [{borderSpacing: 90}];
           if(state == "open"){
               $(me).attr('style','');  
               animationArray(moves,function(now,fx){
                      $(me).css('transform','rotateY('+now+'deg)');  
               },fn);}
               else if(state == "close"){
               $(me).attr('style','');  
                   animationArray(moves,function(now,fx){
                       var cre = 90 - now;
                      $(me).css('transform','rotateY('+cre.toString()+'deg)');  
                   },fn); 
               }
        }});

})(jQuery);
$(window).ready(function () {
    initPage().init();
    //增加阅览器地址变化时的处理
    window.addEventListener("popstate", function (e) {
        if (e.state) {
            var ajaxHtml = $(e.state.htmlContent).find("div#show_post").children();
            $("#show_post").empty();
            $("#show_post").append(ajaxHtml);
            toggleDuoshuoComments("#show_post");
            $('.progress').hide();
        }
    });
});
