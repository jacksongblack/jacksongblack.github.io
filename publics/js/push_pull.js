function PullOrPush(docment) {
    this.link = $(docment)
    this.element = $(this.link.attr("href"))
}

PullOrPush.prototype = {
    constructor: PullOrPush,
    show: function (fn) {
        this.element.removeClass("category_hide")
        if (typeof(fn) == "function") {
            fn(this.link, this.element)
        }
        ;
    },
    hide: function (fn) {
        this.element.addClass("category_hide");
        if (typeof(fn) == "function") {
            fn(this.link, this.element)
        }
        ;
    },
    getStatus: function () {
        var str = this.element.attr("class")
        try {
            var status = str.match("category_hide")
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
    this.category_code = new ElementDisplay("#category","category_hide","category")
}

DisplayMode.prototype = {
    constructor:DisplayMode,
    shutDown:function(){
        this.categories.hide()
        this.posts.hide()
        this.category_switch.hide()
        this.category_code.hide()
        console.log(this.category_code.hide)
    },
    openUp:function(){
        this.categories.show()
        this.posts.show()
        this.category_switch.show()
        this.category_code.show()
    }
}