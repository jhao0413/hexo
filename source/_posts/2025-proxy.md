---
title: 目前的代理方案
tags:
  - 杂谈
categories: 杂谈
abbrlink: 2025-proxy
date: 2025-11-19
---


之前一直没怎么专门折腾过，直到前几天nas上装的v2rayA在更换节点后，给我nas卡死了，重启后一块固态还没挂载上，才又花了点时间整合一下解决方案T-T

### Nas代理

Nas装了FnOS，之前是用docker跑v2RayA来做代理服务的，找了一圈试下来[github.com/nelvko/clash-for-linux-install](https://github.com/nelvko/clash-for-linux-install)的安装使用体验最好，提了Issue作者也很快会有答复

如果想让局域网内的其他设备可以直接设置nas地址进行代理，需要进行以下操作：

- Nas 执行 `clashmixin -e` 进行修改：

  - 将 allow-lan 设置为 true，并设置好身份验证。
  - 配置 bind-address，值为本机内网地址。
- Nas 执行 `clashproxy status` 获取代理地址。

[A服务器成功配置了clash-for-linux，B服务器能否使用A服务器上配置的clash客户端？](https://github.com/nelvko/clash-for-linux-install/issues/226#issuecomment-3166864741 "A服务器成功配置了clash-for-linux，B服务器能否使用A服务器上配置的clash客户端？")

这样pc和手机就不用每次都专门开clash代理了，对应的软件或者插件设置好nas的代理地址就行

> 过程中还发现了`https://gh-proxy.com/`这个网站，只要在github地址前加上他就能加速 优雅
>
> ```bash
> git clone --branch master --depth 1 https://gh-proxy.com/https://github.com/nelvko/clash-for-linux-install.git
> ```

> 2026年1月5日更新
可能会导致ddns有问题，慎重全局代理

### 命令行代理

命令行代理实在太重要了，因为今年主要换了linux作为日常使用，开发和安装工具的时候使用命令行的场景变得更多了

按照之前的习惯，是自己写一个设置代理的脚本，需要的时候先执行一下再跑命令

后来逛github发现一个开源的工具很不错[gg (go-graft)](https://github.com/mzz2017/gg)，安装后只要在命令前加上gg就能做到命令行代理，管理也方便的多

### 最后补充一下

一定要有个备用机场，不然偶尔节点全挂了真是寸步难行

> 参考链接

[https://sorrycc.com/pfd-01-how-to-gfw](https://sorrycc.com/pfd-01-how-to-gfw)
