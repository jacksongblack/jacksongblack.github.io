function PullOrPush(docment) {
    this.link = $(docment)
    this.element = $(this.link.attr("href"))
}

PullOrPush.prototype = {
    constructor: PullOrPush,
    show: function (fn) {
        this.element.removeClass("hide")
        if (typeof(fn) == "function") {
            fn(this.link, this.element)
        }
        ;
    },
    hide: function (fn) {
        this.element.addClass("hide");
        if (typeof(fn) == "function") {
            fn(this.link, this.element)
        }
        ;
    },
    getStatus: function () {
        var str = this.element.attr("class")
        try {
            var status = str.match("hide")
        } catch (error) {
            console.log(error)
        }

        if (status == null) {
            return false
        } else {
            return true
        }

    }
}

function ElementDisplay(docElement, hideCss, showCss) {
    this.hideCss = hideCss;
    this.showCss = showCss;
    this.docObj = $(docElement)
}
ElementDisplay.prototype = {
    show: function () {
        this.addOnlyOneClass(this.showCss)
        this.docObj.removeClass(this.hideCss)
    },
    hide: function () {
        this.docObj.removeClass(this.showCss)
        this.addOnlyOneClass(this.hideCss)
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
    this.category = new ElementDisplay("#category","hide","")
}

DisplayMode.prototype = {
    constructor:DisplayMode,
    shutDown:function(){
        this.categories.hide()
        this.posts.hide()
        this.category_switch.hide()
        this.category.hide()
    },
    openUp:function(){
        this.categories.show()
        this.posts.show()
        this.category_switch.show()
        this.category.show()
    }
}