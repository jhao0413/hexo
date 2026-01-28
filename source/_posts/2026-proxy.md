---
title: 目前的代理方案（二）
tags:
  - 杂谈
categories: 杂谈
abbrlink: 2026-proxy
date: 2026-01-28
---


距离上一次代理方案没多久，又开始折腾了

### 遗留的问题

- 之前使用gg作为命令行代理，有个问题是不支持ssh的代理，想用ssh clone代码还是比较麻烦
- 需要维护多个代理配置，如果nas和本地都用一个代理，如果有一个节点挂了，或者是订阅需要更新了，就需要到nas上进行操作，如果过程中出现问题，本地也跟着一起挂了，体验不是很好，最后还是在本地又挂了一个。这就出现我需要维护nas、本地、gg的订阅和配置问题。

### 新的问题

- 之前的机场比较便宜，总是挂，需要经常更换节点，加上我要维护多个配置，体验就很差
- 自己做了反重力的转发服务，一个是不希望老是代理挂掉，另一方面希望ip稳一点，不容易出现封号的问题

### 解决方案

上面说的问题其实最后都用钱解决了hh,买了一个比较稳定的机场，买了一个月从来没挂过，就是[YTOO](https://y-too.net/clientarea.php)，价格是372每年，算下来一个月30左右

但是这不能解决ip纯净的问题，一检测就是万人骑（还是去zlib上下书发现ip下载次数上限发现的）

然后就买了一个cliproxy的静态ip服务，3个月是70，一下就稳定了（不过单纯的用机场ip一个月也没发现啥问题，可能就图个安心了）

这一套换下来，不管是速度还是稳定性都还不错，就是价格有点小贵

### 折腾笔记

一个是clash-for-linux,研究了一下

- 怎么让内网其他机器使用（这样可以保证反重力转发可以分散几个号到不同的ip）
- 更新策略（需要备份mixin.yaml文件，不然unintsall会直接把所有文件删除，重新安装又要配置）
- 链式代理（用家庭宽带作为落地节点，配置也是花了不少的时间）

现在我的clash-for-linux的mixin.yaml文件是这样的：

```yaml
_custom:
  system-proxy:
    enable: true
mixed-port: 7890
# clash web ui
# 最好还是设置成9090，不然可能web能访问，但是登陆不进去
external-controller: "0.0.0.0:9090"
external-ui: dist
external-ui-url: https://github.com/Zephyruso/zashboard/releases/latest/download/dist.zip
# web ui 密码
secret: "0413"
# 是否允许局域网访问
allow-lan: true # 若开启务必设置用户验证以防暴露公网后被滥用
authentication:
# - "username:password" # 用户验证（clashon 会自动填充）

# prefix：前置插入
# suffix：后置插入
# override：根据 name 匹配并替换原项
rules:
  prefix:
    - DOMAIN,api64.ipify.org,DIRECT # 用于 clashui 获取真实公网 IP
    # - DOMAIN-KEYWORD,github,proxy   # 用于 clashupgrade 升级内核
  suffix:
# 添加家庭宽带作为落地节点
proxies:
  prefix:
    # 家宽SOCKS5落地节点
    - name: "家宽落地"
      type: socks5
      server: xxx.xxx.xxx.xx
      port: 443
      username: username
      password: password
      dialer-proxy: "美国中转代理组"
  suffix:
  override:
# 创建一个用于中转的代理组
proxy-groups:
  prefix:
    # 用于中转的代理组
    - name: "美国中转代理组"
      type: select
      # 这里添加机场的节点，用于中转
      proxies:
        - "\U0001F1FA\U0001F1F8 高级 专线 美国 01"
  suffix:
  override:
    # 覆盖主代理组，添加家宽落地节点，不然选不到新加的代理组
    - name: Proxies
      type: select
      proxies:
        - 家宽落地
        - HK
        - JP
        - SG
        - TW
        - US
# tun 配置
tun:
  enable: true
  stack: system
  auto-route: true
  auto-redir: true # clash
  auto-redirect: true # mihomo
  auto-detect-interface: true
  dns-hijack:
    - any:53
    - tcp://any:53
  strict-route: true
  route-exclude-address:
    - 1.1.1.1/32 # 用于 clashui 获取真实内网 IP
    - 127.0.0.1/32
  exclude-interface:
    - docker0 # 避免无法访问容器内服务
    - podman0 # 详见：https://github.com/nelvko/clash-for-linux-install/issues/100#issuecomment-2995667368
# DNS 配置
dns:
  enable: true
  listen: 0.0.0.0:1053
  enhanced-mode: fake-ip
  nameserver:
    - 114.114.114.114
    - 8.8.8.8

```

win上也有比较多的教程了，相关资料可以看参考链接

> 参考链接

[ryan-ai 快速转换订阅，一键生成优化后的 Clash 配置](https://ryan-ai.de/)

[四种链式代理的配置方案](https://idcflare.com/t/topic/51000)

[[教程3.0] 草履虫也能学会的 Clash 配置：UI界面一键配置精确分流、链式代理](https://idcflare.com/t/topic/51015)

[虚空终端 mihomo内核的官方文档](https://wiki.metacubex.one/)
