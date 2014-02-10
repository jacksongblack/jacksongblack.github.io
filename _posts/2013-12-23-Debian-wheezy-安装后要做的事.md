---
layout: post
category: Linux
---

### 更换源，并安装中文字体和输入法

   1. 编辑 `/etc/apt/source.list`, 加入以下内容

        deb http://mirrors.ustc.edu.cn/debian/ wheezy main non-free contrib
        deb-src http://mirrors.ustc.edu.cn/debian/ wheezy main non-free contrib

   2. 执行如下命令, 然后重启系统

        aptitude update
        aptitude install ttf-wqy-microhei ttf-wqy-zenhei fcitx fcitx-pinyin

### 安装常用软件

    sudo aptitude install sudo zsh axel tmux tree ntp subversion git-core chromium

### 配置 sudo

   编辑文件 `/etc/sudoers`, 添加如下内容

    tangjiujun ALL=(ALL:ALL) ALL

### 配置 zsh

    git clone https://github.com/robbyrussell/oh-my-zsh.git .oh-my-zsh
    cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
    chsh -s /bin/zsh    # 注销后生效

### 安装 Flash

    wget http://211.162.175.14/download/128566/134325/7/gz/183/135/1365813701559_903/install_flash_player_11_linux.x86_64.tar.gz
    tar zxvf install_flash_player_11_linux.x86_64.tar.gz
    sudo cp libflashplayer.so /usr/lib/mozilla/plugins/
    sudo cp -r usr/* /usr/
    
------

### 安装 Emacs

   1. 添加 emacs-snapshot 源，在 `/etc/apt/source.list` 中加入：

        deb http://emacs.naquadah.org/ stable/
        deb-src http://emacs.naquadah.org/ stable/

   2. 执行如下命令
   
        wget -q -O - http://emacs.naquadah.org/key.gpg | sudo apt-key add -
        sudo aptitude update
        sudo aptitude install emacs-snapshot

### 安装 WPS For Linux

   1. 在 `http://community.wps.cn/download/` 下载 `wps-office*_i386.deb`
   2. 安装

        sudo dpkg --add-architecture i386
        sudo apt-get update
        sudo aptitude install ia32-libs ia32-libs-gtk libfreetype6
        sudo dpkg -i wps-office*_i386.deb
