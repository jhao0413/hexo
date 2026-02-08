---
title: fedora折腾笔记
date: 2026-02-08 13:34:14
tags:
  - Linux
categories: Linux
abbrlink: 2026-02-fedora
---

### 安装体验

与manjaro差别不大，基本都是无脑下一步就行

与fedora42相比还要更好一些，不知道是不是我之前安装的有问题，这次没有锁屏之类的问题出现，系统也内置的ibus输入法，不用自己从零折腾

系统还是一如既往的流畅，等后续再到实际工作中体验一下再做总结

### 软件安装与好用的工具

* dnf
* corp
* flathub
* appimage
* 软件提供的rpm安装包

软件相比于arch的aur来说感觉差不多？目前没有碰到fedora安装不了的(主要还是多亏了appimage)

#### flameshot

> 不能说是多好用，算是踩了不少坑

主要flameshot软件本身的功能丰富：钉图、获取颜色、标注等等，目前还没找到一个软件就能代替的方案

同时它也存在非常多的问题，可能是linux的分支太多了，官方出的新版本总是有这样那样的问题（不能把图片复制到剪切板、缩放问题、无法截图的问题）

这里就不得不提到我在装manjaro的时候，阴差阳错的找到一个完美版本 12.1.0

```bash
# 回退到12.1.0版本，只有这个版本是ok的
sudo flatpak update --commit=d5fb2b6b8492ee47d35d8f87c27da3de184ff03a6f1b86335fa1f7c740965d20 org.flameshot.Flameshot
# 锁定版本，避免升级
flatpak mask org.flameshot.Flameshot 
# 另外还需要重启电脑
```
快捷键绑定flatpak run org.flameshot.Flameshot gui命令就行，一切正常

#### ibus、ibus-rime

内置的ibus挺好用的，就是词库和词频有点太难用了，ibus-rime就能很好的解决这个问题，默认是繁体，按f4可以切换

另外很是推荐[雾凇拼音](https://github.com/iDvel/rime-ice)，大大优化了输入体验

#### gear-lever

管理appimage不要太好用

#### winboat

在docker中运行一个windows，manjaro中更新后有问题了，修复比较麻烦就一直放着了，也一直没什么必须要windows的情况，就记录一下吧

#### 美化

https://www.youtube.com/watch?v=uUg6OEswN9E&t=565s 推荐看这个视频操作，这个博主的内容基本都是linux美化相关

