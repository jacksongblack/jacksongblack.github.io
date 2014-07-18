---
layout: post
category: 运维
title: 一次坑爹的ubuntu-sudores修复过程
describer: 通过这次修复，掌握ubuntu修复模式的使用和在双系统下注意点
---
# 一次坑爹的ubuntu-sudores修复过程
![](/publics/images/blog_images/2014-7/ubuntu.png)</br>

由于每次我在使用 `sudo command`时候总是要输入我现在用户密码，我觉得很麻烦，于是想通过修改`/etc/sudores`文件设置
用户不需要输入密码即可使用`sudo`。可以当我保存退出准备运行 `sudo chmod -w /etc/sudoers`时候，悲剧出现了，系统报
sudores文件语法错误，我又试试`sudo`权限下其他命令，全是这个错，这下sudo权限不能使用了。

## 解决过程

于是我开始在网上找解决办法，发现网上很多东西和我遇到情况不符合，现在网络全是copy之作，可能作者自己都没实验过。现在我把我自己
解决过程记录下来，为大伙找个经过实践的解决方法

### 1.我的环境

我使用的环境是win8 + ubuntu 12.04 在使用UBUNTU之前我安装过kylin版，后来覆盖安装，我的grub安装在ubuntu根目录下分区上。

### 第一个问题怎么进修复模式菜单

国内网上说用shift键，但是我电脑上没用，我用的是Esc键

### 2.问题二system file only-read

这是由于在修复模式下，挂载系统是只读的状态我们需要重新挂载一下，使用命令`mount -o remount,rw /`可以重新挂载。还有给sudores
加个可写入权限，`chmod +w /etc/sudores`

### 3.问题三 vi command not found

这是最坑爹，vi命令找不到，国内的大哥没几个遇到，后来还是google外国人的答案了解一点线索。方式是在进入recovery model 模式后，在菜单中
使用`grub-update`重新引导下，就可以使用了。

### 4.怎么修改的sudores语法篇

    # Allow members of group sudo to execute any command
    %sudo   ALL=(ALL:ALL) ALL
    yourname    ALL=(ALL)  NOPASSWD:ALL //加入这里

后来我发现，我主要是把`NOPASSWD：ALL`这句写成了`NOPASSWORD:ALL`

### 5.结尾

  最后记得改回sudores的权限，`chmod +w /etc/sudores`

## 总结

  经过这么一劫，我想说明以后在使用linux系统中，最好注意几点

*  1.所有文本在修改前最好备份(吃过不少亏了)
*  2.还是要给root用户设置密码，不然本来可以在root下解决的问题需要在recovery model

(完)


