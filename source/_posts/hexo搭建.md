---
title: Hexo博客搭建
tags:
  - Hexo
categories: Hexo
thumbnail: 'https://evan.beee.top/img/208184324-f2640ade-587a-4f46-8ad1-7b4c1b31394f.png'
cover: 'https://evan.beee.top/img/208184324-f2640ade-587a-4f46-8ad1-7b4c1b31394f.png'
abbrlink: 41646
date: 2020-02-27 10:00:00
expires: 2020-02-27 10:00:00
---

## 为什么选择Hexo

之前我也试过其他的博客系统，例如：typecho，wordpress等等，但是因为之前是高中，
也没有太多的精力去打理，这些博客都需要你有一台服务器或者是虚拟主机，还要一个域名。
自己没钱一下买一两年（当时也没必要，也不写啥东西）但是后来准备写的时候发现已经过期了。
重新买回来之后还是要重装一遍，而且之前的数据也没有了，但是hexo就不需要考虑这些啦。
你只需要在GitHub上有一个账号就足以。

## Hexo是什么

Hexo 是一个快速、简洁且高效的博客框架。Hexo 使用 Markdown（或其他渲染引擎）解析文章，在几秒内，即可利用靓丽的主题生成静态网页。

## Hexo搭建

### 1、安装git

windows：到git官网下载安装即可，[Download git](https://git-scm.com/downloads)，
下载安装成功后鼠标右键就可以看到有Git Bash的命令行工具，以后使用git都在这进行。
安装成功后可以使用git --version查看git版本。(别的系统我也没用过，就只讲windows啦)

### 2、安装Nodejs

[Node.js下载地址](http://nodejs.cn/download/)，根据需要下载安装即可，安装完成之后可以打开命令行

```
node -v
npm -v
```

可以检查一下是否安装成功，安装成功会显示版本号

### 3、安装hexo

首先创建一个文件夹，名字随意我这里就文件夹的名字就以blog来说了，打开你创建的文件夹，
右键点进git bash，输入以下命令

```
npm install -g hexo-cli
```

安装完后一样可以通过

```
hexo -v
```

查看是否安装成功

初始化hexo

```
hexo init blog
```

这里的blog是在你刚刚创建的blog文件夹的子文件夹，名字随意
接下来

```
cd blog
npm install
```

完成后大概会有以下文件，我的可能会多几个，不要在意，我后面又搞了其他东西

![](https://jhao413.oss-cn-beijing.aliyuncs.com/blog/20200227161239.png)

接着继续命令行里输入

```
hexo -g
hexo server
```

hexo -g意思是生成静态文件
hexo server启动服务
CTRL+c关闭服务
这时候浏览器输入localhost:4000就可以看到博客啦

### 4、注册GitHub创建仓库

[GitHub](https://github.com/)没有账号的话赶快去注册一个吧，
注册成功后创建一个仓库

![](https://jhao413.oss-cn-beijing.aliyuncs.com/blog/20200227161927.png)

![](https://jhao413.oss-cn-beijing.aliyuncs.com/blog/20200227162056.png)

仓库的名字不能随意写，username.github.io,username是你的用户名，写完后点击Create repository

### 5、将SSh添加到GitHub

在命令行中输入以下内容（别照抄直接回车！）

```
git config --global user.name "name"
git config --global user.email "email"
```

name是你GitHub的用户名，Email是你GitHub的邮箱
然后创建ssh，一直回车就好了

```
ssh-keygen -t rsa -C"email"
```

这里的Email和上面的同理
现在你的电脑里就有一个.ssh的文件夹

![](https://jhao413.oss-cn-beijing.aliyuncs.com/blog/20200227162818.png)

id_rsa是电脑的私人密钥，id_rsa.pub是公共密钥，当然是用公共密钥啦，现在将id_rsa.pub的内容复制到GitHub，
GitHub中在右上角打开setting，里面有SSH and GPG keys点击后new一个，名字随意

![](https://jhao413.oss-cn-beijing.aliyuncs.com/blog/20200227163223.png)

在gitbash中检查是否安装成功

### 6、将hexo部署到GitHub

这时候打开刚刚的文件夹找到配置文件_config.yml，文件的最后修改为如下内容

```
deploy:
  type: git
  repo: https://github.com/UserName/UserName.github.io.git //username是你的用户名
  branch: master
```

这里有两种方式一种是https一种是.git的方式，第一种每次需要输入用户名密码，第二种不需要。
现在安装部署命令

```
npm install hexo-deployer-git --save
```

现在只要依次执行以下命令即可

```
hexo clean
hexo g
hexo d
```

hexo c(clean)清除你之前生成的东西，最好每次清理一下，以免发生不必要的错误
hexo g(generate)生成静态文件
hexo d(deploy)部署文章
最后出现INFO Deploy done:git就是部署成功了。现在打开http://username.github.io
（username是你的用户名）就可以看到你的博客啦
你的博客就成功部署了
关于hexo的更多操作可以加我询问哈~
