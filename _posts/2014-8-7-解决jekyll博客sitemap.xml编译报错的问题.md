---
category: 前端技术
layout: post
title: 解决jekyll博客sitemap.xml生成时的错误
describer: 在写自己网站的sitemap.xml时，老是xml entityref expecting错误
---

# 解决jekyll博客sitemap.xml生成时的错误

&emsp;&emsp;最近在写jekyll时候，发现生成sitemap.xml总是报错`xml entityref expecting：`网上搜索下，
发现关于这个问题的处理不在少数，发现是jekyll使用的拼接器出现语法错误，由于我一般使用中文，
中文就会出现很多特殊字符，一般外国人写的拼接器都有问题，不过我在[jekyll](http://jekyllrb.com/docs/templates/)
官方上发现一个逃避方法

    { { page.content | xml_escape  } }

其实我以前用这个但是没有去转意url，后来转意URL后，github上就没有问题，还有这个问题在本定 运行`jekyll server --watch`
和`jekyll build `都没问题,放上github就报错，猜测是因为上面运用了更严苛的问题。
(完)