---
title: Github使用
tags:
  - Git
  - GitHub
  - 版本控制
categories: 开发工具
abbrlink: 60077
date: 2019-11-09 10:00:00
expires: 2019-11-09 10:00:00
---

# GitHub使用

### 什么是GitHub

GitHub是一个面向开源及私有软件项目的托管平台，因为只支持git 作为唯一的版本库格式进行托管，故名GitHub。作为开源代码库以及版本控制系统，Github拥有超过900万开发者用户。随着越来越多的应用程序转移到了云上，Github已经成为了管理软件开发以及发现已有代码的首选方法。
如前所述，作为一个分布式的版本控制系统，在Git中并不存在主库这样的概念，每一份复制出的库都可以独立使用，任何两个库之间的不一致之处都可以进行合并。（论百度百科的重要性）

### 创建仓库

1. [Github传送门](https://github.com)，进入网站注册账号，进入主页后，点击New，如下图![](/img/github/1.png)
2. 创建仓库，Repository name处写仓库名，然后创建即可

### 安装git

1. [git下载传送门](https://git-scm.com/downloads),下载完成后一路next即可
2. 安装成功后，打开Git Bash会弹出一个类似于命令的窗口，安装成功后在窗口输入

```
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"
```

你的名字和邮箱

### 创建本地仓库

1. 创建一个空文件夹然后输入

```
$ mkdir learngit
$ cd learngit
$ pwd
```

learnfit就是你之前在GitHub创建的仓库名
2. 通过git init命令把这个目录变成Git可以管理的仓库

```
$ git init
```

3. 这时候在空目录下创建一个readme.txt,内容随意，规范一下可以写成

```
Git is a version control system.
Git is free software.
```

4. git add,把文件添加到仓库

```
$ git add readme.txt
```

5.git commit，将文件提交到仓库

```
$ git commit -m "wrote a readme file"
```

-m后面输入的是本次提交的说明，可以输入任意内容

### 远程仓库

1. 创建ssh key

```
$ ssh-keygen -t rsa -C "youremail@example.com"
```

记得把邮箱改成自己的，然后再用户目录就应该可以找到.ssh的文件夹（主用户目录：C盘下用户的文件夹，然后打开你用户名的文件夹），里面有id_rsa和id_rsa.pub两个文件，这两个就是SSH Key的秘钥对，id_rsa是私钥，不能泄露出去，id_rsa.pub是公钥，可以放心地告诉任何人。

2. 填写ssh key
   登陆GitHub，点击setting，打开“SSH Keys”页面：然后，点“New SSH Key”，填上任意Title，在Key文本框里粘贴id_rsa.pub文件的内容。![](/img/github/2.png)
   现在就可以从这个仓库克隆出新的仓库，也可以把一个已有的本地仓库与之关联，然后，把本地仓库的内容推送到GitHub仓库。
   3.现在在本地仓库运行命令

```
$ git remote add origin git@github.com:username/xxx.git
```

username改成自己的用户名，git就是你刚刚创建的仓库名（其实这些命令创建仓库后GitHub就会提示你）

```
$ git push -u origin master
```

这样就推送完成了，以后的上传分为git add，git commit，git push

我讲的没有那么详细也可以看看[廖雪峰Git教程](https://www.liaoxuefeng.com/wiki/896043488029600)
