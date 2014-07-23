/**
 * Created by jack on 14-7-18.
 */
describe("实例坦克模型对象",function(){
    var state = {
        x:1,
        y:2,
        color:"red",
        speed:12
    }

  it("实例一个坦克对象",function(){
      var context = jasmine.any(Object)
      var tank = TankRender(context,state)
        expect(tank).toBe(TankRender)
    })


})