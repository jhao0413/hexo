---
title: Sunshine + Moonlight 串流操作记录（一）
tags:
  - Software
categories: Software
abbrlink: sunshine-and-moonlight-streaming
date: 2024-11-20
---

## 前言

之前一直觉得串流什么的搞得很麻烦，而且实现了也接受不了那个延迟和清晰度。

直到我最近研究平板远程电脑的时候，看到了网易的 GameViewer， 因为还在宣传阶段，所以没有收费功能，而且远程和串流的效果都很不错，这就拿来试试！

体验了一下之后发现效果确实不错，体验相当好，因为是同一局域网内，所以延迟基本忽略不计，而且清晰度也很顶。但串流当电脑的扩展屏这功能还是算了，每次串流都要做很多操作，而且还存在不显示鼠标、部分功能遮挡画面的问题。

不行还是折腾一下吧，平板做扩展屏也很香呐。

## 功能介绍

[Sunshine](https://github.com/LizardByte/Sunshine) + [Moonlight](https://github.com/moonlight-stream/moonlight-qt) 本来是一种游戏串流的解决方案，玩家只需在电脑上运行 Sunshine 服务端，并在平板或手机上使用 Moonlight 客户端，即可通过流式传输连接电脑并游玩游戏。如果再加上一块虚拟显示器，将虚拟屏幕显示在平板上，就能让平板作为电脑的扩展屏使用。

## Sunshine 的安装和配置

可以在 [GitHub Release](https://github.com/LizardByte/Sunshine/releases) 或 [官网](https://app.lizardbyte.dev/Sunshine/?lng=en#Download) 中下载 Sunshine， 以下为 Windows 11 演示。

1. 在 Sunshine 的 [Github Release](https://github.com/LizardByte/Sunshine/releases)中选择最新版本，下载 sunshine-windows-installer.exe。

![Sunshine Download](https://jhao413.oss-cn-beijing.aliyuncs.com/20241120201525.png)

2. 安装完成后，在状态栏中找到 Sunshine 的图标，右键点击 Open Sunshine, 浏览器会打开 https://localhost:47990 ,设置用户名密码后登入。

![](https://jhao413.oss-cn-beijing.aliyuncs.com/20241120202003.png)

## Moonlight 的安装和配置

Moonlight 支持 Windows、maxOS、Android、IOS 系统，以下为 Android 演示。

1. Google 商店搜索 Moonlight 下载安装，或者通过 [Moonlight](https://moonlight-stream.org/) 的官网下载。

2. 安装成功后，Moonlight 会自动扫描局域网内的电脑，如果没有可以手动添加（输入 PC 的 IPv4 的地址即可）。

3. 点击要串流的设备，首次点击时，Moonlight 会显示 PIN 码，此时在 Sunshine 的面板中输入 PIN 码进行配对即可。

> 如果只是希望串流打游戏，或者平板镜像电脑的画面，就已经可以结束嘞！

## 虚拟显示器

1. 访问 Virtual-Display-Driver 的 [Github Releases](https://github.com/itsmikethetech/Virtual-Display-Driver/releases) 或 [官网](https://vdd.mikethetech.com/) 下载最新版本。（注意需要最新版本，如果不是的话，需要注意下载版本的发布时间，将电脑的本地时间调整到发布的那一年，不然在最后安装硬件的步骤时会出错）

2. 下载后解压文件，将解压后的 IddSampleDriver 文件夹放至 C 盘中。（例：`C:\IddSampleDriver` ）

3. 如果需要添加自定义分辨率和自定义刷新率的话，可以在 option.txt 中添加。

4. 以管理员身份运行 installCert.bat 文件。

5. 打开设备管理器 -> 选中显示适配器 -> 点击工作栏中的操作 -> 添加过时硬件 -> 安装手动从列表选择的硬件 -> 从磁盘安装 -> 选择 `C:\IddSampleDriver` 中的 `IddSampleDriver.inf` -> 下一页（安装）

6. 打开 Sunshine 配置音视频的页面，输入显示器的名称。（这里可以打开 Sunshine 的安装目录，运行 `tools\dxgi-info.exe`命令查看）

7. 保存应用 Sunshine 的配置后，就可以实现平板作为电脑的扩展屏啦

> 注意！！！如果有核显也有独显的话，需要在设备管理器中禁用核显，不然会 Moonlight 在连接时会黑屏报错：没有接收到来自主机的视频,请检查您的防火墙

> 因为做记录，可能没有教程那么详细，所以列一下过程中觉得还不错的教程

[摄影师云飞的串流视频教程](https://www.bilibili.com/video/BV13i421r7Ff/?spm_id_from=333.999.0.0&vd_source=92ad0963f9f6e1361b63d95a2ae52375)

[Moonlight 贴吧看到的进阶教程](https://flowus.cn/lecheng/share/3a591f93-f48b-4164-9028-bade2c35ef58)

还有就是本文提到软件的官网和 GitHub 🥹
