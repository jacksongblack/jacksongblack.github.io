---
category: 后台技术
layout: post
title: Django的auth认证模块API内建方法说明
describer: 最近做认证时候使用的Django自建权限认证auth/auth方法API总结
---

## Django的auth模块API内建方法说明
----------------------------------

一个站点或是系统，总会做一个用户权限管理的东西，既然总在重复实现，那么总有人会把这些“轮子”先造好，方便后人的使用
Django就是这样的，在django核心模块中auth/auth模块是核心模块之一,这篇文章主要在这次实践中一些积累。

### 先从数据模型说走


django权限模块相关的表一共有9张数据表，其中三张是做多对多的关联中间表，下面分别说明每张表的作用


一.auth_permission 权限表这张表有4个字段，分别是ID，name,content_type_id,codename


* 1.ID 唯一标识位
* 2.name 权限名称
* 3.content_type_id 内容类型关联字段，与auth_content_type这张表相关联，主要说明是这个权限和什么有关一般是数据库中的表名
* 4.codename  认证模块所使用的关键字，在使用permission_required()这样的装饰器方法使用。后面我讲具体将permission_required方法的具体使用，


二.auth_user 用户的主表，字段比较多,我就捡说比较重要的地方


* 1.ID 唯一标识位
* 2.username 用户名
* 3.is_superuser 是否具有admin管理界面，超级管理员权限字段
* 4.is_active 是否在线字段 
* 5.is_staff 系统用户字段


三.auth_group 用户组表

* 1.ID 唯一标识位
* name 组名

关于权限这块主表说完,有三张关联表，分别是auth_group_persitions,user_groups,user_persitions,看表名就知道他们关联的是谁，
而其他表比如auth_sission是登录的用户会话表，看看表名大多知道是做啥的了，

### 现在说明权限管理的几个内建方法

一.用户实例方法（user instance method）


用户权限

    youUserObejct.permisstions = [permisstionObj,permisstionObj] ##增加用户的权限
    youUserObejct.permisstions.add(permisstionObj) ## 增加用户的权限
    youUserObejct.permisstions.remove(user_permisstionsObj) ##删除用户的权限
    youUserObejct.permisstions.clear() ##删除用户的所有权限
    youUserObejct.get_all_permisstions(obj_None) ##删除用户的所有权限


用户分组

    youUserObejct.groups = [groupObj,groupObj] ##增加分组
    youUserObejct.groups.add(groupObj) ##增加分组
    youUserObejct.groups.remove(groupObj) ##删除分组
    youUserObejct.groups.clear() 删除用户所有分组


组权限

    goupObj.permisstions = [permisstionObj,permisstionObj] 
    goupObj.permisstions.add(permisstionObj)
    goupObj.permisstions.remove(permisstionObj)
    goupObj.permisstions.clear()

权限验证

    youUserObejct.has_perm(perm,obj=None) #检查用户是具有某项权限
    youUserObejct.has_perms(perm,obj=None) #检查用户是具有多项权限
    youUserObejct.get_group_permisstions(obj_None) ##返回用户组所有权限

密码控制

    youUserObejct.check_password(raw_password) #检查密码是否正确
    youUserObejct.set_password(raw_password)#重设密码

二.装饰器(decorator)

  登录验证装饰器用于usrls.py
  
    from django.auth.decorators import login_required 
    from django.conf.urls import patterns,url
    urlpatterns = patterns("",
                          url(r'url',login_required(you_function,login_url="you_login_url"))
 
 用于方法

    @login_required(login_url="you_login_url")
    def you_function():
        pass

 权限验证

    from django.auth.describer import pamasstion_required
    from Django.utils.decorators import method_decorator
    
    ## 如果你是想在实例方法中使用装饰器，需要用method_decorator,因为在定义的时候，类方法还没有，是要实例后才能使用
   
    @method_decorator(pamasstion_required("codename",login_url="you_login_url"))
    def you_function():
        pass

    or
    
    @method_decorator(user_passes_test("codename",login_url="you_login_url"))
    def you_function():
        pass                   
(完)
                           

