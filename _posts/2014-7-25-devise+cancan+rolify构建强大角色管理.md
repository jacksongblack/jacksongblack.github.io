---
layout: post
category: rails
title: devise+cancan+rolify构建强大角色管理
describer: 摘录三个工具在rails项目中的使用
---
## devise+cancan+rolify构建强大角色管理
原文地址:[我是连接](http://my.oschina.net/silentboy/blog/204772)</br>
原文中有些问题，我按自己的实践稍稍做了些修改。不知到是不是Gem升级到最新的缘故，不过还是解决了。

devise、cancan和rolify这三个组件结合，可以建立完整而强大的用户权限模型。

* devise介绍，负责用户注册、登录、退出、找回密码等操作。细节参考devise on github
* cancan介绍， 负责角色建立、对角色授权、在页面中根据授权是否显示元素，以及模型中超出授权时抛出异常。细节参考rolify on github
* rolify介绍，负责将用户与角色关联。细节参考rolify on github
下面就简单介绍下这三者结合使用的方法，比较浅，深层次的大家自己去看文档挖掘，这里仅仅介绍最基本的使用。

运行环境

* 这里我用的是ruby 1.9.3-p484       rails   3.2.16

新建一个项目

    rails new demo --skip-bundle   #跳过bundle

在Gemfile里面添加如下Gem包

    # add a perfect user verify system
    gem 'devise'
    gem 'cancan'
    gem 'rolify'
然后运行`bundle install`

执行devise初始化</br>

`rails generate devise:install`

这句命令会产生一个用户指南，告诉你该做的几件事请，以下是内容翻译（已经去除heroku部署的那一条，增加了登录退出选项的说明）：

* 1) 确定你的环境中有一个缺省的URL，config/environments/development.rb:

* config.action_mailer.default_url_options = { :host => 'localhost:3000' }
如果在production环境, :host 必须设置成应用的真实主机名。

* 2) 确定已经在config/routes.rb中定义了root_url（注意删除public下面的index.html）, 例如：

* root :to => "home#index"
可以使用下面命令生成一个home#index的页面：

    rails g controller home index

* 3) 在app/views/layouts/application.html.erb中增加消息提醒，例如：

    <p class="notice"><%= notice %></p>  <p class="alert"><%= alert %></p>

* 4) 很多时候还需要增加登录、退出的选项：

    <% if current_user %>
    <%= link_to('退出', destroy_user_session_path, :method => :delete) %>
    <%= link_to('修改密码', edit_registration_path(:user)) %>
    <% else %>
    <%= link_to('注册', new_registration_path(:user)) %> |
    <%= link_to('登录', new_session_path(:user)) %>
    <% end %><span></span>
5) 如果要定制Devise的view模型，可以再执行以下语句：

    $ rails g devise:views

生成用户模型（你可以使用其他名称代替User）,并执行数据迁移

    $ rails g devise User
    $ rake db:migrate
 在Controller中增加认证过滤，即可在访问该模型页面时转向用户登录页面（这自行没验证）

在需要认证的模型中，如HomeController，增加下面代码：

    before_filter :authenticate_user!

集成cancan和rolify
cancan提供对资源的授权控制。例如，在视图中使用can?方法来决定是否显示某个页面元素。如果系统角色非常简单，那么cancan还在代码中直接指定常量就可以支持，具体操作可以参考官方文档。但要提供复杂的角色管理，最好的方案，还是在devise基础上再集成cancan+rolify。

* 1. 修改Gemfile，并再次运行bundle install

    gem 'cancan'
    gem 'rolify'

* 2. 创建cancan的Ability和rolify的Role
    rails generate cancan:ability
    rails generate rolify Role User
    rake db:migrate

* 3. 定制devise用户注册事件，可以在注册时赋予用户rolify角色，例如，下面的代码为首个用户赋予admin角色：

    class ApplicationController < ActionController::Base
    def after_sign_in_path_for(resource)
       if resource.is_a?(User)
         if User.count == 1
           resource.add_role 'admin'
         end
         resource
       end
       root_path
     end
   end
* 4. 使用cancan可以为rolify中建立的角色分配授权资源，例如我们为允许admin角色的用户分配针对所有控制类的”manage”资源，而其他用户分配”read”资源：

    class Ability
     include CanCan::Ability
     def initialize(user)
       if user.has_role? :admin
         can :manage, :all
       else
         can :read, :all
       end
     end
   end

* 5. 以上已经实现了“用户－角色－权限”的三层权限模型，在view中就可以使用了。例如，在Home#index页面中增加如下代码：

    <% if user_signed_in? %>
        <p>The user is loged in.</p>
        <% if can? :manage, :Home %>
          <%= link_to "About", home_about_path   %>
        <% end %>
    <% end %>

(完）