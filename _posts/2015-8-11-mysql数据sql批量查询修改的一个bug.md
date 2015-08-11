---
layout: post
title: mysql同表查询时BUG
category: 后端技术
describer: mysql如果查询同表并更新数据会抛错
---
## mysql同表查询更新操作时的bug

  今天在写一段sql时，发现抛出`You can't specify target table 'O2O_User' for update in FROM clause`的错误，字面上意思就是
不能在同一张表修改更新代码！而且这样的bug只会在mysql中出现。现在张贴下员原代码

    UPDATE O2O_User SET id = null WHERE id IN (SELECT id FROM O2O_User GROUP BY count（*）>1)

但是很遗憾这样做的结果会在mysql会抛出错误，mysql中只有加入别名才能让这个代码正确

    UPDATE O2O_User SET id = null WHERE id IN (SELECT id FROM O2O_User GROUP BY count（*）>1 as ID)
    
