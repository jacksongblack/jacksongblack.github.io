function LoadHtml(element){
    this.element = element
    this.url = this.element.attr("href")
}
LoadHtml.prototype = {
    constructor:LoadHtml,
    get:function(fn){
        $.get(this.url,{},fn(data,textStatus))
    }
}