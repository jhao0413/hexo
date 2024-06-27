---
title: Github无法访问问题解决
tags:
  - github
categories: github
abbrlink: 47938
date: 2020-01-31 10:00:00
expires: 2020-01-31 10:00:00
---

# Github竟拒我于门外

### 手机可以访问但电脑不可以？

至于为什么有了这篇帖子咱们还得从一只蝙蝠说起...

![](https://jhao413.oss-cn-beijing.aliyuncs.com/blog/17bf778d9f5e9a4eff93d7edc496dd1a.jpg)

从过年之后就再也没踏出过家门一步，吃了睡睡了吃的日子到了今天发现有一丝丝的颓废，于是满心欢喜的打开vs code写写代码，git命令到git push却发现无法提交。

于是我电脑尝试打开官网看看居然得到如下结果
![](https://jhao413.oss-cn-beijing.aliyuncs.com/blog/1.webp)
第一时间想到是不是要挂小飞机了，但是打开还是无济于事，抱着试一试的心态我用手机打开了GitHub的官网？？？手机没挂小飞机也能进？

### 解决办法

于是在网上找了各种办法，最后看到了一个靠谱的办法就是修改host文件（文件路径：C:\Windows\System32\drivers\etc\hosts）
将一下ip粘贴到hosts文件就可以了

```
192.30.253.113 github.com
192.30.253.113 github.com
192.30.253.118 gist.github.com
192.30.253.119 gist.github.com
```

与此同时问题就又来了，居然保存不了！他还给亲切的提示了你没有权限保存，请向管理员申请。自己管自己？![](https://jhao413.oss-cn-beijing.aliyuncs.com/blog/1.jpg)

各种说通过右键属性更改权限的办法都试了，但是都没用。

最后一个有效的办法就是右键win的图标，找到Windows PowerSheell（管理员）注意是**管理员**！然后输入"notepad hosts"即可编辑保存了。
到此这个问题就完美解决啦
