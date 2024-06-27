---
title: frp更新后的配置文件写法变更
tags:
  - frp
categories: linux
abbrlink: 1
date: 2024-06-24 23:18:00
---
从 v0.52.0 版本开始，frp 开始支持 TOML、YAML 和 JSON 作为配置文件格式

v0.52.0版本前，frp使用.ini作为配置文件的格式，基本配置如下：

```ini
[common]
server_addr = <server_host>
server_port = <server_port>
token = <password>

# 服务名称，在服务器端不能重复
[app_http]
type=tcp
# 需要转发的本地ip，可以改成局域网的ip做转发
local_ip = 127.0.0.1
# 需要转发的本地端口
local_port = 80
remote_port = <remort_port_1>

[app_https]
type=tcp
local_ip=127.0.0.1
local_port =443
remote_port=<remort_port_2>
```

由于更新后ini文件被弃用，但网上依旧有很多的文章在写之前的配置，没有标注版本，导致出现配置文件在不同版本间混用的情况，导致莫名的bug（大多会提示ini文件已被弃用的提示）

如果在 v0.52.0 以后的版本中，使用如[common]的这种写法，即使文件为.toml文件，也会被frp当作ini文件进行处理

所以按照按照官方文档的示例，以后的版本配置文件应如以下代码所示

```toml
serverAddr = "x.x.x.x"
serverPort = 7000

[[proxies]]
name = "ssh"
type = "tcp"
localIP = "127.0.0.1"
localPort = 22
remotePort = 6000
auth.token = "xxxxx"
```

参考链接

> [frp官方文档](https://gofrp.org/zh-cn/docs/features/common/configure/)

> [frpc_full_example.toml](https://github.com/fatedier/frp/blob/dev/conf/frpc_full_example.toml)

> [toml配置问题](https://github.com/fatedier/frp/issues/3724)