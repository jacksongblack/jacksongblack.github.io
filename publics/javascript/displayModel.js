//获取文章并封装隐藏方法
function blogDisplayModel(docment) {
    this.link = $(docment)
    this.element = $(this.link.attr("data-url"))
}

blogDisplayModel.prototype = {
    constructor: blogDisplayModel,
    show: function (fn) {
        this.element.removeClass("posts_hide")
        if (typeof(fn) == "function") {
            fn(this.link, this.element)
        }
        ;
    },
    hide: function (fn) {
        this.element.addClass("posts_hide");
        if (typeof(fn) == "function") {
            fn(this.link, this.element)
        }
        ;
    },
// 检查
    getStatus: function (Srtatus) {
        var str = this.link.attr("class")
        try {
            var status = str.match(Srtatus)
        } catch (error) {
            console.log(error)
        }

        if (status == null) {
            return true
        } else {
            return false
        }

    }
}
function factoryBlogDisplayModel(el){
    var obj = new blogDisplayModel(el)
    return obj
}

function ElementDisplayModel(docElement, hideCss, showCss) {
    this.hideCss = hideCss;
    this.showCss = showCss;
    this.docObj = $(docElement)
}
ElementDisplayModel.prototype = {
    constructor:ElementDisplayModel,
    show: function (fn) {
        this.addOnlyOneClass(this.showCss)
        this.docObj.removeClass(this.hideCss)
        if(typeof(fn) == "function"){
            fn(this.docObj)
        }
    },
    hide: function (fn) {
        this.docObj.removeClass(this.showCss)
        this.addOnlyOneClass(this.hideCss)
        if(typeof(fn) == "function"){
            fn(this.docObj)
        }
    },
    addOnlyOneClass: function (addClass) {
        try {
            if ($("."+ addClass).length == 0) {
                this.docObj.addClass(addClass)
            } else {
                return  false
            }
        } catch (error) {
            this.docObj.addClass(addClass)
              console.log(error)
        }

    }
}
//封装两种显示模式
function DisplayMode(){
    this.categories = new ElementDisplayModel(".left_category","left_category_hide","left_category")
    this.posts = new ElementDisplayModel("#posts","left_posts_list_hide","left_posts_list")
    this.category_switch = new ElementDisplayModel(".category_switch","glyphicon-plus","glyphicon-minus")
    this.category_code = new ElementDisplayModel("#category","categories_hide","categories")
}

DisplayMode.prototype = {
    constructor:DisplayMode,
    shutDown:function(){
        this.categories.hide()
        this.posts.hide()
        this.category_switch.hide(function(link){
            link.html("打开种类")
        })
        this.category_code.hide()
    },
    openUp:function(){
        this.categories.show()
        this.posts.show()
        this.category_switch.show(function(link){
            link.html("关闭种类")
        })
        this.category_code.show()
    }
}