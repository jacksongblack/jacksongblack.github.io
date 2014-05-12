function LoadHtml(element) {
    this.element = $(element)
    this.url = this.element.attr("href")
}
LoadHtml.prototype = {
    constructor: LoadHtml,
    getServer: function (fn,el) {
        if(typeof(fn)  == "function"){
            $.get(this.url,function(response){

               $("#show_post").append($(response).find("div#show_post").children())
               fn()
            })
        }
    }
}

function AlterHtml(docObj) {
    this.docObj = $(docObj)
}
AlterHtml.prototype = {
    constructor: AlterHtml,
    removeHtml: function () {
        this.docObj.empty();
    },
    addHtml: function (html) {
        this.docObj.html(html)
    }
}

function ReadyPost() {
    var category_switch = $(".category_switch")
    var pushOrPull = new PullOrPush(".category_switch")
    var displayMode = new DisplayMode()
    category_switch.click(function () {
        if (pushOrPull.getStatus("glyphicon-arrow-left")) {
            pushOrPull.show(function (link) {
                displayMode.openUp()
            })

        } else {
            pushOrPull.hide(function (link) {
                displayMode.shutDown()
            })


        }
    })
    $("#category li a").each(function () {
        var hideOrShow = new PullOrPush("[href=" + $(this).attr("href") + "]")
        $(this).click(function () {
            if (hideOrShow.getStatus("marker_color")) {
                hideOrShow.show(function (link) {
                    link.addClass("marker_color")
                })
            } else {
                hideOrShow.hide(function (link) {
                    link.removeClass("marker_color")
                })
            }
        })
    })
    $("#posts ul li a").each(function () {
        var load = new LoadHtml(this)
        var html = new AlterHtml(".show_post")
        $(this).click(function () {
            $('.progress').show()
            html.removeHtml()
            displayMode.shutDown()
            load.getServer(function(){
                toggleDuoshuoComments("#show_post")
                $('.progress').hide()
            })

        })
    })
}
