---
title: rails&mongoid配置问题记录
category: 后台技术
layout: post
---

### 记录在rails4中使用mongodb遇到的坑

  最近想做个站点，以前一直用mysql数据库，听说现在很流行mongodb，很多站点都用了这个非关系数据库（no-sql），自己也想试试，
到底好不好用。于是在我新做的rails project中运用这个，正好rails4也出了，所以决定采用 rails 4 + mongoid方式试试
首先是mongoid版本问题，首先新建工程的时候，不要默认使用ActiveRecord这样会创建默认的数据库sqlite，会造成很多配置问题，
如果你不想遇到这么多坑，还是按标准来做吧

    rails new app_name -O

现在mongoid只有github上的才有用（现在只有beta版本支持rails4），所以要在GemFile里面加上下面信息

    ./Gemfile
    gem 'mongoid', github: 'mongoid/mongoid'
    gem 'bson_ext', '~> 1.8.6'

如果有github连接超时（timeout）最好还是clone git上的仓库

    $ git clone git@github.com:mongoid/mongoid.git
    $ cd mongoid
    $ gem build mongoid.gemspec
    #注意安装过程会出现某些GEM没有安装，按照提示安装便可
    $ gem install mongoid-x.x.x.bate

现在生成配置文件

    $ rails g mongoid:config

我在这一步遇到个问题，rails 项目在require "sprockets/railtie"发生语法错误，运行bundle install时 提示运行 gem pristine --all
这是用rvm设置gemset时，出现gem版本错误 运行这条命令后，恢复版本错误问题后，rails4不报语法错误了。解决时候注意手动安装
没有安装或默认cache地址找不到的GEM
