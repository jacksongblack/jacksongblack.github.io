// 异步载入对象
function AjaxLoadpage(element, url) {
    if (typeof(url) != "undefined") {
        this.url = url
    } else {
        this.element = $(element)
        this.url = this.element.attr("href")
    }


    this.reviewHtml = new ReviewPage(".show_post")
}
AjaxLoadpage.prototype = {
    constructor: AjaxLoadpage,
    addUrlHistory: function (response) {
        var state = {htmlContent: response}
        window.history.pushState(state, '', this.url)
    },
    changeBlogContent: function (response) {
        var ajaxHtml = $(response).find("div#show_post").children()
        $("#show_post").html(ajaxHtml)
    },
    changeBlogTitle: function (response) {
        var ajaxHtml = $(response)[3].text
        $("title").html(ajaxHtml)
    },
    reviewPage: function (response, fn) {
        this.reviewHtml.empty()
        this.changeBlogContent(response);
        this.addUrlHistory(response);
        this.changeBlogTitle(response)
        fn()
    },
//  请求数据方法
    getServer: function (fn, el) {
        var thisMe = this;
        if (typeof(fn) == "function") {
            $.get(this.url, function (response) {
                thisMe.reviewPage(response, fn);
            })
        }
    }
}
//清空或是增加页面内容
function ReviewPage(docObj) {
    this.centent = $(docObj)
}
ReviewPage.prototype = {
    constructor: ReviewPage,
    empty: function () {
        this.centent.empty();
    },
    changerContent: function (html) {
        this.centent.html(html)
    }
}
//页面载入后初始化程序
function initPage() {
    var category_switch = $(".category_switch")
    var category_link_display_mode = factoryBlogDisplayModel(".category_switch")
    var display_mode = new DisplayMode()
    var sidebar_link = $("#open_sidebar")
    var search = new SearchBlog("http://0.0.0.0:4000/search.xml")


    function init() {
        bindCategoryLinkOnclickEvent();
        bindSidebarClickEvent();
        CategoryLinksWalkel();
        blogTitleLinksWalker();
        blogSidebarTitleLinkWalker();
        addHoverEventInSidebarLink();
        addPostHoverEvent();
        addHoverEventIncategoryNav();
        addHoverEventInCategoryLink();
        checkBrowserVersion();
        search.getXmlHttpResponse();

    }

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

        var ie_version = ["6.0", "7.0", "8.0", "9.0"]

        $.each(ie_version, function (n, value) {
            if ($.browser.msie && ($.browser.version == value) && !$.support.style) {
                alert("亲～～！你的浏览器版本太低了，本博客可能达不到最佳显示效果！！")
            }
        })

    }

    function addHoverEventInCategoryLink() {
        $("#category li a ").each(function () {
            $(this).hover(function () {
                $(this).click();
            })
        })
    }

    function addHoverEventInSidebarLink() {
        sidebar_link.hover(function () {
            if (sidebar_link.text() == "最近文章") {
                sidebar_link.click();
            }
        })
    }

    function addHoverEventIncategoryNav() {
        var category_menu = $("#category_menu")
        category_menu.hover(function () {
            if (category_switch.text() == "打开种类") {
                category_switch.click();
            }
        })

    }

    function addHoverEventCloseSidebar(jqueryObj, link) {
        jqueryObj.hover(function () {
            if (link.text() == "关闭最近") {
                link.click();
            }
            if (category_switch.text() == "关闭种类") {
                category_switch.click()
            }
        })
    }

    function addPostHoverEvent() {
        var show_post = $("#show_post")
        var post = $("#post")
        addHoverEventCloseSidebar(show_post, sidebar_link);
        addHoverEventCloseSidebar(post, sidebar_link);
    }


    function bindCategoryLinkOnclickEvent() {
        category_switch.click(function () {
            if (category_link_display_mode.getStatus("glyphicon-minus")) {
                category_link_display_mode.show(function (link) {
                    display_mode.openUp()
                    link.html("关闭种类")
                })

            } else {
                category_link_display_mode.hide(function (link) {
                    display_mode.shutDown()
                    link.html("打开种类")
                })


            }
        })
    }

    function removeCategoryLinkBackgroundColor(currentLink) {
        $("#category li a").each(
            function () {
                if (this != currentLink) {
                    factoryBlogDisplayModel("[data-url=" + $(this).attr("data-url") + "]").hide(function (link) {
                        link.removeClass("marker_color")
                    })
                }
            }
        )
    }

    function addCategoryLinkBackgroundColor() {
        var displayModel = factoryBlogDisplayModel("[data-url=" + $(this).attr("data-url") + "]")
        var currentLink = this
        $(this).click(function () {
            displayModel.show(function (link) {
                link.addClass("marker_color")
            })
            removeCategoryLinkBackgroundColor(currentLink);
        })
    }

    function CategoryLinksWalkel() {
        $("#category li a").each(function () {
            addCategoryLinkBackgroundColor.call(this);
        })
    }


    function bindBlogLinkClickEvent() {
        var load = new AjaxLoadpage(this)
        $(this).click(function () {
            $('.progress').show()
            display_mode.shutDown()
            load.getServer(function () {
                toggleDuoshuoComments("#show_post")
                $('.progress').hide()
            })

        })
    }

    function blogTitleLinksWalker() {
        $("#posts ul li a").each(function () {
            bindBlogLinkClickEvent.call(this);
        })
    }

    function blogSidebarTitleLinkWalker() {
        $("#recent ul li a ").each(function () {
            bindBlogLinkClickEvent.call(this)
        })
    }

    function bindSidebarClickEvent() {
        $("#open_sidebar").sidr({
                side: 'right',
                name: "recent",
                onOpen: function () {
                    window.setTimeout(function () {
                        var recent_width = $("#recent").width();
                        var sidebarObj = $(".sidebar_right_menu")
                        sidebarObj.css("right", recent_width)
                        sidebarObj.find("a").html("关闭最近")
                    }, 200)
                },
                onClose: function () {
                    window.setTimeout(function () {
                        var sidebarObj = $(".sidebar_right_menu")
                        sidebarObj.css("right", 0)
                        sidebarObj.find("a").html("最近文章")
                    }, 200)
                }
            }
        )
    }

    return {init: init}
}


function toggleDuoshuoComments(container) {
    var obj = $(".ds-thread")
    var el = document.createElement('div');//该div不需要设置class="ds-thread"
    el.setAttribute('data-thread-key', obj.attr("data-thread-key"));//必选参数
    el.setAttribute('data-url', obj.attr("data-url"));//必选参数
    DUOSHUO.EmbedThread(el);
    jQuery(container).append(el);
}

function SearchBlog(url) {
    this.url = url;
    searchBlogObj = this
}

SearchBlog.prototype = {
    constructor: SearchBlog,
    init: function (xml) {
        searchBlogObj.xmlToObjectArray(xml)
        searchBlogObj.formTableSubmit()
    },
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
    xmlToObjectArray: function (xml) {
        var json = []
        $(xml).find("*:first").children().each(function (i) {
            var obj = {title: $(this).find("title").text(), content: $(this).find("content").text(), url: $(this).find("url").text(),time:$(this).find("time").text()}
            json.push(obj)
        })
        searchBlogObj.json = json
    },
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
    review: function (regArray) {
         var html = "<div class='container'><div class='row'><h2>下面是包含关键字的文章</h2><hr class='featurette-divider'>"
        $.each(regArray,function(){
            html =  html + '<a href="'+ this.url +'" class="col-md-7">'+'<h3>' + this.title +'</h3><p>'+ this.time +'</p><p>'+ $(this.content).text()  +'</p>'+'<hr class="featurette-divider">'+'</a>' + ""

        })
        html + "</div></div>"
        $("#show_post").html(html)
    },
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

$(window).ready(function () {
    initPage().init();
    //增加阅览器地址变化时的处理
    window.addEventListener("popstate", function (e) {
        if (e.state) {
            var ajaxHtml = $(e.state.htmlContent).find("div#show_post").children()
            $("#show_post").empty()
            $("#show_post").append(ajaxHtml)
            toggleDuoshuoComments("#show_post")
            $('.progress').hide()
        }
    })
})
