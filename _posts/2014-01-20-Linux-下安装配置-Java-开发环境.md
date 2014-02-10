---
layout: post
category: Java
---

### 安装 JDK

   1. 下载并解压对应版本的 JDK，如： jdk-7u45-linux-x64.tar.gz
   2. 解压并移动

        tar zxvf jdk-7u45-linux-x64.tar.gz
        sudo mkdir /usr/local/lib/jvm
        sudo mv jdk1.7.0_45 /usr/local/lib/jvm/java-7-sun

   3. 编辑 `/etc/profile`, 添加如下内容：
   
        export JAVA_HOME=/usr/local/lib/jvm/java-7-sun
        export JRE_HOME=${JAVA_HOME}/jre
        export CLASS_PATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib
        export PATH=${JAVA_HOME}/bin:$PATH


