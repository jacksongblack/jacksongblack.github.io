---
title: apache+nginx+php+linux均衡配置实战
category: 运维
layout: post
describer: 用apche将php运行起来，再用nginx做均衡负载，php的内容转交apahce，静态文件nginx处理
---

最近项目中用到了discuz做社区，discuz是php写的，官方指导配合的是apache，具体配置，大家百度一下就知道，
在我的项目中我使用的python + nginx配置，为了提高整站的处理能力，索性将discuz部署成单独的运用，只用nginx做代理，
现贴出我的配置说明

    server {
        listen       80;
        server_name  bbs.xxxxx.com;
        ssi on;
        ssi_silent_errors on;
        ssi_types text/shtml;
        fastcgi_temp_file_write_size 128k;
        fastcgi_intercept_errors on;
        #host and port to fastcgi server

        root /var/www/bbs;
        index index.php index.html;
         # css, js 静态文件设置有效期1天
        location ~ .*\.(js|css)$ {
           access_log off;
           #expires      1d;
        }
         # 图片设置有效期3天
        location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$ {
          access_log off;
          #expires      3d;
      }

        location ~ \.php$ {
              proxy_set_header X-Real-IP  $remote_addr;
              proxy_set_header X-Forwarded-For $remote_addr;
              proxy_set_header Host $host;

              proxy_pass http://127.0.0.1:8082;
        }

        location @proxy {
              proxy_set_header Host $http_host;
              proxy_set_header X-Real-IP $remote_addr;
              proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

              proxy_pass http://127.0.0.1:8082;
        }
        access_log    /var/log/nginx/bbs.log;
    }

这里比较有意思的是关于.php过滤这段，只要判断url中有.php就直接交给apache处理
