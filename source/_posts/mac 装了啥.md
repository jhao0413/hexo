---
title: 'mac 装了啥'
tags:
  - mac
categories: mac
abbrlink: mac-installed
date: 2026-07-18 13:47:43
---

5 月 7 号买的 mac mini 终于是到了，记录一下目前装了哪些软件。

### 系统工具
- moel 不错的清理软件，当时早鸟价买了一个，也有对应的开源 cli 和其他类似的项目，除了清理还有很多其他实用的小功能
- espanso 文本替换，如 :phone 自动替换自己的邮箱
- keka 解压缩
- mos 让鼠标滚动更顺滑，提升是比较明显的
- mac-mouse-fix 好像都可以代替mos了，而且扩展了鼠标的操作非常好用 
- pixpin 截图
- 微信输入法 无需多言，确实好用，我没有隐私
- clash-verge 已经能满足我的需求了，没太 get 到用 surge 能解决我的什么的问题，而且 surge 有点贵
- easydict 差点就买bob了，发现easydict基本功能都有还开源免费就换过来了
- betterDispay 神中神了，接了自己的2k显示器之后，发现字体和布局都变得特别小，还不能像windows一样改缩放比例，这个软件实在是救命了，同类型的还有one-key-hidpi（但看issue说不支持M芯片的mac，就没尝试了）

### AI
基本都是常见的了
- claude
- codex
- cc-switch
- hanako
- zap 终端目前主要用这个，根据warp二开的版本，可以接自己的模型，还是比较方便的
- cursor 配合工具可以接自己的模型

### 其他补充
- [clash rules](https://ruleset.skk.moe/List/non_ip/ai.conf)

**调快程序坞呼出速度命令**

```shell
defaults write com.apple.dock "autohide-delay" -float "0" && killall Dock
```