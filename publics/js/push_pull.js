function ShowsOrhides(docment) {
    this.link = $(docment)
    this.element = $(this.link.attr("href"))
}

ShowsOrhides.prototype = {
    constructor: ShowsOrhides,
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
function factoryShowsOrhides(el){
    var obj = new ShowsOrhides(el)
    return obj
}

function ElementDisplay(docElement, hideCss, showCss) {
    this.hideCss = hideCss;
    this.showCss = showCss;
    this.docObj = $(docElement)
}
ElementDisplay.prototype = {
    constructor:ElementDisplay,
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

function DisplayMode(){
    this.categories = new ElementDisplay(".left_category","left_category_hide","left_category")
    this.posts = new ElementDisplay("#posts","left_posts_list_hide","left_posts_list")
    this.category_switch = new ElementDisplay(".category_switch","glyphicon-arrow-right","glyphicon-arrow-left")
    this.category_code = new ElementDisplay("#category","categories_hide","categories")
}

DisplayMode.prototype = {
    constructor:DisplayMode,
    shutDown:function(){
        this.categories.hide()
        this.posts.hide()
        this.category_switch.hide(function(link){
            link.html("关闭种类")
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