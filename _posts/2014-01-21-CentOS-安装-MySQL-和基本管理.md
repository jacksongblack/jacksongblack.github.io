---
layout: post
category: Linux
---

### 安装 MySQL

    sudo yum install mysql-server mysql-devel
    service mysqld start

### 初始化配置

  * 执行 `mysqladmin -u root password '123456'` 设置 root 密码
  * 执行 `mysql_secure_installation` 进行初始化操作

### 设置编码为 utf8

  编辑 `/etc/my.cnf` 文件：

    [client]
    default-character-set=utf8
    ...

    [mysqld]
    default-character-set = utf8
    ...

    [mysql_safe]
    default-character-set = utf8
    ...

  保存后：

    service mysqld restart
    # 重启 mysqld 后使用 root 用户登录
    mysql -uroot -p

    # 查看字符编码
    mysql> show variables like "%char%";
    +--------------------------+----------------------------+
    | Variable_name            | Value                      |
    +--------------------------+----------------------------+
    | character_set_client     | utf8                       |
    | character_set_connection | utf8                       |
    | character_set_database   | utf8                       |
    | character_set_filesystem | binary                     |
    | character_set_results    | utf8                       |
    | character_set_server     | utf8                       |
    | character_set_system     | utf8                       |
    | character_sets_dir       | /usr/share/mysql/charsets/ |
    +--------------------------+----------------------------+

