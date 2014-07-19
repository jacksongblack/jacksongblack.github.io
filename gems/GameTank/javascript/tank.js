/**
 * Created by jack on 14-7-18.
 */




function TankModel(context, tankstatus) {
    if (this instanceof TankModel) {
        this.context = context
        this.x = tankstatus.x
        this.y = tankstatus.y
        this.color = tankstatus.color
    } else {
        return new TankModel(context,tankstatus)
    }
}

TankModel.prototype = {
    constructor: TankModel,
    down: function () {
        this.context.fillStyle = "#BA9658"
        this.context.fillRect(this.x, this.y, 5, 30)
        this.context.fillRect(this.x + 15, this.y, 5, 30)
        this.context.fillRect(this.x + 6, this.y + 5, 8,20)
        this.context.fillStyle = this.color
        this.context.arc(this.x + 10, this.y + 15, 4, 0, 360, true);
        this.context.fill();
        this.context.strokeStyle = "#FEF26E";
        this.context.lineWidth = 1.5;
        this.context.beginPath();
        this.context.moveTo(this.x + 10, this.y + 15);
        this.context.lineTo(this.x+10,this.y+30)
        this.context.closePath()
        this.context.stroke();
    },
    up:function(){
        this.context.fillStyle = "#BA9658"
        this.context.fillRect(this.x, this.y, 5, 30)
        this.context.fillRect(this.x + 15, this.y, 5, 30)
        this.context.fillRect(this.x + 6, this.y + 5, 8,20)
        this.context.fillStyle = this.color
        this.context.arc(this.x + 10, this.y + 15, 4, 0, 360, true);
        this.context.fill();
        this.context.strokeStyle = "#FEF26E";
        this.context.lineWidth = 1.5;
        this.context.beginPath();
        this.context.moveTo(this.x + 10, this.y + 15);
        this.context.lineTo(this.x+10,this.y)
        this.context.closePath()
        this.context.stroke();
    }
}

var canvas = document.getElementById("playGame")
var gem = {
    init: function () {
        var context = canvas.getContext("2d")
        var radTank = {x:12,y:12,color:"red"}
        var tank =  TankModel(context,radTank)
        console.log(tank.down())
    }
}
gem.init()