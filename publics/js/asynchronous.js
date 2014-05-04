function LoadHtml(element){
    this.element = $(element)
    this.url = this.element.attr("href")
}
LoadHtml.prototype = {
    constructor:LoadHtml,
        getServer:function(fn){
        $.get(this.url,fn)
    }
}

function AlterHtml(docObj){
    this.docObj = $(docObj)
}
  AlterHtml.prototype = {
      constructor:AlterHtml,
      removeHtml:function(){
          this.docObj.empty();
      },
      addHtml:function(html){
          this.docObj.html(html)
      }
  }