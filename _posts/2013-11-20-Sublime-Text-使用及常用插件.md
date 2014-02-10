---
layout: post
category: Tools
---

### 安装 Package Control
按下 `Ctrl + ``, 输入如下内容后回车，然后重启软件：

    import urllib2,os; pf='Package Control.sublime-package'; ipp = sublime.installed_packages_path(); os.makedirs( ipp ) if not os.path.exists(ipp) else None; urllib2.install_opener( urllib2.build_opener( urllib2.ProxyHandler( ))); open( os.path.join( ipp, pf), 'wb' ).write( urllib2.urlopen( 'http://sublime.wbond.net/' +pf.replace( ' ','%20' )).read()); print( 'Please restart Sublime Text to finish installation')

### 常用插件
   1. `sublemacspro` 绑定 Emacs 快捷键

### 一些快捷键

    
    Ctrl + Shift + F   # 打开文件夹搜索或替换
    Alt + R            # 当前文件搜索或替换
