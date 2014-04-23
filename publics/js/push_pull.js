function PullOrPush(docment){
    this.link = $(docment)
    this.element = $(this.link.attr("href"))
}

PullOrPush.prototype = {
 constructor: PullOrPush,
 show:function(fn){
  this.element.removeClass("hide")
     if(typeof(fn) =="function"){
         fn(this.link,this.element)
     } ;
 },
 hide:function(fn){
     this.element.addClass("hide");
     if(typeof(fn) =="function"){
         fn(this.link,this.element)
     } ;
 },
 getStatus:function(){
  var str = this.element.attr("class")
  try {
      var status =  str.match("hide")
  }catch(error){
      console.log(error)
  }

  if (status == null){
      return false
  }else{
      return true
  }

 }
}